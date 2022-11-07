import { doGetAPI, doPostAPI, doRemoveAPI, doSearchAPI } from "./api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { SliceCaseReducers } from "@reduxjs/toolkit";
import type { AxiosResponse } from "axios";
import { stat } from "fs";

export interface Data {
 
    participantAppointmentId:number;
    participantId:number;
    referenceId:number;
    appointmentdto:{
      appointmentId: number; 
      subject: string;
      status: string;
      date: string;
      time: string;
      location: string;
      duration: string;
      client: any;
      caseworker: string;
      recurringAppointment: string;
      frequency: string;
      endDate: string;
      notes: string;
    }
    
}
//get api data
export interface GetData{
  participantAppointmentId:number;
  participantId:number;
  referenceId:number;
  appointmentdto:{
    appointmentId: number; 
    subject: string;
    status: string;
    date: string;
    time: string;
    location: string;
    duration: string;
    client: any;
    caseworker: string;
    recurringAppointment: string;
    frequency: string;
    endDate: string;
    notes: string;
  }

}
//Empty get Data
const emptyGetData: GetData={
  participantAppointmentId:0,
  participantId:0,
  referenceId:0,
  appointmentdto:{
    appointmentId: 0, 
    subject: "",
    status: "",
    date: "",
    time: "",
    location: "",
    duration: "",
    client: "",
    caseworker: "",
    recurringAppointment: "",
    frequency: "",
    endDate: "",
    notes: "",
  }

}
// Empty Data
const emptyData: Data = {
    
    participantAppointmentId:0,
   
    participantId: 0,
    referenceId:0,
    appointmentdto:{
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
  click: boolean;
  clientName: string;
  id: number;
  record: Data[];
  record1:Data[];
  data: Data;
  getData: GetData;
  status: "failed" | "none" | "loading" | "success";
}

export const doGet = createAsyncThunk<Data, number>(
  "participantservice/doGet",
  async (participantAppointmentId, { getState }) => {
    const store: any = getState();
    const res: AxiosResponse = await doGetAPI(participantAppointmentId, store.login.token);
    // Becomes the `fulfilled` action payload:
    return res.data;
  }
);

export const doPost = createAsyncThunk<Data[], Data>(
  "participantservice/doPost",
  async (formData: Data, { getState }) => {
    const store: any = getState();
    const res: AxiosResponse = await doPostAPI(formData, store.login.token);
    // Becomes the `fulfilled` action payload:
    return res.data;
  }
);

export const doRemove = createAsyncThunk<Data, number>(
  "participantservice/doRemove",
  async (formData, { getState }) => {
    const store: any = getState();
    const res: AxiosResponse = await doRemoveAPI(formData, store.login.token);
    // Becomes the `fulfilled` action payload:
    return res.data;
  }
);

export const doSearch = createAsyncThunk<Data[], any>(
  "participantservice/doSearch",
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

export const appointmentsSlice = createSlice<State, SliceCaseReducers<State>>({
  name: "appointments",
  initialState: {
    disabledClosingDate: true,
    disabledFrequency:true,
    clientName: "",
    id: 0,
    click: false,
    record: [],
    record1:[],
    data: emptyData,
    getData: emptyGetData,
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
      state.record1=[];
      state.status = "none";
      state.click = false;
      state.clientName = "";
      state.getData = emptyGetData;
      state.id = 0;
    },
    setClick(state, action) {
      state.click = action.payload;
    },
    setCyfmsAppointmentClientName(state, action) {
      state.clientName = action.payload;
      state.getData.appointmentdto.client = action.payload;
    },
    setCyfmsAppointmentParticipantId(state, action) {
      state.id = action.payload;
      state.getData.participantId = action.payload;
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
        state.record1 = action.payload;
    
        // state.getData.participantAppointmentId=action.payload.participantAppointmentId;
        state.getData.participantAppointmentId=action.payload[0].participantAppointmentId;
        state.getData.participantId=action.payload[0].participantId;
        state.getData.referenceId=action.payload[0].referenceId;
        state.getData.appointmentdto.appointmentId=action.payload[0].appointmentdto.appointmentId;
        state.getData.appointmentdto.subject=action.payload[0].appointmentdto.subject;
        state.getData.appointmentdto.status=action.payload[0].appointmentdto.status;
        state.getData.appointmentdto.caseworker=action.payload[0].appointmentdto.caseworker;
        state.getData.appointmentdto.client=action.payload[0].appointmentdto.client;
        state.getData.appointmentdto.date=action.payload[0].appointmentdto.date;
        state.getData.appointmentdto.notes=action.payload[0].appointmentdto.notes;
        state.getData.appointmentdto.duration=action.payload[0].appointmentdto.duration;
        state.getData.appointmentdto.endDate=action.payload[0].appointmentdto.endDate;
        state.getData.appointmentdto.frequency=action.payload[0].appointmentdto.frequency;
        state.getData.appointmentdto.location=action.payload[0].appointmentdto.location;
        state.getData.appointmentdto.recurringAppointment=action.payload[0].appointmentdto.recurringAppointment;
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
  enableFrequency,setClick,setCyfmsAppointmentClientName,setCyfmsAppointmentParticipantId } 
  = appointmentsSlice.actions;
export const { spliceRecord} = appointmentsSlice.actions;
export default appointmentsSlice.reducer
