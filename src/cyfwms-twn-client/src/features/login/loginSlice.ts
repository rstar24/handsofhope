import React from 'react';
import { createSlice } from "@reduxjs/toolkit";
import jwt from "jwt-decode"
const loginSlice = createSlice({
  name: "login",
  initialState: {
    user: {
      username: "",
      password: "",
    },
    pending: false,
    authenticate: false,

    error: false,
  },

  reducers: {
    loginLoading: (state) => {
      state.pending = true;
    },
    loginSuccess: (state, action) => {
      const token  = action.payload;
      const name: any = jwt(token);
      state.pending = false;
      state.user = name.sub;
      state.authenticate = true;
      state.error = false;
    },
    loginError: (state) => {
      state.error = true;
      state.pending = false;
    },
    logoutLoading: (state) => {
      state.pending = true;
    },
    logoutSuccess: (state, action) => {
      state.pending = false;
      state.user.username = "";
      state.user.password = "";
      state.authenticate = false;
      state.error = false;
    },
    logoutError: (state) => {
      state.error = true;
      state.pending = false;
    },
  },
});
export const {
  loginLoading,
  loginSuccess,
  loginError,
  logoutLoading,
  logoutSuccess,
  logoutError,
} = loginSlice.actions;
export default loginSlice.reducer;
