import React, { useReducer } from "react";
import styled from "styled-components";
import DigitButton from "./DigitButton";
import OperationButton from "./OperationButton";

const Calculator_style = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(4, 4.5rem);
  grid-template-rows: minmax(6rem, auto) repeat(5, 2.5rem);

  div.title {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    top: -15px;
    left: 50%;
    transform: translateX(-50%);
    color: #66546c;
    font-family: "Noto Sans TC";
    font-weight: 700;
    letter-spacing: 0.09em;
    font-size: 1rem;
    width: 119px;
    height: 33px;
    background: rgba(255, 255, 255, 0.8);
    border: 1px solid #eaeaea;
    border-radius: 20px;
    box-shadow: 0px 2px 6px rgba(185, 169, 129, 0.53);
  }

  button {
    margin: 0;
    border: 1px solid white;
    outline: none;
    cursor: pointer;
    &:hover {
      background-color: #ffeed7;
    }
  }
  button.span-two {
    grid-column: span 2;
  }
  .output {
    grid-column: 1/-1;
    background-color: #ddddddf4;
    text-align: end;
    padding-right: 0.5rem;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-between;

    .previous-operand {
      padding-top: 0.5rem;
      font-size: 1rem;
    }
    .current-operand {
      font-size: 1.5rem;
    }
  }
`;

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
      if (payload.digit === "." && state.currentOperand.includes(".")) {
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
      return {};

    //DEL鍵按下時
    case ACTIONS.DELETE_DIGIT:
      //如果剛按=算出答案就把場上清空
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentOperand: null,
        };
      }
      if (state.currentOperand == null) return state;
      if (state.currentOperand.length === 1) {
        return { ...state, currentOperand: null };
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
    case "×":
      computation = prev * current;
      break;
    case "÷":
      computation = prev / current;
      break;
  }
  return computation.toString();
}

const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0,
});
function formatOperand(operand) {
  if (operand == null) return;
  const [integer, decimal] = operand.split(".");
  if (decimal == null) return INTEGER_FORMATTER.format(integer);
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`;
}

const Calculator = () => {
  //宣告一個useReducer，state解構成三個值的物件(場上、上一動、算式)，預設是空的
  const [{ currentOperand, previosOperand, operation }, dispatch] = useReducer(
    reducer,
    {}
  );
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
      <OperationButton dispatch={dispatch} operation="÷" />
      <DigitButton dispatch={dispatch} digit="7" />
      <DigitButton dispatch={dispatch} digit="8" />
      <DigitButton dispatch={dispatch} digit="9" />
      <OperationButton dispatch={dispatch} operation="×" />
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
