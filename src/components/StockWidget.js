import React, { useState, useEffect } from "react";
import styled from "styled-components";
import WatchingList from "./WatchingList";
import SearchList from "./SearchList";
import { app, auth } from "./GoogleLoginSystem";
import { getDatabase, ref, onValue, set } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";

const SearchDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
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

  input {
    margin: 38px 0px 0px 0px;
    padding: 6px 0;
    width: 251px;

    background: #ffffff;
    border-radius: 5px;
    border: none;
    box-shadow: inset 0px 2px 6px rgba(0, 0, 0, 0.25);

    font-family: "Noto Sans TC";
    font-weight: 500;
    font-size: 1rem;
    line-height: 23px;
    display: flex;
    align-items: center;
    text-align: center;
    letter-spacing: 0.09em;

    &:focus-visible {
      outline: none;
    }
  }
`;

const db = getDatabase(app);

const StockWidget = ({ user, setUser }) => {
  const [twAllData, setTwAllData] = useState({});
  const [input, setInput] = useState("");
  const [onComposition, setOnComposition] = useState(false);
  const [filterData, setFilterData] = useState([]);
  const [sliceFilterData, setSliceFilterData] = useState();
  const [sliceNumber, setSliceNumber] = useState(10);
  const [addingList, setAddingList] = useState([]);
  const [watchingList, setWatchingList] = useState([]);
  const [isClosed, setIsClosed] = useState();
  let [updateTimer, setUpdateTimer] = useState(0);
  //==== get tw stock all data
  const getTW_all_stocks = async () => {
    try {
      let d = await fetch(
        "https://openapi.twse.com.tw/v1/exchangeReport/STOCK_DAY_AVG_ALL"
      );
      let dj = await d.json();
      setTwAllData(dj);
    } catch (err) {
      console.log(err);
    }
  };

  //====  start
  useEffect(() => {
    // get all stocks' data
    getTW_all_stocks();

    //get user's stock adding list data
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const stockListRef = ref(db, `users/${user.uid}/stockList`);
        onValue(stockListRef, (snapshot) => {
          const stockData = snapshot.val();
          const addingList = [];
          for (let id in stockData) {
            addingList.push({ id, ...stockData[id] });
          }
          setAddingList(addingList);
        });
      } else {
        setUser(null);
        setAddingList([]);
      }
    });
  }, []);

  //==== search and filter stock data
  const searchInputHandler = (e) => {
    if (e.type === "compositionstart") {
      setOnComposition(true);
    } else if (e.type === "compositionend") {
      setOnComposition(false);
    }
    setInput(e.target.value);
  };

  //if inputing,show the data whhich include keywords
  useEffect(() => {
    //always reset sliceNumber
    setSliceNumber(10);
    //==== filter the data which you input
    if (twAllData.length && !onComposition) {
      const filterData = twAllData.filter(
        (obj) => obj.Code.includes(input) || obj.Name.includes(input)
      );
      //console.log(filterData);
      if (input === "") {
        setFilterData([]);
        setSliceFilterData([]);
      } else {
        setFilterData(filterData);
      }
    }
  }, [input, onComposition]);

  //==== fetch every stock's data in adding list
  let token = "2474e1d2a94d1f54034ecafac921bf2d";
  useEffect(() => {
    if (addingList.length > 0) {
      if (user) {
        const stockListRef = ref(db, `users/${user.uid}/stockList`);
        set(stockListRef, addingList);
      }

      const getTW_real_time_stocks = async () => {
        let urls = addingList.map(
          (obj) =>
            `https://api.fugle.tw/realtime/v0.3/intraday/quote?symbolId=${obj.Code}&apiToken=${token}`
        );

        try {
          let all_data = await Promise.all(urls.map((url) => fetch(url)));
          let all_data_json = await Promise.all(
            all_data.map((data) => data.json())
          );
          //console.log(all_data_json);
          setWatchingList(
            all_data_json.map((obj) => ({
              name: addingList.find((o) => {
                if (o.Code === obj.data.info.symbolId) {
                  return o.Name;
                }
              }).Name,
              id: obj.data.info.symbolId,
              price: obj.data.quote.trade.price,
              change: obj.data.quote.change,
              changePercent: obj.data.quote.changePercent,
            }))
          );

          //==== is closed
          if (all_data_json[0].data.quote.isClosed === false) {
            setIsClosed(false);
          } else if (all_data_json[0].data.quote.isClosed === true) {
            setIsClosed(true);
          }
        } catch (err) {
          console.log(err);
        }
      };
      getTW_real_time_stocks();
    } else {
      setWatchingList([]);
    }
  }, [addingList, updateTimer]);

  //==== if the market have not closed,update the data.
  useEffect(() => {
    function auto_update_stocks_data() {
      setUpdateTimer((p) => p + 1);
    }

    if (isClosed == false) {
      setInterval(auto_update_stocks_data, 5000);
    } else if (isClosed == true) {
      console.log(isClosed);
      clearInterval(auto_update_stocks_data);
    }
  }, [isClosed]);

  //==== console
  useEffect(() => {
    if (watchingList.length > 0) {
      console.log(watchingList);
    }
  }, [watchingList]);

  return (
    <SearchDiv>
      <div className="title">查看股票</div>
      <input
        placeholder="請輸入股票代號或名稱"
        onCompositionStart={searchInputHandler}
        onCompositionUpdate={searchInputHandler}
        onCompositionEnd={searchInputHandler}
        onChange={searchInputHandler}
        type="text"
        value={input}
      />
      {input !== "" ? (
        <SearchList
          filterData={filterData}
          addingList={addingList}
          setAddingList={setAddingList}
          sliceFilterData={sliceFilterData}
          setSliceFilterData={setSliceFilterData}
          sliceNumber={sliceNumber}
          setSliceNumber={setSliceNumber}
          input={input}
          setInput={setInput}
        />
      ) : null}

      <WatchingList
        watchingList={watchingList}
        addingList={addingList}
        setAddingList={setAddingList}
      />
    </SearchDiv>
  );
};

export default StockWidget;
