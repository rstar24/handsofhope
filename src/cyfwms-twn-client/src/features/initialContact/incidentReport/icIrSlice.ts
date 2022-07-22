import { doGetIcIrAPI, doPostIcIrAPI } from "./icIrAPI";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { SliceCaseReducers } from "@reduxjs/toolkit";
import type { AxiosResponse } from "axios";

// Empty Data
const emptyData = {
  fileDetailsId: 0,
  incidentReportId: 0,
  dateOfReport: "",
  reportedBy: "",
  partiesInvolved: "",
  witnesses: "",
  incidentDate: "",
  incidentTime: "",
  incidentLocation: "",
  risk: "",
  actionTaken: "",
  actionPlan: "",
};

export interface icIrData {
  fileDetailsId: number;
  incidentReportId: number;
  dateOfReport: string;
  reportedBy: string;
  partiesInvolved: string;
  witnesses: string;
  incidentDate: string;
  incidentTime: string;
  incidentLocation: string;
  risk: string;
  actionTaken: string;
  actionPlan: string;
}

export interface icIrState {
  data: icIrData;
  status: "failed" | "none" | "loading" | "success";
}

export const doGetIcIR = createAsyncThunk<icIrData, number>(
  "initialContactIncidentReport/doGetIcIR",
  async (initialContactID, { getState }) => {
    const store: any = getState();
    const res: AxiosResponse = await doGetIcIrAPI(
      initialContactID,
      store.login.jwtToken
    );
    // Becomes the `fulfilled` action payload:
    return res.data;
  }
);

export const doPostIcIR = createAsyncThunk<icIrData, icIrData>(
  "initialContactIncidentReport/doPostIcIR",
  async (icIrFormData: icIrData, { getState }) => {
    const store: any = getState();
    const res: AxiosResponse = await doPostIcIrAPI(
      icIrFormData,
      store.login.jwtToken
    );
    // Becomes the `fulfilled` action payload:
    return res.data;
  }
);

export const icIncidentReportSlice = createSlice<
  icIrState,
  SliceCaseReducers<icIrState>
>({
  name: "icIncidentReport",
  initialState: { data: emptyData, status: "failed" },
  reducers: {
    cleanIcIrState(state) {
      state = { data: emptyData, status: "none" };
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(doGetIcIR.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "success";
      })
      .addCase(doGetIcIR.pending, (state) => {
        state.status = "loading";
      })
      .addCase(doGetIcIR.rejected, (state) => {
        state.status = "failed";
      });
    builder
      .addCase(doPostIcIR.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "success";
      })
      .addCase(doPostIcIR.pending, (state) => {
        state.status = "loading";
      })
      .addCase(doPostIcIR.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { cleanIcIrState } = icIncidentReportSlice.actions;

export default icIncidentReportSlice.reducer;
