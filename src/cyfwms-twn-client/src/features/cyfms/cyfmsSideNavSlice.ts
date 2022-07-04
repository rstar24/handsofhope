import { createSlice } from "@reduxjs/toolkit";

export interface cyfmsSideNavState {
  hideTabs: boolean;
}

const cyfmsSideNavSlice = createSlice({
  name: "cyfmsSideNav",
  initialState: {
    hideTabs: true,
  } as cyfmsSideNavState,
  reducers: {
    hideTabs(state: cyfmsSideNavState) {
      state.hideTabs = true;
    },
    unhideTabs(state: cyfmsSideNavState) {
      state.hideTabs = false;
    },
  },
});

export const { hideTabs, unhideTabs } = cyfmsSideNavSlice.actions;

export default cyfmsSideNavSlice.reducer;
