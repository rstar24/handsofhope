import { doGetAPI, doPostAPI, doRemoveAPI, doSearchAPI } from "./api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { SliceCaseReducers } from "@reduxjs/toolkit";
import type { AxiosResponse } from "axios";

export interface Data {
 
    icappointmentId:number;
    fileDetailsId:number;
    fileDetailsNo:number;
    appointmentDto:{
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
  icappointmentId:number;
  fileDetailsId:number;
  fileDetailsNo:number;
  participantId:number;
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
  icappointmentId:0,
  fileDetailsId:0,
  fileDetailsNo:0,
  participantId:0,
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
    
  icappointmentId:0,
  fileDetailsId: 0,
  fileDetailsNo:0,
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
  record1:Data[];
  click: boolean;
  clientName: string;
  id: number;
  data: Data;
  getData: GetData;
  status: "failed" | "none" | "loading" | "success";
}

export const doGet = createAsyncThunk<Data, number>(
  "initialcontactservice/doGet",
  async (ICAppointmentId, { getState }) => {
    const store: any = getState();
    const res: AxiosResponse = await doGetAPI(ICAppointmentId, store.login.token);
    // Becomes the `fulfilled` action payload:
    return res.data;
  }
);

export const doPost = createAsyncThunk<Data[], Data>(
  "initialcontactservice/doPost",
  async (formData: Data, { getState }) => {
    const store: any = getState();
    console.log("slice data--", formData)
    const res: AxiosResponse = await doPostAPI(formData, store.login.token);
    // Becomes the `fulfilled` action payload:
    return res.data;
  }
);

export const doRemove = createAsyncThunk<Data, number>(
  "initialcontactservice/doRemove",
  async (formData, { getState }) => {
    const store: any = getState();
    const res: AxiosResponse = await doRemoveAPI(formData, store.login.token);
    // Becomes the `fulfilled` action payload:
    return res.data;
  }
);

export const doSearch = createAsyncThunk<Data[], any>(
  "initialcontactservice/doSearch",
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

export const ICappointmentsSlice = createSlice<State, SliceCaseReducers<State>>({
  name: "ICappointments",
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
    setICAppointmentClientName(state, action) {
      state.clientName = action.payload;
      state.getData.appointmentdto.client = action.payload;
    },
    setICAppointmentParticipantId(state, action) {
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
        //  state.data = action.payload;
        state.record1 = action.payload;
        state.getData.icappointmentId=action.payload[0].icappointmentId;
        state.getData.fileDetailsId=action.payload[0].fileDetailsId;
        state.getData.fileDetailsNo=action.payload[0].fileDetailsNo;
        state.getData.appointmentdto.appointmentId=action.payload[0].appointmentDto.appointmentId;
        state.getData.appointmentdto.subject=action.payload[0].appointmentDto.subject;
        state.getData.appointmentdto.status=action.payload[0].appointmentDto.status;
        state.getData.appointmentdto.caseworker=action.payload[0].appointmentDto.caseworker;
        state.getData.appointmentdto.client=action.payload[0].appointmentDto.client;
        state.getData.appointmentdto.date=action.payload[0].appointmentDto.date;
        state.getData.appointmentdto.notes=action.payload[0].appointmentDto.notes;
        state.getData.appointmentdto.duration=action.payload[0].appointmentDto.duration;
        state.getData.appointmentdto.endDate=action.payload[0].appointmentDto.endDate;
        state.getData.appointmentdto.frequency=action.payload[0].appointmentDto.frequency;
        state.getData.appointmentdto.location=action.payload[0].appointmentDto.location;
        state.getData.appointmentdto.recurringAppointment=action.payload[0].appointmentDto.recurringAppointment;
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
  disableFrequency,
  enableFrequency,setClick,setICAppointmentClientName,setICAppointmentParticipantId } 
  = ICappointmentsSlice.actions;

export default ICappointmentsSlice.reducer
