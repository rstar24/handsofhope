import { createSlice } from "@reduxjs/toolkit";
import type { SliceCaseReducers } from "@reduxjs/toolkit";

export interface State {
  tabsHidden: boolean;
}

const navBarSlice = createSlice<State, SliceCaseReducers<State>>({
  name: "navBar",
  initialState: { tabsHidden: true },
  reducers: {
    hideTabs(state) {
      state.tabsHidden = true;
    },
    unhideTabs(state) {
      state.tabsHidden = false;
    },
  },
});

export const { hideTabs, unhideTabs } = navBarSlice.actions;

export default navBarSlice.reducer;
