import React, { useReducer, useRef, useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { app, auth } from "./GoogleLoginSystem";
import { getDatabase, ref, onValue, set } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";

const Underline_ani = keyframes`
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
`;

const TodoListContainer = styled.div`
  margin: 0 1rem;
  padding: 1rem 0;
  width: 100%;
  height: 100%;
`;

const TodoItemContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const TodoCheckbox = styled.input`
  margin-right: 0.5rem;
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
`;

const TodoInput = styled.input`
  width: 100%;
  margin-right: 0.1rem;
  font-size: 1.2rem;
  background: none;
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  text-decoration: ${({ completed }) => (completed ? "line-through" : "none")};
  opacity: ${({ completed }) => (completed ? "0.3" : "1")};
  &:focus {
    animation: ${Underline_ani} ease-out 0.2s forwards;
  }
  &:focus-visible {
    outline: none;
  }
`;

const TodoDeleteButton = styled.button`
  margin-left: 5px;
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
  opacity: ${({ disabled }) => (disabled ? "0" : "0.3")};
  background: none;
  border: none;
  &:hover {
    opacity: 1;
    cursor: pointer;
  }
`;

// ===================  id=創建時間 , text=todo字串 , completed=有沒有打勾 , newtodo=是不是新增的空白todo
const initialState = [{ id: 0, text: "", completed: false, newTodo: true }];

function reducer(state, action) {
  switch (action.type) {
    case "INIT_TODO_FROM_DATABASE":
      if (action.payload.length < 1) {
        return initialState;
      } else {
        return action.payload;
      }

    case "ADD_TODO":
      if (action.payload === "onKeyPress") {
        return [
          ...state,
          {
            id: Date.now(),
            text: "",
            completed: false,
            pressEnter: true,
            newTodo: true,
          },
        ];
      } else {
        return [
          ...state,
          { id: Date.now(), text: "", completed: false, newTodo: true },
        ];
      }

    case "UPDATE_TODO_TEXT":
      return state.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, text: action.payload.text, newTodo: false }
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
    case "FOCUS_NEXT_TODO":
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

  const handleUpdateTodoText = (id, text) => {
    dispatch({ type: "UPDATE_TODO_TEXT", payload: { id, text } });
  };

  const handleToggleTodoCompleted = (id) => {
    dispatch({ type: "TOGGLE_TODO_COMPLETED", payload: id });
  };

  const handleDeleteTodo = (id) => {
    dispatch({ type: "DELETE_TODO", payload: id });
  };

  const handleTodoInputKeyPress = (event, index) => {
    if (event.key === "Enter") {
      if (index === todos.length - 1) {
        dispatch({ type: "ADD_TODO", payload: event._reactName });
      }
    }
  };

  const handleTodoInputBlur = (index) => {
    if (index === todos.length - 1) {
      dispatch({ type: "ADD_TODO" });
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
        dispatch({ type: "FOCUS_NEXT_TODO", payload: todo.id });
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
      {todos.map((todo, index) => (
        <TodoItemContainer key={todo.id}>
          <TodoCheckbox
            type="checkbox"
            checked={todo.completed}
            disabled={todo.text.trim() === ""}
            onChange={() => handleToggleTodoCompleted(todo.id)}
          />
          <TodoInput
            type="text"
            value={todo.text}
            completed={todo.completed}
            onChange={(e) => handleUpdateTodoText(todo.id, e.target.value)}
            onKeyPress={(e) => {
              if (todo.text.trim() !== "") {
                handleTodoInputKeyPress(e, index);
              }
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
            disabled={todo.newTodo || todos.length === 1}
          >
            X
          </TodoDeleteButton>
        </TodoItemContainer>
      ))}
    </TodoListContainer>
  );
};

export default TodoWidget;
