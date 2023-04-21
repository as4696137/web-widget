import React, { useState, useEffect } from "react";
import Clock from "../components/Clock";
import Weather from "../components/Weather";
import ChooseWidget from "../components/ChooseWidget";
import { DesktopDiv } from "./DesktopDiv";
import GoogleLoginSystem from "../components/GoogleLoginSystem";
import sunImg from "../img/svg/darkmode_sun.svg";
import moonImg from "../img/svg/darkmode_moon.svg";

const Desktop = () => {
  const [IsDarkMode, setDarkMode] = useState(false);
  const darkModeHandler = (e) => {
    e.preventDefault();
    setDarkMode(!IsDarkMode);
  };

  const [user, setUser] = useState(null);

  return (
    <DesktopDiv IsDarkMode={IsDarkMode}>
      <div className="navbar">
        <button className="darkMode" onClick={darkModeHandler}>
          <span className="switch">
            <img src={IsDarkMode ? moonImg : sunImg} alt="darkmode icon" />
          </span>
        </button>
        <GoogleLoginSystem user={user} setUser={setUser} />
      </div>

      <div className="top">
        <Clock IsDarkMode={IsDarkMode} />

        <Weather IsDarkMode={IsDarkMode} />
      </div>

      <div className="happyZone">
        <div className="littleDiv">
          <ChooseWidget user={user} setUser={setUser} />
        </div>
        <div className="littleDiv">
          <ChooseWidget user={user} setUser={setUser} />
        </div>
        <div className="littleDiv">
          <ChooseWidget user={user} setUser={setUser} />
        </div>
        <div className="littleDiv">
          <ChooseWidget user={user} setUser={setUser} />
        </div>
        <div className="littleDiv">
          <ChooseWidget user={user} setUser={setUser} />
        </div>
        <div className="littleDiv">
          <ChooseWidget user={user} setUser={setUser} />
        </div>
        <div className="littleDiv">
          <ChooseWidget user={user} setUser={setUser} />
        </div>
        <div className="littleDiv">
          <ChooseWidget user={user} setUser={setUser} />
        </div>
      </div>
    </DesktopDiv>
  );
};

export default Desktop;
