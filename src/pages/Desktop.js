import React, { useState, useEffect } from "react";
import Clock from "../components/Clock";
import Weather from "../components/Weather";
import ChooseWidget from "../components/ChooseWidget";
import { DesktopDiv } from "./DesktopDiv";
import GoogleLoginSystem from "../components/GoogleLoginSystem";

const Desktop = () => {
  let [IsDarkMode, setDarkMode] = useState(false);
  const darkModeHandler = (e) => {
    e.preventDefault();
    setDarkMode(!IsDarkMode);
  };

  const [user, setUser] = useState(null);

  return (
    <DesktopDiv IsDarkMode={IsDarkMode}>
      <button className="darkMode" onClick={darkModeHandler}>
        <span className="switch"></span>
      </button>
      <Clock IsDarkMode={IsDarkMode} />
      <GoogleLoginSystem user={user} setUser={setUser} />
      <Weather />
      <div className="happyZone">
        <div className="littleDiv">
          <ChooseWidget user={user} setUser={setUser} />
        </div>
        <div className="littleDiv"></div>
        <div className="littleDiv"></div>
        <div className="littleDiv">
          <ChooseWidget user={user} setUser={setUser} />
        </div>
      </div>
    </DesktopDiv>
  );
};

export default Desktop;
