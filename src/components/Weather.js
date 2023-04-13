import React, { useState, useEffect } from "react";
import styled from "styled-components";

const WeatherDiv = styled.div``;

const Weather = () => {
  const [weatherUrl, setweatherUrl] = useState("");
  const [data, setData] = useState({});
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

  // useEffect(() => {
  //   console.log(data);
  // }, [data]);

  return (
    <WeatherDiv>
      <div className="temp">
        {Object.keys(data).length !== 0 && Math.floor(data.main.temp - 273.15)}
        °C
      </div>
      <div className="desc">
        {Object.keys(data).length !== 0 && `${data.weather[0].description}`}
      </div>
    </WeatherDiv>
  );
};

export default Weather;
