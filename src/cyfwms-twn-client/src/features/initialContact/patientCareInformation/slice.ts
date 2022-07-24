import { doGetAPI, doPostAPI } from "./api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { SliceCaseReducers } from "@reduxjs/toolkit";
import type { AxiosResponse } from "axios";

export interface Data {
  fileDetailsId: number;
  patientCareInfoId: number;
  typeOfPatient: string;
  outpatient: {
    therapyOrCounseling: string;
    therapyTimePeriod: string;
    therapyLocation: string;
    reasonForTherapy: string;
    selfHelpGroup: string;
    selfHelpGroupPeriod: string;
    selfHelpGroupLocation: string;
  };
  inpatient: {
    hospitalizationRecord: string;
    hospitalizationReasons: string;
  };
}

// Empty Data
const emptyData: Data = {
  fileDetailsId: 0,
  patientCareInfoId: 0,
  typeOfPatient: "",
  outpatient: {
    therapyOrCounseling: "",
    therapyTimePeriod: "",
    therapyLocation: "",
    reasonForTherapy: "",
    selfHelpGroup: "",
    selfHelpGroupPeriod: "",
    selfHelpGroupLocation: "",
  },
  inpatient: {
    hospitalizationRecord: "",
    hospitalizationReasons: "",
  },
};

export interface State {
  data: Data;
  status: "failed" | "none" | "loading" | "success";
}

export const doGet = createAsyncThunk<Data, number>(
  "icPatientCareInformation/doGet",
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
  "icPatientCareInformation/doPost",
  async (formData: Data, { getState }) => {
    const store: any = getState();
    const res: AxiosResponse = await doPostAPI(formData, store.login.jwtToken);
    // Becomes the `fulfilled` action payload:
    return res.data;
  }
);

export const patientCareInformationSlice = createSlice<
  State,
  SliceCaseReducers<State>
>({
  name: "patientCareInformation",
  initialState: { data: emptyData, status: "failed" },
  reducers: {
    cleanState(state) {
      state = { data: emptyData, status: "none" };
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

export const { cleanState } = patientCareInformationSlice.actions;

export default patientCareInformationSlice.reducer;
