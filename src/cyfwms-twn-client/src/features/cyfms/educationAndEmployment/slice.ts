import { doGetAPI, doPostAPI } from "./api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../../library/store";
import type { SliceCaseReducers } from "@reduxjs/toolkit";
import type { AxiosResponse } from "axios";

export interface Data {
  participantId: number;
  educationId: number;
  employmentId: number;
  attendingSchool: string;
  school: string;
  grade: string;
  employed: string;
  typeOfEmployment: string;
  desiredProfession: string;
}

// Empty Data
const emptyData: Data = {
  participantId: 0,
  educationId: 0,
  employmentId: 0,
  attendingSchool: "",
  school: "",
  grade: "",
  employed: "",
  typeOfEmployment: "",
  desiredProfession: "",
};

export interface State {
  disabledSchoolFields: boolean;
  disabledDesiredProfession: boolean;
  data: Data;
  status: "failed" | "none" | "loading" | "success";
}

export const doGet = createAsyncThunk<Data, number>(
  "educationAndEmployment/doGet",
  async (participantID, { getState }) => {
    const store = getState() as RootState;
    const res: AxiosResponse = await doGetAPI(participantID, store.login.token);
    // Becomes the `fulfilled` action payload:
    return res.data;
  }
);

export const doPost = createAsyncThunk<Data, Data>(
  "educationAndEmployment/doPost",
  async (formData, { getState }) => {
    const store = getState() as RootState;
    const res: AxiosResponse = await doPostAPI(formData, store.login.token);
    // Becomes the `fulfilled` action payload:
    return res.data;
  }
);

export const educationAndEmploymentSlice = createSlice<
  State,
  SliceCaseReducers<State>
>({
  name: "educationAndEmployment",
  initialState: {
    disabledSchoolFields: true,
    disabledDesiredProfession: true,
    data: emptyData,
    status: "none",
  },
  reducers: {
    setSchoolFieldsDisabled(state, action) {
      state.disabledSchoolFields = action.payload;
    },
    setDesiredProfessionDisabled(state, action) {
      state.disabledDesiredProfession = action.payload;
    },
    cleanState(state) {
      state.disabledSchoolFields = true;
      state.disabledDesiredProfession = true;
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
        if (state.data.attendingSchool === "Yes") {
          state.disabledSchoolFields = false;
        }
        if (state.data.typeOfEmployment === "Job Search") {
          state.disabledDesiredProfession = false;
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

export const {
  setSchoolFieldsDisabled,
  setDesiredProfessionDisabled,
  cleanState,
} = educationAndEmploymentSlice.actions;

export default educationAndEmploymentSlice.reducer;
