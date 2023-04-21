import styled, { keyframes } from "styled-components";

const Underline_ani = keyframes`
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
`;

export const TodoListContainer = styled.div`
  padding: 47px 41px 38px 42px;
  width: 100%;
  height: 100%;
  position: relative;
  overflow: visible;
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
`;

export const TodoItemContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  margin-bottom: 15px;
`;

export const TodoCheckbox = styled.input.attrs({ type: "checkbox" })`
  position: relative;
  flex: 0 0 auto;
  margin-top: 7px;
  margin-right: 15px;
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
  appearance: none;
  width: 17px;
  height: 17px;
  border: 1px solid #66546c;
  border-radius: 9px;
  outline: none;
  z-index: 2;
  opacity: ${({ disabled }) => (disabled ? "0.3" : "1")};

  cursor: pointer;
  &::before {
    position: absolute;
    content: "";
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: 9px;
    height: 9px;
    border-radius: 4.5px;
    background-color: #c6c6c6;
    opacity: 0;
  }
  &:checked {
    background-color: #f2f2f2;
    border-color: #c6c6c6;
    &::before {
      opacity: 1;
    }
  }
`;

export const TodoInput = styled.textarea`
  width: 100%;
  margin-right: 0.1rem;
  font-family: "Noto Sans TC";
  font-weight: 400;
  font-size: 18px;
  letter-spacing: 0.05em;
  line-height: 26px;
  color: #595959;

  resize: none;
  overflow: hidden;

  background: none;
  border: none;
  border-bottom: ${({ isNull }) =>
    isNull ? "1px solid rgba(0, 0, 0, 0.3)" : "none"};
  text-decoration: ${({ completed }) => (completed ? "line-through" : "none")};
  opacity: ${({ completed }) => (completed ? "0.3" : "1")};
  &:focus {
  }
  &:focus-visible {
    outline: none;
  }
`;

export const TodoDeleteButton = styled.button`
  margin-top: 7px;
  margin-left: 15px;
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
  opacity: ${({ disabled }) => (disabled ? "0" : "1")};
  background: none;
  border: none;
  &:hover {
    opacity: 1;
    cursor: pointer;
  }
`;
