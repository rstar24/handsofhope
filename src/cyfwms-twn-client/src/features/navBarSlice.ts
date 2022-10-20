import { createSlice } from "@reduxjs/toolkit";
import type { SliceCaseReducers } from "@reduxjs/toolkit";

export interface State {
  tabsHidden: boolean;
  homeColor:string,
  calendarColor:string
}

const navBarSlice = createSlice<State, SliceCaseReducers<State>>({
  name: "navBar",
  initialState: { tabsHidden: true,
                  homeColor:"red",
                  calendarColor:"none" 
                },
  reducers: {
    hideTabs(state) {
      state.tabsHidden = true;
    },
    unhideTabs(state) {
      state.tabsHidden = false;
    },

    changeHomeColor: (state, action) => {
      state.homeColor = action.payload;
      state.calendarColor = "none";
    },
    changeCalendarColor: (state,action) => {
      state.calendarColor = action.payload;
      state.homeColor = "none";
    },

    cleanState: (state) => {
      state.homeColor = "red";
      state.calendarColor = "none";
    }
  },
});

export const { hideTabs, unhideTabs, changeHomeColor, changeCalendarColor,cleanState } = navBarSlice.actions;

export default navBarSlice.reducer;
