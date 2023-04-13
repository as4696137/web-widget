import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Scrollbars } from "react-custom-scrollbars-2";

const SearchList_styled = styled.ul`
  /* width: 80%; */
  /* height: 100%; */
  overflow: auto;
  position: absolute;

  /* z-index: 5; */
  li {
    background-color: #f1f1f1;
    border-bottom: 1px solid black;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0px 3px 10px 1px rgba(0, 0, 0, 0.2);
    .context {
      padding-left: 0.2rem;
      p.name {
        font-size: 1rem;
      }
      p.code {
        font-size: 0.5rem;
      }
    }
    button.addBtn {
      width: 1.6rem;
      height: 1.6rem;
      border: none;
      margin-right: 0.6rem;
      border-radius: 0.7rem;
    }
    &:hover {
      background-color: #f7f7f7;
    }
  }
`;

const StyledScrollbars = styled(CustomScrollbars)`
  /* Hide the default scrollbar */
  ::-webkit-scrollbar {
    display: none;
  }

  /* Style the thumb */
  ::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 10px;
  }

  /* Style the track */
  ::-webkit-scrollbar-track {
    background-color: #eee;
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
        top: "2.6rem",
        height: "15.4rem",
      }}
    >
      {props.children}
    </Scrollbars>
  );
}

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
                  +
                </button>
              </li>
            );
          })}
      </SearchList_styled>
    </StyledScrollbars>
  );
};

export default SearchList;
