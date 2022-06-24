import { createSlice } from "@reduxjs/toolkit";

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
      state.pending = false;
      state.user = action.payload;
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
