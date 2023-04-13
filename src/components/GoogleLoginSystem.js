import React, { useEffect, useState } from "react";

import { initializeApp } from "firebase/app";

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";

import { firebaseConfig } from "../firebase/config";

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
    <>
      {user ? (
        <div>
          <img src={user.photoURL} alt="user image" />
          <p>Email:{user.email}</p>
          <p>你好，{user.displayName}！</p>
          <button onClick={logoutHandler}>登出</button>
        </div>
      ) : (
        <div>
          <button onClick={loginHandler}>登入</button>
        </div>
      )}
    </>
  );
};

export default GoogleLoginSystem;
