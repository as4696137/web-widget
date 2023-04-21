import React from "react";
import styled from "styled-components";
import { Scrollbars } from "react-custom-scrollbars-2";
import deleteImg from "../img/svg/cancelBtn.svg";

const WatchingListStyle = styled.ul`
  width: 100%;
  list-style: none;
  overflow: auto;

  display: flex;
  flex-direction: column;
  align-items: start;
  li {
    position: relative;
    width: 100%;
    padding: 0 36px 0 37px;
    &:hover {
      div.info {
        width: 214px;
      }

      button.deleteBtn {
        transform: translateY(-50%) scale(1);

        &:hover {
          filter: drop-shadow(0px 2px 3px rgba(217, 191, 140, 0.425));
        }
      }
    }

    button.deleteBtn {
      position: absolute;
      width: 15px;
      height: 15px;
      top: 50%;

      transform: translate(0, -50%) scale(0);
      /* transform: translate(-50%, -50%); */
      right: 45px;

      border: none;
      background: none;
      border-radius: 7.5px;
      cursor: pointer;
      transition: all 0.4s ease-out;
      img {
        filter: drop-shadow(0px 2px 2px rgba(217, 191, 140, 0.41));
      }
    }
    div.info {
      width: 250px;
      background: #ffffff;
      box-shadow: 0px 4px 7px #e9e4dc;
      border-radius: 5px;
      margin-bottom: 4px;
      padding: 7px 17px 8px 16px;

      display: flex;
      justify-content: space-between;

      font-family: "Noto Sans TC";
      font-weight: 500;
      letter-spacing: 0.09em;
      color: #717171;

      transition: all 0.5s ease-out;
      div.name {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        p.name {
          font-size: 1rem;
          line-height: 23px;
        }
        p.id {
          font-size: 0.75rem;
          line-height: 17px;
        }
      }
      div.price {
        text-align: end;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        font-weight: 700;
        p.price {
          font-size: 1.125rem;
          line-height: 26px;
        }
        div.change {
          display: flex;
          flex-direction: row;
          font-size: 0.75rem;
          line-height: 17px;
        }
      }
    }
  }
`;

function CustomScrollbars(props) {
  return (
    <Scrollbars
      autoHide
      autoHideTimeout={1000}
      autoHideDuration={200}
      renderView={props.renderView}
      onScrollFrame={props.onScroll}
      onScroll={props.onScroll}
      style={{
        position: "absolute",
        top: "83px",
        height: "205px",
      }}
    >
      {props.children}
    </Scrollbars>
  );
}

const StyledScrollbars = styled(CustomScrollbars)`
  /* Hide the default scrollbar
  ::-webkit-scrollbar {
    display: none;
  }

  /* Style the thumb */
  /* ::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 10px;
  } */

  /* Style the track */
  /* ::-webkit-scrollbar-track {
    background-color: #eee;
  }  */
`;

const ChangePriceColor = styled.p`
  margin-left: 0.4rem;

  color: ${(props) =>
    props.obj.change > 0
      ? "#F28282"
      : props.obj.change < 0
      ? "#82F29B"
      : "#717171"};
`;

const WatchingList = ({ watchingList, addingList, setAddingList }) => {
  const deleteBtnHandler = (id) => {
    setAddingList(addingList.filter((obj) => obj.Code !== id));
  };

  return (
    <StyledScrollbars>
      <WatchingListStyle watchingList={watchingList}>
        {watchingList.length > 0 &&
          watchingList.map((obj) => {
            return (
              <li key={obj.id}>
                <button
                  className="deleteBtn"
                  onClick={() => deleteBtnHandler(obj.id)}
                >
                  <img src={deleteImg} alt="delete button" />
                </button>
                <div className="info">
                  <div className="name">
                    <p className="name">{obj.name}</p>
                    <p className="id">{obj.id}</p>
                  </div>
                  <div className="price">
                    <p className="price">{obj.price}</p>
                    <div className="change">
                      <ChangePriceColor obj={obj}>
                        {obj.change}
                      </ChangePriceColor>
                      <ChangePriceColor obj={obj}>
                        {obj.changePercent}%
                      </ChangePriceColor>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
      </WatchingListStyle>
    </StyledScrollbars>
  );
};

export default WatchingList;
