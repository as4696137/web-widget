import styled from "styled-components";
//import "https://fonts.googleapis.com/css2?family=Dangrek&display=swap";

//styled
export const DesktopDiv = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  background: linear-gradient(180deg, #ffffff 8.85%, #e9e4dc 100%);
  transition: all 0.2s ease;
  z-index: 1;
  &::before {
    position: absolute;
    content: "";
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: linear-gradient(180deg, #66546c 8.85%, #000000 89.06%);
    opacity: ${(props) => (props.IsDarkMode ? "1" : "0")};
    z-index: -1;
    transition: all 1s ease-out;
  }

  div.navbar {
    position: absolute;
    width: 100%;
    display: flex;
    justify-content: end;
    align-items: center;

    button.darkMode {
      margin: 20px;
      position: relative;
      width: 75px;
      height: 30px;
      border: 1px solid #eaeaea;
      background: none;
      filter: drop-shadow(0px 2px 6px rgba(102, 84, 108, 0.53));
      border-radius: 33px;
      cursor: pointer;
      display: flex;
      align-items: center;
      transition: all 0.2s ease;

      //justify-content: ${(props) => (props.IsDarkMode ? "end" : "start")};
      span.switch {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 36px;
        height: 36px;
        border: 1px solid #eaeaea;
        border-radius: 50%;
        background: linear-gradient(180deg, #ffffff 32.81%, #f2f2f2 100%);
        box-shadow: 0px 2px 6px rgba(185, 169, 129, 0.53);
        position: absolute;
        right: ${(props) => (props.IsDarkMode ? "39px" : "0rem")};
        transition: all 0.2s ease;
      }
    }
  }

  div.top {
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: "Dangrek", cursive;
  }

  .happyZone {
    width: 95%;
    height: 70%;
    /* background-color: rgba(207, 207, 207, 0.247); */
    border-radius: 10px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: start;
    align-content: start;
    flex-wrap: wrap;
    .littleDiv {
      margin: 15px;
      width: 325px;
      height: 325px;
      border-radius: 20px;
    }
  }
`;
