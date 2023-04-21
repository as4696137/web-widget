import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Scrollbars } from "react-custom-scrollbars-2";
import addBtnImg from "../img/svg/stock-+.svg";

const SearchList_styled = styled.ul`
  width: 100%;
  /* height: 100%; */
  overflow: auto;
  position: absolute;
  padding: 0 37px 0 38px;

  /* z-index: 5; */
  li {
    background-color: #ffffff;
    box-shadow: 0px 4px 7px #e9e4dc;
    border-radius: 5px;
    margin-bottom: 4px;

    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 7px 17px 8px 16px;
    .context {
      p.name {
        font-family: "Noto Sans TC";
        font-size: 1rem;
        font-weight: 500;
        line-height: 23px;
        letter-spacing: 0.09em;
        color: #717171;
      }
      p.code {
        font-family: "Noto Sans TC";
        font-size: 0.75rem;
        font-weight: 500;
        line-height: 17px;
        letter-spacing: 0.09em;
        color: #717171;
      }
    }
    button.addBtn {
      width: 1.75rem;
      height: 1.75rem;
      background: #ffffff;
      border: 1px solid #e9e4dc;
      box-shadow: inset 0px -2px 6px #d5d2b7;
      border-radius: 0.875rem;
      margin: 3px;

      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      :hover {
        box-shadow: inset 0px -2px 6px #a57d48;
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
        zIndex: "5",
        top: "83px",

        height: "205px",
      }}
    >
      {props.children}
    </Scrollbars>
  );
}

const StyledScrollbars = styled(CustomScrollbars)`
  /* Hide the default scrollbar */
  ::-webkit-scrollbar {
    display: none;
  }

  /* Style the thumb */
  ::-webkit-scrollbar-thumb {
    background-color: #888888;
    border-radius: 10px;
  }

  /* Style the track */
  ::-webkit-scrollbar-track {
    background-color: #eee;
  }
`;

const SearchList = ({
  filterData,
  addingList,
  setAddingList,
  sliceFilterData,
  setSliceFilterData,
  sliceNumber,
  setSliceNumber,
  input,
  setInput,
}) => {
  // const onScroll = () => {
  //   if (listRef.current) {
  //     const { scrollHeight, scrollTop, clientHeight } = listRef.current;
  //     //我的元素會誤差1所以這樣寫@@
  //     if (Math.abs(scrollHeight - scrollTop - clientHeight) <= 1) {
  //       console.log("已經滾動到最底部了！");
  //       setSliceNumber(sliceNumber + 10);
  //     }
  //   }
  // };
  function onScroll(values) {
    if (values.top === 1) {
      console.log("已經滾動到最底部了！");
      setSliceNumber(sliceNumber + 10);
    }
  }

  function renderView({ style, ...props }) {
    return <div {...props} style={{ ...style }} />;
  }

  //==== slice filterData per 10 and set sliceFilterData
  useEffect(() => {
    if (filterData.length > 0) {
      setSliceFilterData(filterData.slice(0, sliceNumber));
    }
  }, [filterData, sliceNumber]);

  //==== click + button and add stock to adding list
  const addStockHandler = (d) => {
    if (!addingList.some((obj) => obj.Code === d.Code)) {
      setAddingList([...addingList, d]);
      setInput("");
    }
  };

  return (
    <StyledScrollbars
      renderView={renderView}
      onScrollFrame={onScroll}
      onScroll={onScroll}
    >
      <SearchList_styled>
        {sliceFilterData &&
          sliceFilterData.map((d) => {
            return (
              <li key={d.Code}>
                <div className="context">
                  <p className="name">{d.Name}</p>
                  <p className="code">{d.Code}</p>
                </div>
                <button className="addBtn" onClick={() => addStockHandler(d)}>
                  <img src={addBtnImg} alt="add button" />
                </button>
              </li>
            );
          })}
      </SearchList_styled>
    </StyledScrollbars>
  );
};

export default SearchList;
