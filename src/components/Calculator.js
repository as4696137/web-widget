import React, { useReducer, useEffect } from "react";
import { Calculator_style } from "./style components/Calculator_style";
import DigitButton from "./DigitButton";
import OperationButton from "./OperationButton";

export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  CHOOSE_OPEARTION: "choose-operation",
  CLEAR: "clear",
  DELETE_DIGIT: "delete-digit",
  EVALUATE: "evaluate",
};

function reducer(state, { type, payload }) {
  switch (type) {
    //按一般的數字時(包含0和.)
    case ACTIONS.ADD_DIGIT:
      if (state.overwrite) {
        console.log("zzzzz");
        return {
          ...state,
          currentOperand: payload.digit,
          overwrite: false,
        };
      }

      //如果回傳的數字是0而且現在本來就是0了就不理他
      if (payload.digit === "0" && state.currentOperand === "0") {
        return state;
      }
      //如果回傳的是點而且場面上已經有點了也不理他
      if (
        payload.digit === "." &&
        state.currentOperand.toString().includes(".")
      ) {
        return state;
      }
      //一般來說回傳 - state其他照舊，currentOperand是原本的數字+新的數字
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      };

    //按算式按鈕時
    case ACTIONS.CHOOSE_OPEARTION:
      //如果這兩個地方都空的就不理他
      if (state.currentOperand == null && state.previosOperand == null) {
        return state;
      }

      //如果只有場上是空的，上一動有東西，更新算式。我要乘嗎?不我是要除啦
      if (state.currentOperand == null) {
        return {
          ...state,
          operation: payload.operation,
        };
      }

      //如果只有上一動是空的，更新算式，並靶場上清空，數字和算式都移動到上一動
      if (state.previosOperand == null) {
        return {
          ...state,
          operation: payload.operation,
          previosOperand: state.currentOperand,
          currentOperand: null,
        };
      }

      //如果都有東西，會直接計算值，並把計算結果和按下去的這個算式一並放在上一動，並把場上清空
      return {
        ...state,
        previosOperand: evalute(state),
        operation: payload.operation,
        currentOperand: null,
      };

    //清除鍵按下時
    case ACTIONS.CLEAR:
      //全部清空
      return { currentOperand: 0 };

    //DEL鍵按下時
    case ACTIONS.DELETE_DIGIT:
      //如果剛按=算出答案就把場上清空
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentOperand: 0,
        };
      }
      if (state.currentOperand == 0) return { currentOperand: 0 };
      if (state.currentOperand.length === 1) {
        return { ...state, currentOperand: 0 };
      }
      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1),
      };

    //按下=鍵時
    case ACTIONS.EVALUATE:
      //如果state中這三個有任何一個是空的，毫無反應
      if (
        state.operation == null ||
        state.currentOperand == null ||
        state.previosOperand == null
      ) {
        return state;
      }

      return {
        ...state,
        overwrite: true,
        previosOperand: null,
        operation: null,
        currentOperand: evalute(state),
      };
  }
}

//計算結果~~(按下等於鍵或是連續按下算式鍵時)
function evalute({ currentOperand, previosOperand, operation }) {
  //parseFloat(string) return可以轉換為number的string，但string第一個字不是數字的話會return false
  const prev = parseFloat(previosOperand);
  const current = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(current)) return "";
  let computation = "";
  switch (operation) {
    case "+":
      computation = prev + current;
      break;
    case "-":
      computation = prev - current;
      break;
    case "x":
      computation = prev * current;
      break;
    case "/":
      computation = prev / current;
      break;
  }
  return computation.toString();
}

//每三位數就一個 ","
const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0,
});
function formatOperand(operand) {
  if (operand == null) return;
  if (operand == 0) return 0;
  const [integer, decimal] = operand.split(".");
  if (decimal == null) return INTEGER_FORMATTER.format(integer);
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`;
}

const Calculator = () => {
  //宣告一個useReducer，state解構成三個值的物件(場上、上一動、算式)，預設是空的
  const [{ currentOperand, previosOperand, operation }, dispatch] = useReducer(
    reducer,
    { currentOperand: 0 }
  );
  useEffect(() => {
    console.log(currentOperand);
  }, [currentOperand]);
  return (
    <Calculator_style>
      <div className="title">計算機工具</div>
      <div className="output">
        <div className="previous-operand">
          {formatOperand(previosOperand)}
          {operation}
        </div>
        <div className="current-operand">{formatOperand(currentOperand)}</div>
      </div>
      <button
        className="span-two"
        onClick={() => dispatch({ type: ACTIONS.CLEAR })}
      >
        AC
      </button>
      <button onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}>
        DEL
      </button>
      <OperationButton dispatch={dispatch} operation="/" />
      <DigitButton dispatch={dispatch} digit="7" />
      <DigitButton dispatch={dispatch} digit="8" />
      <DigitButton dispatch={dispatch} digit="9" />
      <OperationButton dispatch={dispatch} operation="x" />
      <DigitButton dispatch={dispatch} digit="4" />
      <DigitButton dispatch={dispatch} digit="5" />
      <DigitButton dispatch={dispatch} digit="6" />
      <OperationButton dispatch={dispatch} operation="+" />
      <DigitButton dispatch={dispatch} digit="1" />
      <DigitButton dispatch={dispatch} digit="2" />
      <DigitButton dispatch={dispatch} digit="3" />
      <OperationButton dispatch={dispatch} operation="-" />
      <DigitButton dispatch={dispatch} digit="." />
      <DigitButton dispatch={dispatch} digit="0" />
      <button
        className="span-two"
        onClick={() => dispatch({ type: ACTIONS.EVALUATE })}
      >
        =
      </button>
    </Calculator_style>
  );
};

export default Calculator;
