import { doGetAPI } from "./api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { SliceCaseReducers } from "@reduxjs/toolkit";
import type { AxiosResponse } from "axios";

export interface Record {
  fileDetailsId: number | null;
  clientName: any | null;
  fileNumber: string | 0;
  caseworker: string | null;
  startingDate: string | null;
  status: string | null;
}

export interface State {
  data: Record[];
  status: "failed" | "none" | "loading" | "success";
}

export const doGet = createAsyncThunk<Record[], Record>(
  "search/doGet",
  async (formData, { getState }) => {
    const store: any = getState();
    const res: AxiosResponse = await doGetAPI(formData, store.login.token);
    // Becomes the `fulfilled` action payload:
    return res.data;
  }
);

export const searchSlice = createSlice<State, SliceCaseReducers<State>>({
  name: "search",
  initialState: {
    data: [],
    status: "none",
  },
  reducers: {
    /** Removes one record from data matching the given file number. */
    spliceRecord(state, action) {
      // Find index of the matching record in data.
      const index = state.data.findIndex(
        (element: Record) => element.fileNumber === action.payload
      );
      // Remove it.
      state.data.splice(index, 1);
    },
    cleanState(state) {
      state.data = [];
      state.status = "none";
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(doGet.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "success";
      })
      .addCase(doGet.pending, (state) => {
        state.status = "loading";
      })
      .addCase(doGet.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { spliceRecord, cleanState } = searchSlice.actions;

export default searchSlice.reducer;
