import { doGetIcFdAPI, doPostIcFdAPI } from "./icFdAPI";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { SliceCaseReducers } from "@reduxjs/toolkit";
import type { AxiosResponse } from "axios";

// Empty Data
const emptyData = {
  fileDetailsId: 0,
  fileNumber: 0,
  clientName: "",
  startingDate: "",
  caseworker: "",
  status: "",
  dateClosed: "",
};

export interface icFdData {
  fileDetailsId: number;
  fileNumber: number;
  clientName: string;
  startingDate: string;
  caseworker: string;
  status: string;
  dateClosed: string;
}

export interface icFdState {
  data: icFdData;
  status: "failed" | "none" | "loading" | "success";
}

export const doGetIcFD = createAsyncThunk<icFdData, number>(
  "initialContactFileDetails/doGetIcFD",
  async (initialContactID, { getState }) => {
    const store: any = getState();
    const res: AxiosResponse = await doGetIcFdAPI(
      initialContactID,
      store.login.jwtToken
    );
    // Becomes the `fulfilled` action payload:
    return res.data;
  }
);

export const doPostIcFD = createAsyncThunk<icFdData, icFdData>(
  "initialContactFileDetails/doPostIcFd",
  async (icFdFormData: icFdData, { getState }) => {
    const store: any = getState();
    const res: AxiosResponse = await doPostIcFdAPI(
      icFdFormData,
      store.login.jwtToken
    );
    // Becomes the `fulfilled` action payload:
    return res.data;
  }
);

export const icFileDetailsSlice = createSlice<
  icFdState,
  SliceCaseReducers<icFdState>
>({
  name: "icFileDetails",
  initialState: { data: emptyData, status: "failed" },
  reducers: {
    cleanIcFdState(state) {
      state = { data: emptyData, status: "none" };
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(doGetIcFD.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "success";
      })
      .addCase(doGetIcFD.pending, (state) => {
        state.status = "loading";
      })
      .addCase(doGetIcFD.rejected, (state) => {
        state.status = "failed";
      });
    builder
      .addCase(doPostIcFD.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "success";
      })
      .addCase(doPostIcFD.pending, (state) => {
        state.status = "loading";
      })
      .addCase(doPostIcFD.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { cleanIcFdState } = icFileDetailsSlice.actions;

export default icFileDetailsSlice.reducer;
