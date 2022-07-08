import {
  doGetCriminalHistoryAPI,
  doPostCriminalHistoryAPI,
} from "./criminalhistoryAPI";
import type { AxiosResponse } from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface CriminalHistoryGetData {
  readUser: {};
}

export interface CriminalHistoryGetState {
  jwtToken: string;
  status: "failed" | "loading" | "success";
}

export const doGetCriminalHistory = createAsyncThunk(
  "criminalhistory/doGetCriminalHistory",
  async (data: CriminalHistoryGetData, { dispatch, getState }) => {
    const res: AxiosResponse = await doGetCriminalHistoryAPI(
      data,
      (getState() as any).login.jwtToken
    );
    // Becomes the `fulfilled` action payload:
    return res.data;
  }
);

export interface CriminalHistoryPostData {
  user: {};
}

export interface CriminalHistoryPostState {
  jwtToken: string;
  status: "failed" | "loading" | "success";
}

export const doPostCriminalHistory = createAsyncThunk(
  "criminalhistory/doPostCriminalHistory",
  async (data: CriminalHistoryPostData, { dispatch, getState }) => {
    const res: AxiosResponse = await doPostCriminalHistoryAPI(
      data,
      (getState() as any).login.jwtToken
    );
    // Becomes the `fulfilled` action payload:
    return res.data;
  }
);

export const criminalhistorySlice = createSlice({
  name: "criminalhistory",
  initialState: {
    participantId: 0,
    readUser: {},
    user: {
      criminalHistoryId: 0,
      criminalHistoryRecordList: [
        {
          criminalHistoryRecordId: 0,
          charges: "",
          arrestDate: "",
          conviction: "",
          sentence: "",
        },
      ],
      probation: "",
      parole: "",
      conditions: "",
      courtWorkerAndContactInfo: "",
      participantId: "",
    },
    jwtToken: "",
    status: "failed",
  },
  reducers: {
    cleanCriminalHistoryState(state: any) {
      state.participantId = 0;
      state.readUser = { criminalHistoryId: 0 };
      state.user = { criminalHistoryId: 0 };
      state.jwtToken = "";
      state.status = "failed";
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(doGetCriminalHistory.fulfilled, (state, action) => {
        try {
          //const decodedPayload: any = jwt(action.payload.jwtToken);
          state.readUser = action.payload;
        } catch (err) {
          console.log(err);
        }

        state.status = "success";
      })
      .addCase(doGetCriminalHistory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(doGetCriminalHistory.rejected, (state) => {
        state.status = "failed";
      });
    builder
      .addCase(doPostCriminalHistory.fulfilled, (state, action) => {
        try {
          //const decodedPayload: any = jwt(action.payload.jwtToken);
          state.user = action.payload;
        } catch (err) {
          console.log(err);
        }

        state.status = "success";
      })
      .addCase(doPostCriminalHistory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(doPostCriminalHistory.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { cleanCriminalHistoryState } = criminalhistorySlice.actions;

export default criminalhistorySlice.reducer;
