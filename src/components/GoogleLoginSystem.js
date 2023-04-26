import React from "react";
import styled from "styled-components";
import userImage from "../img/svg/user.svg";

import { initializeApp } from "firebase/app";

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";

import { firebaseConfig } from "../firebase/config";

const GoogleLoginSystem_style = styled.div`
  margin-right: 175px;
  position: relative;
  display: flex;
  align-items: center;
  cursor: default;

  div.icon {
    left: 0;
    height: 36px;
    width: 36px;
    background: linear-gradient(180deg, #ffffff 32.81%, #f2f2f2 100%);
    border: 1px solid #eaeaea;
    border-radius: 18px;
    box-shadow: 0px 2px 6px rgba(185, 169, 129, 0.53);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 4;
  }

  .userName {
    position: absolute;
    display: inline-block;
    padding: 2px 26px 2px 34px;
    border: solid 1px black;

    left: 14px;
    border: 1px solid #eaeaea;
    background: #ffffff;
    filter: drop-shadow(0px 2px 6px rgba(102, 84, 108, 0.53));
    border-radius: 6px;
    z-index: 3;

    text-align: center;

    font-family: "Noto Sans TC";
    font-weight: 700;
    font-size: 1rem;
    letter-spacing: 0.09em;
    color: #66546c;
    span {
      max-width: 100%; /* 最大寬度為容器寬度 */
      white-space: nowrap; /* 不換行 */
      overflow: hidden; /* 超出部分隱藏 */
      text-overflow: ellipsis; /* 超出部分以省略號表示 */
    }
  }

  button.login {
    position: absolute;
    left: 14px;
    padding-left: 10px;
    width: 119px;
    height: 30px;
    border: 1px solid #eaeaea;
    background: #ffffff;
    filter: drop-shadow(0px 2px 6px rgba(102, 84, 108, 0.53));
    border-radius: 6px;
    z-index: 3;
  }
  button {
    border: 1px solid #eaeaea;
    background: #ffffff;
    border-radius: 6px;
    text-align: center;

    font-family: "Noto Sans TC";
    font-weight: 700;
    font-size: 1rem;
    letter-spacing: 0.09em;
    color: #66546c;
    translate: all 0.2s ease;
    cursor: pointer;
    &:hover {
      background: #66546c;
      color: #ffffff;
    }
  }

  button.logout {
    position: absolute;
    top: 0px;
    left: 14px;
    width: 50px;
    height: 30px;
    color: #66546c;
    background: #ffffff;
    border: 1px solid #66546c;
    border-radius: 6px;
    box-shadow: 0px 2px 6px rgba(102, 84, 108, 0.53);
    letter-spacing: 0.09em;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;

    z-index: 1;
    opacity: 0;
    transition: all 0.1s ease-in-out, top 0.3s ease-in-out,
      opacity 0.3s ease-in-out;
    &:hover {
      background: #66546c;
      color: #ffffff;
    }
  }
  &:hover {
    button.logout {
      top: 33px;
      opacity: 1;
    }
  }
`;

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();

//讓你每次登入都會重新不會記憶其他的帳號
provider.setCustomParameters({
  prompt: "select_account",
});

const GoogleLoginSystem = ({ user, setUser }) => {
  const loginHandler = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        setUser(user);

        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  const logoutHandler = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
        console.log("Sign-out successful.");
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <GoogleLoginSystem_style>
      <div className="icon">
        <img src={userImage} alt="user icon" />
      </div>

      {user ? (
        <div className="userName" title={user.email}>
          <span>{user.displayName}</span>
        </div>
      ) : (
        <button className="login" onClick={loginHandler}>
          登入
        </button>
      )}

      {user && (
        <button className="logout" onClick={logoutHandler}>
          登出
        </button>
      )}

      {/* {user ? (
        <div className="logged-in">
          <img src={user.photoURL} alt="user image" />
          <p>Email:{user.email}</p>
          <p>你好，{user.displayName}！</p>
          <button onClick={logoutHandler}>登出</button>
        </div>
      ) : (
        <div className="non-login">
          <button onClick={loginHandler}>登入</button>
        </div>
      )} */}
    </GoogleLoginSystem_style>
  );
};

export default GoogleLoginSystem;
