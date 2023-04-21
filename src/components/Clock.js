import React, { useState, useEffect } from "react";
import styled from "styled-components";

const ClockDiv = styled.div`
  font-size: 96px;
  line-height: 173px;
  letter-spacing: 0.065em;
  transition: all 0.2s ease;
  color: ${(props) => (props.IsDarkMode ? "white" : "#66546C")};
  margin-right: 50px;
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
