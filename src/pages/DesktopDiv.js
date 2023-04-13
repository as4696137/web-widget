import styled from "styled-components";

//styled
export const DesktopDiv = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  background-color: ${(props) => (props.IsDarkMode ? "black" : "white")};
  transition: all 0.2s ease;
  button.darkMode {
    margin: 20px;
    position: absolute;
    right: 5vw;
    width: 2.5rem;
    height: 1.25rem;
    border: 2px solid ${(props) => (props.IsDarkMode ? "white" : "black")};
    background-color: ${(props) => (props.IsDarkMode ? "black" : "white")};
    border-radius: 1rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    transition: all 0.2s ease;

    //justify-content: ${(props) => (props.IsDarkMode ? "end" : "start")};
    span.switch {
      display: inline-block;
      width: 1rem;
      height: 1rem;
      border: 2px solid ${(props) => (props.IsDarkMode ? "white" : "black")};
      border-radius: 1rem;
      position: absolute;
      left: ${(props) => (props.IsDarkMode ? "1.25rem" : "0rem")};
      transition: all 0.2s ease;
    }
  }
  .happyZone {
    width: 95%;
    height: 70%;
    background-color: rgb(207, 207, 207);
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: start;
    align-content: start;
    flex-wrap: wrap;
    .littleDiv {
      overflow: hidden;
      margin: 15px;
      width: 18rem;
      height: 18rem;
      border-radius: 1rem;
      background-color: #bdbdbd;
    }
  }
`;
