import { createSlice } from "@reduxjs/toolkit";
import type { SliceCaseReducers } from "@reduxjs/toolkit";

export interface State {
  isInitiated: boolean;
}

const navBarSlice = createSlice<State, SliceCaseReducers<State>>({
  name: "initiator",
  initialState: { isInitiated: false },
  reducers: {
    initiate(state) {
      state.isInitiated = true;
    },
    uninitiate(state) {
      state.isInitiated = false;
    },
  },
});

export const { initiate, uninitiate } = navBarSlice.actions;

export default navBarSlice.reducer;
