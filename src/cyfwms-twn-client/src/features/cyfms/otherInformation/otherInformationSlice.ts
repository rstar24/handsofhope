import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { AxiosResponse } from "axios";
import {
  doGetOtherInformationAPI,
  doPostOtherInformationAPI,
} from "./otherInformationAPI";

export interface OtherInformationGetData {
  readUser: {};
}

export interface OtherInformationGetState {
  jwtToken: string;
  status: "failed" | "loading" | "success";
}

export const doGetOtherInformation = createAsyncThunk(
  "otherInformation/doGetotherInformation",
  async (data: OtherInformationGetData, { dispatch, getState }) => {
    const res: AxiosResponse = await doGetOtherInformationAPI(
      data,
      (getState() as any).login.jwtToken
    );
    // Becomes the `fulfilled` action payload:
    return res.data;
  }
);

export interface OtherInformationPostData {
  user: {};
}

export interface OtherInformationPostState {
  jwtToken: string;
  status: "failed" | "loading" | "success";
}

export const doPostOtherInformation = createAsyncThunk(
  "otherInformation/doPostotherInformation",
  async (data: OtherInformationPostData, { dispatch, getState }) => {
    const res: AxiosResponse = await doPostOtherInformationAPI(
      data,
      (getState() as any).login.jwtToken
    );
    // Becomes the `fulfilled` action payload:
    return res.data;
  }
);

export const otherInformationSlice = createSlice({
  name: "otherInformation",
  initialState: {
    participantId: 0,
    readUser: {},
    user: {
      participantId: 0,
      participantOtherInfoId: 0,
      strength: "",
      weakness: "",
      skills: "",
      experiences: "",
      effectiveCopingSkills: "",
    },
    jwtToken: "",
    status: "failed",
  },
  reducers: {
    cleanOtherInformationState(state: any) {
      state.participantId = 0;
      state.readUser = { participantOtherInfoId: 0 };
      state.user = { participantOtherInfoId: 0 };
      state.jwtToken = "";
      state.status = "failed";
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(doGetOtherInformation.fulfilled, (state, action) => {
        try {
          //const decodedPayload: any = jwt(action.payload.jwtToken);
          state.readUser = action.payload;
        } catch (err) {
          console.log(err);
        }
        state.status = "success";
      })
      .addCase(doGetOtherInformation.pending, (state) => {
        state.status = "loading";
      })
      .addCase(doGetOtherInformation.rejected, (state) => {
        state.status = "failed";
      });
    builder
      .addCase(doPostOtherInformation.fulfilled, (state, action) => {
        try {
          //const decodedPayload: any = jwt(action.payload.jwtToken);
          state.user = action.payload;
        } catch (err) {
          console.log(err);
        }
        state.status = "success";
      })
      .addCase(doPostOtherInformation.pending, (state) => {
        state.status = "loading";
      })
      .addCase(doPostOtherInformation.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { cleanOtherInformationState } = otherInformationSlice.actions;

export default otherInformationSlice.reducer;
