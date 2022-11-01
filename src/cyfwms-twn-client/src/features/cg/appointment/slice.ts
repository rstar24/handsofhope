import { doGetAPI, doPostAPI, doRemoveAPI, doSearchAPI } from "./api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { SliceCaseReducers } from "@reduxjs/toolkit";
import type { AxiosResponse } from "axios";

export interface Data {
 
  cgappointmentId:number;
  id:number;
    appointmentDto:{
      appointmentId: number; 
      subject: string;
      status: string;
      date: string;
      time: string;
      location: string;
      duration: string;
      client: string;
      caseworker: string;
      recurringAppointment: string;
      frequency: string;
      endDate: string;
      notes: string;
    }
    
}

// Empty Data
const emptyData: Data = {
    
  cgappointmentId:0,
   id: 0,
    appointmentDto:{
    appointmentId: 0,
    subject: "",
    status: "",
    date: "",
    time: "",
    location: "",
    duration: "",
    client: "",
    caseworker: "",
    recurringAppointment:"",
    frequency: "",
    endDate: "",
    notes: "",
    }
};

export interface State {
  disabledClosingDate: boolean;
  disabledFrequency:boolean;
  record: Data[];
  data: Data;
  status: "failed" | "none" | "loading" | "success";
}

export const doGet = createAsyncThunk<Data, number>(
  "caregiverservice/doGet",
  async (participantAppointmentId, { getState }) => {
    const store: any = getState();
    const res: AxiosResponse = await doGetAPI(participantAppointmentId, store.login.token);
    // Becomes the `fulfilled` action payload:
    return res.data;
  }
);

export const doPost = createAsyncThunk<Data, Data>(
  "caregiverservice/doPost",
  async (formData: Data, { getState }) => {
    const store: any = getState();
    const res: AxiosResponse = await doPostAPI(formData, store.login.token);
    // Becomes the `fulfilled` action payload:
    return res.data;
  }
);

export const doRemove = createAsyncThunk<Data, number>(
  "caregiverservice/doRemove",
  async (formData, { getState }) => {
    const store: any = getState();
    const res: AxiosResponse = await doRemoveAPI(formData, store.login.token);
    // Becomes the `fulfilled` action payload:
    return res.data;
  }
);

export const doSearch = createAsyncThunk<Data[], any>(
  "caregiverservice/doSearch",
  async (formData, { getState }) => {
    const store: any = getState();
    const res: AxiosResponse = await doSearchAPI(
      formData.id,
      formData.data || null,
      store.login.token
    );

    // Becomes the `fulfilled` action payload:
    return res.data;
  }
);

export const CGappointmentsSlice = createSlice<State, SliceCaseReducers<State>>({
  name: "Cgappointments",
  initialState: {
    disabledClosingDate: true,
    disabledFrequency:true,
    record: [],
    data: emptyData,
    status: "failed",
  },
  reducers: {
      /** Removes one record from data matching the given reference ID. */
      // spliceRecord(state, action) {
      //   // Find index of the matching record in data.
      //   const index = state.data.findIndex(
      //     (element: Record) => element.referenceId === action.payload
      //   );
      //   // Remove it.
      //   state.data.splice(index, 1);
      // },
    disableClosingDate(state) {
      state.disabledClosingDate = true;
    },
    enableClosingDate(state) {
      state.disabledClosingDate = false;
    },
    disableFrequency(state) {
      state.disabledFrequency = true;
    },
    enableFrequency(state) {
      state.disabledFrequency = false;
    },
    cleanState(state) {
      state.disabledClosingDate = true;
      state.disabledFrequency = true;
      state.data = emptyData;
      state.record = [];
      state.status = "none";
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(doGet.fulfilled, (state, action) => {
        // state.participantAppointmentId = action.payload.
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
    builder
      .addCase(doSearch.fulfilled, (state, action) => {
        state.record = action.payload;
        state.status = "success";
      })
      .addCase(doSearch.pending, (state) => {
        state.status = "loading";
      })
      .addCase(doSearch.rejected, (state) => {
        state.status = "failed";
      });
    builder
      .addCase(doRemove.fulfilled, (state, action) => {
        state.status = "success";
      })
      .addCase(doRemove.pending, (state) => {
        state.status = "loading";
      })
      .addCase(doRemove.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { cleanState,
  disableClosingDate,
  enableClosingDate,
  disabledFrequency,
  enableFrequency, } 
  = CGappointmentsSlice.actions;
export const { spliceRecord} = CGappointmentsSlice.actions;
export default CGappointmentsSlice.reducer
