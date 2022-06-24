import React from 'react';
import axios from 'axios';
import {
  loginLoading,
  loginSuccess,
  loginError,
  logoutLoading,
  logoutSuccess,
  logoutError,
} from "./loginSlice";

export const loginUser = async (user: any, dispatch: any) => {
  dispatch(loginLoading());
  try {
     const res = await axios.post("http://localhost:9088/v1/login/authenticate", user);
     dispatch(loginSuccess(res.data.jwtToken));
//     if (user.userName === "admin" && user.password === "admin123") {
//       await dispatch(loginSuccess(user));
//     } else {
//       dispatch(loginError());
//     }
  } catch (err) {
    dispatch(loginError());
  }
};

export const logoutUser = async (data: any, dispatch: any) => {
  dispatch(logoutLoading());
  try {
    // const res = await axios.post("", user);
    // dispatch(loginSuccess(res.data));
    console.log("data", data);
    dispatch(logoutSuccess(data));
  } catch (err) {
    dispatch(logoutError());
  }
};
