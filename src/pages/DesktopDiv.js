import styled, { keyframes } from "styled-components";
//import "https://fonts.googleapis.com/css2?family=Dangrek&display=swap";

//styled
export const DesktopDiv = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 0 32vh;
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

  @media screen and (max-width: 2260px) {
    padding: 0 20vh;
  }
  @media screen and (max-width: 1945px) {
    padding: 0 8vh;
  }
  @media screen and (max-width: 1630px) {
    padding: 0 0vh;
  }

  div.navbar {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 100;

    button.menu {
      position: fixed;
      display: none;
      width: 30px;
      height: 21px;
      background: none;
      border: none;
      right: 20px;
      top: 20px;
      z-index: 51;
      cursor: pointer;

      div.menu_icon {
        width: 100%;
        height: 3px;
        background-color: ${(props) =>
          props.IsDarkMode ? "#ffffff" : "#66546c"};
        transition: all 0.2s ease;
      }
      div.icon1 {
        transform: ${(props) =>
          props.IsMenuOpen
            ? "rotate(45deg) translateY(8px) translateX(5px)"
            : "rotate(0deg) translateY(0)"};
      }
      div.icon2 {
        opacity: ${(props) => (props.IsMenuOpen ? "0" : "1")};
      }
      div.icon3 {
        transform: ${(props) =>
          props.IsMenuOpen
            ? "rotate(-45deg) translateY(-8px) translateX(5px)"
            : "rotate(0deg) translateY(0)"};
      }
    }

    div.navItems {
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

    //div.navbar media
    @media screen and (max-width: 1160px) {
      height: 100%;
      width: 100%;
      overflow: hidden;
      button.menu {
        position: absolute;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
      div.navItems {
        position: fixed;
        width: 320px;
        height: 100%;
        top: 0;
        right: ${(props) => (props.IsMenuOpen ? "0px" : "-320px")};
        flex-direction: column;
        justify-content: start;
        align-items: end;
        z-index: 50;

        transition: right 0.2s ease;

        div.navBG {
          position: absolute;
          width: 100%;
          height: 100%;
        }
        div.BG1 {
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 1) 50%
          );
          opacity: ${(props) => (props.IsDarkMode ? "0" : "1")};
        }
        div.BG2 {
          background: linear-gradient(
            90deg,
            hsla(0, 0%, 0%, 0) 5%,
            #1c151f 50%
          );
          opacity: ${(props) => (props.IsDarkMode ? "1" : "0")};
        }

        button.darkMode {
          margin-top: 100px;
        }
      }
    }
  }

  div.top {
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: "Dangrek", cursive;

    @media screen and (max-width: 768px) {
      width: 80%;
      justify-content: space-between;
    }

    @media screen and (max-width: 576px) {
      flex-direction: column-reverse;
    }
  }

  .happyZone {
    max-width: 95vw;
    height: 70%;
    /* background-color: rgba(207, 207, 207, 0.247); */

    margin-bottom: 50px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    align-content: start;
    flex-wrap: wrap;
    .littleDiv {
      margin: 15px;
      width: 325px;
      height: 325px;
      border-radius: 20px;
    }
  }

  //min height
  @media screen and (min-height: 1080px) {
    div.top {
      margin: 30px 0 10px 0;
    }
    div.navbar {
      top: 10px;
    }
  }

  @media screen and (min-height: 1280px) {
    div.top {
      margin: 60px 0 20px 0;
    }
    div.navbar {
      top: 20px;
    }
  }
`;
