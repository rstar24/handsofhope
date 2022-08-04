import { createSlice } from "@reduxjs/toolkit";
import type { SliceCaseReducers } from "@reduxjs/toolkit";

/** Popup State */
export interface State {
  /**
   * Indicates whether Popup is being
   * used in the context of "edit" mode.
   */
  edit: boolean;
  /**
   * Indicates whether Popup is being
   * used in the context of "edit" mode
   * as well as on "view" page.
   */
  view: boolean;
  /** Controls opening/closing of Popup. */
  open: boolean;
}

/** Popup Slice */
const popupSlice = createSlice<State, SliceCaseReducers<State>>({
  name: "popup",
  initialState: {
    edit: false, // Edit mode is unset.
    view: false, // View mode is unset.
    open: false, // Popup is closed.
  },
  reducers: {
    /** Set/Unset edit mode. */
    setEdit(state, action) {
      state.edit = action.payload;
    },
    /** Set/Unset view mode. */
    setView(state, action) {
      state.view = action.payload;
    },
    /** Open/Close popup. */
    setOpen(state, action) {
      state.open = action.payload;
    },
  },
});

export const { setEdit, setView, setOpen } = popupSlice.actions;

export default popupSlice.reducer;
