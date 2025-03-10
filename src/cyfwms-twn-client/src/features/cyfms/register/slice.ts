import { doGetAPI, doPostAPI } from "./api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../../library/store";
import type { SliceCaseReducers } from "@reduxjs/toolkit";
import type { AxiosResponse } from "axios";

export interface Data {
  participantId: number;
  firstname: string;
  middleName: string;
  surname: string;
  dateOfBirth: string;
  gender: string;
  maritalStatus: string;
  referenceId: number;
  participantImageId: number;
  image: string;
  type: string;
  participantImageName: string;
}

// Empty Data
const emptyData: Data = {
  participantId: 0,
  firstname: "",
  middleName: "",
  surname: "",
  dateOfBirth: "",
  gender: "",
  maritalStatus: "",
  referenceId: 0,
  participantImageId: 0,
  image: "",
  type: "",
  participantImageName: "",
};

export interface State {
  data: Data;
  status: "failed" | "none" | "loading" | "success";
}

export const doGet = createAsyncThunk<Data, number>(
  "register/doGet",
  async (participantID, { getState }) => {
    const store = getState() as RootState;
    const res: AxiosResponse = await doGetAPI(participantID, store.login.token);
    // Becomes the `fulfilled` action payload:
    return res.data;
  }
);

export const doPost = createAsyncThunk<Data, FormData>(
  "register/doPost",
  async (formData, { getState }) => {
    const store = getState() as RootState;
    const res: AxiosResponse = await doPostAPI(formData, store.login.token);
    // Becomes the `fulfilled` action payload:
    return res.data;
  }
);

export const registerSlice = createSlice<State, SliceCaseReducers<State>>({
  name: "register",
  initialState: { data: emptyData, status: "none" },
  reducers: {
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
        // Due to backend erratic implementation
        // Upon not providing image when saving form,
        // response object does not return image related information.
        if (action.payload.image) {
          state.data = action.payload;
        } else {
          state.data.dateOfBirth = action.payload.dateOfBirth;
          state.data.firstname = action.payload.firstname;
          state.data.gender = action.payload.gender;
          state.data.maritalStatus = action.payload.maritalStatus;
          state.data.middleName = action.payload.middleName;
          state.data.participantId = action.payload.participantId;
          state.data.referenceId = action.payload.referenceId;
          state.data.surname = action.payload.surname;
        }
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

export const { cleanState } = registerSlice.actions;

export default registerSlice.reducer;
