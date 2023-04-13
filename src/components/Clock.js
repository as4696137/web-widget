import React, { useState, useEffect } from "react";
import styled from "styled-components";

const ClockDiv = styled.div`
  margin-top: 1rem;
  font-size: 4rem;
  transition: all 0.2s ease;
  color: ${(props) => (props.IsDarkMode ? "white" : "black")};
`;

const Clock = ({ IsDarkMode }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(updateTime, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  function updateTime() {
    const newTime = new Date();

    setTime(newTime);
  }

  let hours = time.getHours();
  let minutes = time.getMinutes();

  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  let timeString = hours + ":" + minutes;

  return <ClockDiv IsDarkMode={IsDarkMode}>{timeString}</ClockDiv>;
};

export default Clock;
