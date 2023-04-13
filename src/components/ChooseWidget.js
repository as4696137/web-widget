import React, { useState } from "react";
import styled from "styled-components";
import TodoWidget from "./TodoWidget";
import Calculator from "./Calculator";
import StockWidget from "./StockWidget";
import LinkWidget from "./LinkWidget";

const ChooseDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  button.addingBtn {
    width: 5rem;
    height: 5rem;
    font-size: 4rem;
    color: #ffffff5e;
    background-color: #68686837;
    border: none;
    border-radius: 2.5rem;
  }
  &:hover {
    button.addingBtn {
      width: 5rem;
      height: 5rem;
      font-size: 4rem;
      color: white;
      background-color: #6868686c;
      border: none;
      border-radius: 2.5rem;
      cursor: pointer;
      &:hover {
        background-color: #686868ce;
      }
    }
  }

  //chooseList
  ul {
    list-style: none;
    width: 100%;
    li {
      width: 100%;
      button {
        margin: 0;
        height: 3rem;
        width: 100%;
        font-size: 1.2rem;
        border: none;
        border-bottom: 1px solid #686868ce;
        background-color: #9c9c9c4c;
        cursor: pointer;
        &:hover {
          background-color: #969696d8;
        }
      }
    }
  }
`;

const ChooseWidget = ({ user, setUser }) => {
  const [chooseList, setChooseList] = useState([
    { name: "To-do List", number: 0 },
    { name: "Calculator", number: 1 },
    { name: "Stock", number: 2 },
    { name: "Link List", number: 3 },
  ]);
  const [IsAddBtnShow, setAddBtnShow] = useState(true);
  const [IsChooseListShow, setChooseListshow] = useState(false);
  const addingBtnHandler = (e) => {
    e.preventDefault();
    setAddBtnShow(false);
    setChooseListshow(true);
  };
  const [show_todo, setshow_todo] = useState(false);
  const [show_cal, setshow_cal] = useState(false);
  const [show_stock, setshow_stock] = useState(false);
  const [show_link, setshow_link] = useState(false);
  const choiceHandler = (choice) => {
    switch (choice.number) {
      case 0:
        setshow_todo(true);
        setChooseListshow(false);
        break;
      case 1:
        setshow_cal(true);
        setChooseListshow(false);
        break;
      case 2:
        setshow_stock(true);
        setChooseListshow(false);
        break;
      case 3:
        setshow_link(true);
        setChooseListshow(false);
        break;
    }
  };
  return (
    <ChooseDiv>
      {IsAddBtnShow && (
        <button className="addingBtn" onClick={addingBtnHandler}>
          +
        </button>
      )}
      {IsChooseListShow && (
        <ul className="chooseList">
          {chooseList.map((choice) => (
            <li key={choice.number}>
              <button onClick={() => choiceHandler(choice)}>
                {choice.name}
              </button>
            </li>
          ))}
        </ul>
      )}
      {show_todo && <TodoWidget user={user} setUser={setUser} />}
      {show_cal && <Calculator user={user} setUser={setUser} />}
      {show_stock && <StockWidget user={user} setUser={setUser} />}
      {show_link && <LinkWidget user={user} setUser={setUser} />}
    </ChooseDiv>
  );
};

export default ChooseWidget;
