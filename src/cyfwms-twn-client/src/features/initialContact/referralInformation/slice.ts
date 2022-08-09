import { doGetAPI, doPostAPI } from "./api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { SliceCaseReducers } from "@reduxjs/toolkit";
import type { AxiosResponse } from "axios";

export interface Data {
  fileDetailsId: number;
  referralInfoId: number;
  referral: string;
  selfReferred: boolean;
  agencyName: string;
  name: string;
  address: string;
  phone: string;
  email: string;
}

// Empty Data
const emptyData: Data = {
  fileDetailsId: 0,
  referralInfoId: 0,
  referral: "",
  selfReferred: false,
  agencyName: "",
  name: "",
  address: "",
  phone: "",
  email: "",
};

export interface State {
  data: Data;
  status: "failed" | "none" | "loading" | "success";
}

export const doGet = createAsyncThunk<Data, number>(
  "referralInformation/doGet",
  async (initialContactID, { getState }) => {
    const store: any = getState();
    const res: AxiosResponse = await doGetAPI(
      initialContactID,
      store.login.jwtToken
    );
    // Becomes the `fulfilled` action payload:
    return res.data;
  }
);

export const doPost = createAsyncThunk<Data, Data>(
  "referralInformation/doPost",
  async (formData: Data, { getState }) => {
    const store: any = getState();
    const res: AxiosResponse = await doPostAPI(formData, store.login.jwtToken);
    // Becomes the `fulfilled` action payload:
    return res.data;
  }
);

export const referralInformationSlice = createSlice<
  State,
  SliceCaseReducers<State>
>({
  name: "referralInformation",
  initialState: { data: emptyData, status: "failed" },
  reducers: {
    flipSelfReferred(state) {
      state.data.selfReferred = !state.data.selfReferred;
    },
    cleanState(state) {
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

export const { flipSelfReferred, cleanState } =
  referralInformationSlice.actions;

export default referralInformationSlice.reducer;
