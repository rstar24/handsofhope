import { createSlice } from "@reduxjs/toolkit";
import type { SliceCaseReducers } from "@reduxjs/toolkit";

export interface State {
  tabsHidden: boolean;
}

const sideNavBarSlice = createSlice<State, SliceCaseReducers<State>>({
  name: "sideNavBar",
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

export const { hideTabs, unhideTabs } = sideNavBarSlice.actions;

export default sideNavBarSlice.reducer;
