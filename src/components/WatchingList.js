import React from "react";
import styled from "styled-components";
import { Scrollbars } from "react-custom-scrollbars-2";

const WatchingListStyle = styled.ul`
  list-style: none;
  overflow: auto;
  li {
    background-color: white;
    border-bottom: 1px solid black;
    display: flex;
    justify-content: space-between;

    div.name {
      display: flex;
      flex-direction: column;
      margin-left: 0.5rem;
      p.name {
        font-size: 1.25rem;
      }
      p.id {
      }
    }
    div.price {
      text-align: end;
      display: flex;
      flex-direction: column;
      margin-right: 0.5rem;
      p.price {
        font-size: 1.5rem;
      }
      div.change {
        display: flex;
        flex-direction: row;
      }
    }
  }
`;

const StyledScrollbars = styled(Scrollbars)`
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
  margin: 0 0.4rem;

  color: ${(props) =>
    props.obj.change > 0 ? "red" : props.obj.change < 0 ? "green" : "black"};
`;

const WatchingList = ({ watchingList }) => {
  return (
    <StyledScrollbars autoHide autoHideTimeout={1000} autoHideDuration={200}>
      <WatchingListStyle watchingList={watchingList}>
        {watchingList.length > 0 &&
          watchingList.map((obj) => {
            return (
              <li key={obj.id}>
                <div className="name">
                  <p className="name">{obj.name}</p>
                  <p className="id">{obj.id}</p>
                </div>
                <div className="price">
                  <p className="price">{obj.price}</p>
                  <div className="change">
                    <ChangePriceColor obj={obj}>{obj.change}</ChangePriceColor>
                    <ChangePriceColor obj={obj}>
                      {obj.changePercent}%
                    </ChangePriceColor>
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
