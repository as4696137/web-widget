import styled from "styled-components";

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
`;

export const LinkWidget_style = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  overflow: auto;
  justify-content: start;
  align-items: flex-start;
  align-content: flex-start;
  a.link-app {
    height: fit-content;
    margin: 1rem 0 0 1rem;
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
        background-color: #818181;
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
      top: -0.5rem;
      right: -0.5rem;
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
      height: 3.25rem;
      width: 3.25rem;
      border-radius: 0.5rem;
      background-color: #6b6b6b;

      display: flex;
      justify-content: center;
      align-items: center;
      img {
        height: 2rem;
        width: 2rem;
      }
    }

    p {
      font-size: 0.8rem;
      padding-top: 0.3rem;
      line-height: 1rem;
    }
  }
  div.addLink {
    margin: 1rem 0 0 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    &:hover {
      cursor: pointer;
      div.icon {
        background-color: #818181;
      }
    }
    div.icon {
      height: 3.25rem;
      width: 3.25rem;
      border: none;
      border-radius: 0.5rem;
      font-size: 2.5rem;
      background-color: #6b6b6b;
      color: white;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    p {
      font-size: 0.8rem;

      padding-top: 0.1rem;
    }
  }
`;

//======= popup edit button =======
export const PopupEditButton = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  div.popup {
    width: 200px;
    background-color: white;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: start;
    button {
      display: flex;
      align-items: center;
      img {
        height: 1rem;
        width: 1rem;
        margin: 0 0.2rem;
      }
    }
  }
`;

//======= popup delete link =======
export const PopupAddLink = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  div.popup {
    width: 200px;
    height: 200px;
    background-color: white;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    div.input {
      margin: 0.3rem;
      display: flex;
      flex-direction: column;
    }
    div.button {
      text-align: end;
      button {
        margin: 0.3rem;
      }
    }
  }
`;
