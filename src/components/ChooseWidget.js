import React, { useState } from "react";
import styled from "styled-components";
import TodoWidget from "./TodoWidget";
import Calculator from "./Calculator";
import StockWidget from "./StockWidget";
import LinkWidget from "./LinkWidget";
import addingBtnImage from "../img/svg/+.svg";
import cancelBtnImage from "../img/svg/cancelBtn.svg";

const ChooseDiv = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #ffffff;
  background: ${({ IsAddBtnShow }) => (!IsAddBtnShow ? "#fbfaf9" : "none")};
  border-radius: 20px;
  box-shadow: 0px 4px 12px 1px rgba(177, 156, 125, 0.25);
  filter: drop-shadow(-2px -10px 26px rgba(255, 241, 219, 0.6));

  transition: all 1s ease;
  &::before {
    position: absolute;
    content: "";
    width: 325px;
    height: 325px;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: ${({ IsAddBtnShow }) => (!IsAddBtnShow ? "#fbfaf9" : "none")};
    border-radius: 20px;
    filter: drop-shadow(21px 20px 43px rgba(177, 156, 125, 0.25));
    transition: all 1s ease;
    z-index: -1;
  }
  button.cancelBtn {
    position: absolute;
    height: 44px;
    width: 44px;
    top: -21px;
    right: -22px;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.58) 0%,
      rgba(213, 210, 183, 0.58) 100%
    );
    opacity: 0%;
    border: 1px solid #eaeaea;
    box-shadow: 0px 2px 6px rgba(185, 169, 129, 0.53);
    border-radius: 22px;
    cursor: pointer;
    transition: all 0.2s ease;

    display: flex;
    justify-content: center;
    align-items: center;

    z-index: 20;

    img {
      filter: drop-shadow(0px 2px 2px rgba(217, 191, 140, 0.41));
    }
  }
  button.addingBtn {
    border: none;
    background: none;
    img {
      filter: drop-shadow(0px 4px 1px rgba(0, 0, 0, 0.25));
      &:hover {
        cursor: pointer;
      }
    }
  }
  &:hover {
    border: 1px solid #eaeaea;
    border-radius: 20px;
    background-color: #fbfaf9;
    &::before {
      background-color: #fbfaf9;
    }
    button.cancelBtn {
      opacity: 50%;
      &:hover {
        opacity: 100%;
      }
    }
    button.addingBtn {
      &:hover {
      }
    }
  }

  //chooseList
  ul.chooseList {
    list-style: none;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    li {
      width: 100%;
      button {
        position: relative;
        margin: 10px;
        width: 156px;
        height: 30px;
        font-size: 1rem;
        border: 1px solid #eaeaea;
        color: #66546c;
        font-family: "Noto Sans TC";
        font-weight: 700;
        letter-spacing: 0.09em;
        border-radius: 12px;
        background: linear-gradient(
          180deg,
          rgba(255, 255, 255, 0.58) 0%,
          rgba(213, 210, 183, 0.58) 100%
        );
        box-shadow: 0px 2px 6px rgba(185, 169, 129, 0.53);
        z-index: 1;
        transition: all 0.2s ease;
        cursor: pointer;
        &::before {
          position: absolute;
          content: "";
          top: 0;
          right: 0;
          left: 0;
          bottom: 0;

          border: 1px solid #eaeaea;
          border-radius: 12px;
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.58) 0%,
            rgba(30, 0, 40, 0.58) 100%
          );

          z-index: -1;
          transition: all 0.2s ease;
          opacity: 0;
        }

        &:hover {
          color: #ffffff;
          box-shadow: 0px 2px 6px rgba(102, 84, 108, 0.53);
        }
        &:hover::before {
          opacity: 1;
        }
      }
    }
  }
`;

const ChooseWidget = ({ user, setUser }) => {
  const [chooseList, setChooseList] = useState([
    { name: "待辦事項", number: 0 },
    { name: "計算機工具", number: 1 },
    { name: "查看股票", number: 2 },
    { name: "連結收藏", number: 3 },
  ]);
  const [IsAddBtnShow, setAddBtnShow] = useState(true);
  const [IsChooseListShow, setChooseListshow] = useState(false);
  const [IsCancelBtnShow, setCancelBtnshow] = useState(false);

  const addingBtnHandler = (e) => {
    e.preventDefault();
    setAddBtnShow(false);
    setChooseListshow(true);
    setCancelBtnshow(true);
  };

  const cancelBtnHandler = (e) => {
    e.preventDefault();
    setAddBtnShow(true);
    setChooseListshow(false);
    setCancelBtnshow(false);

    setshow_todo(false);
    setshow_cal(false);
    setshow_stock(false);
    setshow_link(false);
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
      default:
        break;
    }
  };
  return (
    <ChooseDiv IsAddBtnShow={IsAddBtnShow}>
      {IsCancelBtnShow && (
        <button className="cancelBtn" onClick={cancelBtnHandler}>
          <img src={cancelBtnImage} alt="cancel button" />
        </button>
      )}

      {IsAddBtnShow && (
        <button className="addingBtn" onClick={addingBtnHandler}>
          <img src={addingBtnImage} alt="adding button" />
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
