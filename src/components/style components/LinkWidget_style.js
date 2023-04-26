import styled from "styled-components";
import { Scrollbars } from "react-custom-scrollbars-2";

function CustomScrollbars(props) {
  return (
    <Scrollbars
      autoHide
      autoHideTimeout={1000}
      autoHideDuration={200}
      style={{
        position: "absolute",
        top: "30px",
        height: "250px",
        zIndex: "3",
      }}
    >
      {props.children}
    </Scrollbars>
  );
}

export const StyledScrollbars = styled(CustomScrollbars)`
  height: 200px;
  width: 100px;

  /* Hide the default scrollbar */
  ::-webkit-scrollbar {
    display: none;
  }

  /* Style the thumb */
  ::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 10px;
  }

  /* Style the track */
  ::-webkit-scrollbar-track {
    background-color: #eee;
  }
`;

export const Title = styled.div`
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
  z-index: 10;
`;

export const LinkWidget_style = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  overflow: auto;
  justify-content: start;
  align-items: flex-start;
  align-content: flex-start;
  padding: 0 24px 0 31px;

  z-index: 5;
  a.link-app {
    height: fit-content;
    padding: 8px 7px 8px 0;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    position: relative;
    color: black;
    text-decoration: none;

    &:hover {
      cursor: pointer;
      button.edit-app {
        opacity: 1;
      }
      div.icon {
      }
    }

    button.edit-app {
      height: 1.5rem;
      width: 1.5rem;
      border: none;
      border-radius: 0.75rem;
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      top: 0;
      right: 0;
      opacity: 0;
      transition: all 0.2s ease-in-out;
      background-color: #e9e9e9;
      &:hover {
        cursor: pointer;
        background-color: #ffffff;
      }

      img {
        height: 0.75rem;
        width: 0.75rem;
      }
    }

    div.icon {
      height: 60px;
      width: 60px;
      border-radius: 5px;
      background: #ffffff;
      border: 1px solid #e9e4dc;
      box-shadow: inset 0px -2px 6px #d5d2b7;

      display: flex;
      justify-content: center;
      align-items: center;
      img {
        height: 2rem;
        width: 2rem;
      }
    }

    p {
      font-family: "Noto Sans TC";
      font-weight: 500;
      font-size: 10px;
      line-height: 14px;
      letter-spacing: 0.09em;
      color: #595959;

      padding-top: 5px;
    }
  }
  div.addLink {
    padding: 8px 7px 8px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    &:hover {
      cursor: pointer;
      div.icon {
        box-shadow: inset 0px -2px 13px rgba(0, 0, 0, 0.25);
        img {
          transform: translate(-1px, -1px);
        }
      }
    }
    div.icon {
      height: 60px;
      width: 60px;
      border: none;
      background: #d8ccb8;
      box-shadow: inset 2px 3px 13px rgba(0, 0, 0, 0.25);
      border-radius: 11px;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: all 0.5s ease;
      img {
        height: 23px;
        width: 23px;
        transform: translate(1px, 1px);
        transition: all 0.5s ease;
      }
    }
    p {
      font-family: "Noto Sans TC";
      font-weight: 500;
      font-size: 10px;
      line-height: 14px;
      letter-spacing: 0.09em;
      color: #595959;

      padding-top: 5px;
    }
  }
`;

//======= popup edit button =======
export const PopupEditButton = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 325px;
  height: 325px;
  background: linear-gradient(
    180deg,
    rgba(215, 212, 216, 0.9) 0%,
    #ffffff 60.42%
  );
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;

  div.popup {
    display: flex;
    flex-direction: column;
    justify-content: start;
    button {
      display: flex;
      align-items: center;
      padding: 7.5px 33px 7.5px 21px;

      font-family: "Noto Sans TC";
      font-weight: 700;
      font-size: 1rem;
      letter-spacing: 0.09em;
      color: #595959;

      background: #ffffff;
      border: 1px solid #eaeaea;
      box-shadow: inset 0px -3px 12px rgba(0, 0, 0, 0.17);
      border-radius: 10px;
      cursor: pointer;
      img {
        height: 13px;
        width: 13px;
        margin-right: 10px;
      }
      &:hover {
        background: #fffcf1;
      }
    }

    button.edit {
      margin-bottom: 16px;
    }
  }
`;

//======= popup delete link =======
export const PopupAddLink = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 325px;
  height: 325px;
  background: linear-gradient(
    180deg,
    rgba(215, 212, 216, 0.9) 0%,
    #ffffff 60.42%
  );
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  div.popup {
    width: 244px;
    height: 250px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    div.input {
      margin: 0.3rem;
      display: flex;
      flex-direction: column;
    }
    label {
      width: 119px;
      height: 33px;
      margin-bottom: 8px;
      align-items: center;
      padding: 5px 25px;

      background: #c1bac4;
      border: 1px solid #eaeaea;
      box-shadow: inset 0px -3px 12px rgba(0, 0, 0, 0.42);
      border-radius: 20px;

      display: flex;
      justify-content: center;
      align-items: center;
      font-family: "Noto Sans TC";
      font-weight: 700;
      font-size: 1rem;
      line-height: 23px;
      letter-spacing: 0.09em;
      color: #ffffff;
    }
    input {
      background: #ffffff;
      box-shadow: inset 0px 2px 6px rgba(0, 0, 0, 0.25);
      border-radius: 5px;
      padding: 0 19px 0 25px;
      border: none;
      margin-bottom: 16px;
      width: 100%;
      height: 40px;

      font-family: "Noto Sans TC";
      font-weight: 700;
      font-size: 1rem;
      line-height: 23px;
      letter-spacing: 0.09em;
    }
    div.button {
      text-align: end;
      display: flex;
      justify-content: space-between;
      align-items: end;
      button {
        width: 115px;
        height: 50px;
        background: #ffffff;
        border: 1px solid #eaeaea;
        box-shadow: inset 0px -3px 12px rgba(0, 0, 0, 0.17);
        border-radius: 15px;

        font-family: "Noto Sans TC";
        font-weight: 700;
        font-size: 18px;
        line-height: 26px;
        letter-spacing: 0.09em;
        color: #595959;

        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        cursor: pointer;

        transition: all 0.1s ease-in;
        &:hover {
          box-shadow: inset 0px -4px 13px rgba(0, 0, 0, 0.26);
        }
      }
    }
  }
`;
