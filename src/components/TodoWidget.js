import React, { useReducer, useRef, useEffect, useState } from "react";
import {
  TodoListContainer,
  TodoItemContainer,
  TodoCheckbox,
  TodoInput,
  TodoDeleteButton,
  StyledScrollbars,
} from "./style components/TodoWidget_style";
import { app, auth } from "./GoogleLoginSystem";
import { getDatabase, ref, onValue, set } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";
import deleteBtnImg from "../img/svg/todo-X.svg";

// == id=創建時間 , text=todo字串 , completed=有沒有打勾 ,
// == newtodo=是不是新增的空白todo , rows=有幾行
const initialState = [
  { id: 0, text: "", completed: false, newTodo: true, rows: 1 },
];

function reducer(state, action) {
  switch (action.type) {
    case "INIT_TODO_FROM_DATABASE":
      if (action.payload.length < 1) {
        return initialState;
      } else {
        return action.payload;
      }

    case "ADD_TODO":
      if (action.payload.event === "onKeyDown") {
        if (action.payload.IsNewTodo) {
          return state;
        } else {
          console.log("asdf");
          return [
            ...state,
            {
              id: Date.now(),
              text: "",
              completed: false,
              pressEnter: true,
              newTodo: true,
              rows: 1,
            },
          ];
        }
      }

      console.log("no enter");
      return [
        ...state,
        {
          id: Date.now(),
          text: "",
          completed: false,
          newTodo: true,
          rows: 1,
        },
      ];

    case "UPDATE_TODO_TEXT":
      return state.map((todo) =>
        todo.id === action.payload.id
          ? {
              ...todo,
              text: action.payload.text,
              newTodo: false,
              rows: action.payload.renderRows,
            }
          : todo
      );
    case "TOGGLE_TODO_COMPLETED":
      return state.map((todo) =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    case "DELETE_TODO":
      return state.filter((todo) => todo.id !== action.payload);
    case "FOCUS_NEXT_NEW_TODO":
      return state.map((todo) =>
        todo.id === action.payload ? { ...todo, pressEnter: false } : todo
      );
    case "INIT_TODOS":
      return initialState;
    default:
      return state;
  }
}

const db = getDatabase(app);

const TodoWidget = ({ user, setUser }) => {
  const [todos, dispatch] = useReducer(reducer, initialState);
  const todoInputRefs = useRef([]);
  const [authStateChangedCalled, setAuthStateChangedCalled] = useState(false); // 添加標誌

  //從database撈使用者之前存的資料
  useEffect(() => {
    if (!authStateChangedCalled) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const todosRef = ref(db, `users/${user.uid}/todos`);
          onValue(todosRef, (snapshot) => {
            const todos = snapshot.val();
            const todoList = [];
            for (let id in todos) {
              todoList.push({ id, ...todos[id] });
            }
            dispatch({ type: "INIT_TODO_FROM_DATABASE", payload: todoList });
          });
        } else {
          setUser(null);
          dispatch({ type: "INIT_TODOS" });
        }
      });
      setAuthStateChangedCalled(true);
    }
  }, [authStateChangedCalled]);

  //拿到todo內容全部變成一行排排站的總寬度(px)
  const getTextWidth = (text, element) => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    const style = window.getComputedStyle(element);

    context.font = `${style.fontSize} ${style.fontFamily}`;
    const metrics = context.measureText(text);

    return metrics.width;
  };

  const handleUpdateTodoText = (id, text, event) => {
    //const textareaLineHeight = 26;
    const textarea = event.target;

    const containerWidth = textarea.offsetWidth;
    const textWidth = getTextWidth(textarea.value, textarea);

    let renderRows = 1;
    const currentRows = Math.ceil(textWidth / containerWidth);

    if (currentRows === Infinity) {
      renderRows = 1;
    } else if (currentRows < 1) {
      renderRows = 1;
    } else {
      renderRows = currentRows;
    }
    dispatch({ type: "UPDATE_TODO_TEXT", payload: { id, text, renderRows } });
  };

  const handleToggleTodoCompleted = (id) => {
    dispatch({ type: "TOGGLE_TODO_COMPLETED", payload: id });
  };

  const handleDeleteTodo = (id) => {
    dispatch({ type: "DELETE_TODO", payload: id });
  };

  const handleTodoInputKeyDown = (event, index, todo) => {
    // 按 Enter 鍵時，不是新增新 todo 就是 focus 到下一個 todo
    if (event.key === "Enter") {
      event.preventDefault();
      if (index >= 20) {
        console.log("max todo length.");
      } else if (index === todos.length - 1) {
        dispatch({
          type: "ADD_TODO",
          payload: { event: event._reactName, IsNewTodo: todo.newTodo },
        });
      } else {
        const nextInputRef = todoInputRefs.current[index + 1];
        if (nextInputRef) {
          nextInputRef.focus();
        }
      }
    }

    console.log(event.key);

    if (event.key === "ArrowUp") {
      const previousInputRef = todoInputRefs.current[index - 1];
      if (previousInputRef) {
        event.preventDefault();
        previousInputRef.focus();
      }
    }
    if (event.key === "ArrowDown") {
      const nextInputRef = todoInputRefs.current[index + 1];
      if (nextInputRef) {
        event.preventDefault();
        nextInputRef.focus();
      }
    }

    if (event.key === "Backspace") {
      console.log("press Backspace");
      if (todo.text.trim() === "" && index !== 0) {
        dispatch({ type: "DELETE_TODO", payload: todo.id });
        const previousInputRef = todoInputRefs.current[index - 1];
        if (previousInputRef) {
          event.preventDefault();
          previousInputRef.focus();
        }
      }
    }
  };

  const handleTodoInputBlur = (index) => {
    if (index >= 20) {
      console.log("max todo length.");
    } else if (index === todos.length - 1) {
      dispatch({ type: "ADD_TODO", payload: { event: null } });
    }
  };

  //如果是用Enter鍵新增完一個todo的話(而不是onBlur)，會Onfocus到新的todo
  useEffect(() => {
    todos.forEach((todo, index) => {
      if (todo.pressEnter) {
        const nextInputRef = todoInputRefs.current[index];
        if (nextInputRef) {
          nextInputRef.focus();
        }
        console.log("YOOOOOOO");
        dispatch({ type: "FOCUS_NEXT_NEW_TODO", payload: todo.id });
      }
    });
  }, [todos, dispatch]);

  //todos更新時就更新database
  useEffect(() => {
    if (user && todos.length > 1) {
      const todoRef = ref(db, `users/${user.uid}/todos`);
      set(todoRef, todos);
    }
  }, [todos]);

  return (
    <TodoListContainer>
      <div className="title">待辦事項</div>
      <StyledScrollbars>
        {todos.map((todo, index) => (
          <TodoItemContainer key={todo.id}>
            <TodoCheckbox
              type="checkbox"
              checked={todo.completed}
              disabled={todo.text.trim() === ""}
              onChange={() => handleToggleTodoCompleted(todo.id)}
            />

            <TodoInput
              rows={todo.rows}
              value={todo.text}
              isNull={todo.text.trim() === "" ? true : false}
              completed={todo.completed}
              placeholder="接下來要..."
              onChange={(e) => handleUpdateTodoText(todo.id, e.target.value, e)}
              onKeyDown={(e) => {
                handleTodoInputKeyDown(e, index, todo);
              }}
              onBlur={() => {
                if (todo.text.trim() !== "") {
                  handleTodoInputBlur(index);
                }
              }}
              ref={(input) => (todoInputRefs.current[index] = input)}
            />
            <TodoDeleteButton
              onClick={() => {
                if (todo.newTodo || todos.length !== 1) {
                  handleDeleteTodo(todo.id);
                }
              }}
              disabled={
                todo.newTodo || todos.length === 1 || todo.text.trim() === ""
              }
            >
              <img src={deleteBtnImg} alt="delete button" />
            </TodoDeleteButton>
          </TodoItemContainer>
        ))}
      </StyledScrollbars>
    </TodoListContainer>
  );
};

export default TodoWidget;
