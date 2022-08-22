import { doGetAPI, doPostAPI } from "./api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { SliceCaseReducers } from "@reduxjs/toolkit";
import type { AxiosResponse } from "axios";

export interface Data {
  fileDetailsId: number;
  fileNumber: number;
  clientName: string;
  startingDate: string;
  caseworker: string;
  status: string;
  dateClosed: string;
}

// Empty Data
const emptyData: Data = {
  fileDetailsId: 0,
  fileNumber: 0,
  clientName: "",
  startingDate: "",
  caseworker: "",
  status: "",
  dateClosed: "",
};

export interface State {
  data: Data;
  disabledClosingDate: boolean;
  status: "failed" | "none" | "loading" | "success";
}

export const doGet = createAsyncThunk<Data, number>(
  "fileDetails/doGet",
  async (initialContactID, { getState }) => {
    const store: any = getState();
    const res: AxiosResponse = await doGetAPI(
      initialContactID,
      store.login.token
    );
    // Becomes the `fulfilled` action payload:
    return res.data;
  }
);

export const doPost = createAsyncThunk<Data, Data>(
  "fileDetails/doPost",
  async (formData: Data, { getState }) => {
    const store: any = getState();
    const res: AxiosResponse = await doPostAPI(formData, store.login.token);
    // Becomes the `fulfilled` action payload:
    return res.data;
  }
);

export const fileDetailsSlice = createSlice<State, SliceCaseReducers<State>>({
  name: "fileDetails",
  initialState: {
    data: emptyData,
    disabledClosingDate: true,
    status: "failed",
  },
  reducers: {
    disableClosingDate(state) {
      state.disabledClosingDate = true;
    },
    enableClosingDate(state) {
      state.disabledClosingDate = false;
    },
    cleanState(state) {
      state.disabledClosingDate = true;
      state.data = emptyData;
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
    builder
      .addCase(doPost.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "success";
      })
      .addCase(doPost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(doPost.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { disableClosingDate, enableClosingDate, cleanState } =
  fileDetailsSlice.actions;

export default fileDetailsSlice.reducer;
