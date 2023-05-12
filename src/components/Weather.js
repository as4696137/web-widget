import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ReactComponent as Sunny } from "../img/svg/weather-sunny.svg";
import { ReactComponent as Cloudy } from "../img/svg/weather-cloudy.svg";
import { ReactComponent as Rainy } from "../img/svg/weather-rainy.svg";
import { ReactComponent as Drizzle } from "../img/svg/weather-drizzle.svg";
import { ReactComponent as Stormy } from "../img/svg/weather-thounder.svg";
import { ReactComponent as someCloud } from "../img/svg/weather-someCloud.svg";

const WeatherDiv = styled.div`
  & path {
    fill: ${(props) => (props.IsDarkMode ? "#FFFFFF" : "#D5D2B7")};
  }
  font-size: 28px;
  width: 227px;
  display: flex;
  justify-content: start;
  align-items: center;
  color: ${(props) => (props.IsDarkMode ? "#FFFFFF" : "#D5D2B7")};

  div.weatherInfo {
    margin-left: 30px;
    display: flex;
    flex-direction: column;
    justify-content: start;

    p.temp {
      line-height: 22px;
      padding-bottom: 8px;
    }
    p.desc {
      font-family: "Noto Sans TC", sans-serif;
      letter-spacing: 0.09em;
      font-weight: 700;
      line-height: 32px;
    }
  }
  div.noData {
    font-family: "Noto Sans TC", sans-serif;
    width: 70%;
    text-align: justify;
    letter-spacing: 0.09em;
    font-weight: 400;
    font-size: 0.8rem;
    opacity: 0.8;
  }
  @media screen and (max-width: 768px) {
    div.weatherInfo {
      margin-left: 15px;
      p.temp {
        padding-bottom: 6px;
      }
    }
  }

  @media screen and (max-width: 576px) {
    justify-content: center;
    margin-top: 30px;
    div.weatherInfo {
      margin-left: 10px;
      p.temp {
        padding-bottom: 4px;
      }
    }
  }
`;

const Weather = ({ IsDarkMode }) => {
  const [weatherUrl, setweatherUrl] = useState("");
  const [weatherImage, setWeatherImage] = useState(null);
  const [data, setData] = useState(null);
  let key = "13afc153498cdf4954b987b271d7805c";
  let lang = "zh_tw";

  //location
  useEffect(() => {
    // Check if geolocation is available
    if (navigator.geolocation) {
      // Get current position
      navigator.geolocation.getCurrentPosition((position) => {
        setweatherUrl(
          `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${key}&lang=${lang}`
        );
      });
    }
  }, []);

  useEffect(() => {
    if (weatherUrl) {
      (async function getWeather() {
        let d = await fetch(weatherUrl);
        let dJ = await d.json();
        setData(dJ);
      })();
    }
  }, [weatherUrl]);

  useEffect(() => {
    if (data) {
      let id = data.weather[0].id;
      console.log(id);
      switch (true) {
        //雷雨
        case id >= 200 && id < 300:
          setWeatherImage("Stormy");
          break;

        //毛毛雨
        case id >= 300 && id < 400:
          setWeatherImage("Drizzle");
          break;

        //雨
        case id >= 500 && id < 600:
          setWeatherImage("Rainy");
          break;

        //晴天
        case id === 800:
          setWeatherImage("Sunny");
          break;

        //多雲時晴
        case id === 801:
          setWeatherImage("someCloud");
          break;

        //多雲
        case id >= 802 && id < 900:
          setWeatherImage("Cloudy");
          break;

        default:
          console.log("no");
          break;
      }
    }
  }, [data]);

  return (
    <WeatherDiv IsDarkMode={IsDarkMode}>
      {weatherImage === "Sunny" && <Sunny />}
      {weatherImage === "Stormy" && <Stormy />}
      {weatherImage === "Drizzle" && <Drizzle />}
      {weatherImage === "Rainy" && <Rainy />}
      {weatherImage === "Cloudy" && <Cloudy />}
      {weatherImage === "someCloud" && <someCloud />}
      {data && (
        <div className="weatherInfo">
          <p className="temp">
            {Object.keys(data).length !== 0 &&
              Math.floor(data.main.temp - 273.15)}
            °C
          </p>
          <p className="desc">
            {Object.keys(data).length !== 0 && `${data.weather[0].description}`}
          </p>
        </div>
      )}
      {!data && (
        <div className="noData">
          {":( 沒有位置資訊，請在設定中允許存取位置資訊來顯示天氣。"}
        </div>
      )}
    </WeatherDiv>
  );
};

export default Weather;
