import { doGetAPI, doPostAPI, doRemoveAPI, doSearchAPI } from "./api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { SliceCaseReducers } from "@reduxjs/toolkit";
import type { AxiosResponse } from "axios";

export interface GetData1 {
  cgappointmentId: number;
  id: number;
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
const emptyGetData1: GetData1 = {
  cgappointmentId: 0,
  id: 0,
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
};
export interface Data {
  cgappointmentId: number;
  id: number;
  appointmentDto: {
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
  };
}
//get api data
export interface GetData {
  cgappointmentId: number;
  id: number;
  participantId: number;
  appointmentdto: {
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
  };
}

// Empty Data
const emptyData: Data = {
  cgappointmentId: 0,
  id: 0,
  appointmentDto: {
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
  },
};
//Empty get Data
const emptyGetData: GetData = {
  cgappointmentId: 0,
  id: 0,
  participantId: 0,
  appointmentdto: {
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
  },
};

export interface State {
  disabledClosingDate: boolean;
  disabledFrequency: boolean;
  record: Data[];
  data: Data;
  record1: Data[];
  record2: GetData1[];
  click: boolean;
  clientName: string;
  id: number;
  getData: GetData;
  getData1: GetData1;
  status: "failed" | "none" | "loading" | "success";
}

export const doGet = createAsyncThunk<Data, number>(
  "caregiverservice/doGet",
  async (CGAppointmentId, { getState }) => {
    const store: any = getState();
    const res: AxiosResponse = await doGetAPI(
      CGAppointmentId,
      store.login.token
    );
    // Becomes the `fulfilled` action payload:
    return res.data;
  }
);

export const doPost = createAsyncThunk<Data[], Data>(
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

export const doSearch = createAsyncThunk<GetData1[], any>(
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

export const CGappointmentsSlice = createSlice<State, SliceCaseReducers<State>>(
  {
    name: "Cgappointments",
    initialState: {
      disabledClosingDate: true,
      disabledFrequency: true,
      record: [],
      record1: [],
      record2: [],
      clientName: "",
      id: 0,
      click: false,
      data: emptyData,
      getData: emptyGetData,
      getData1: emptyGetData1,
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
        state.record1 = [];
        state.record2 = [];
        state.status = "none";
        state.click = false;
        state.clientName = "";
        state.getData = emptyGetData;
        state.getData1 = emptyGetData1;
        state.id = 0;
      },
      setClick(state, action) {
        state.click = action.payload;
      },
      setCGAppointmentClientName(state, action) {
        state.clientName = action.payload;
        state.getData.appointmentdto.client = action.payload;
      },
      setCGAppointmentParticipantId(state, action) {
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
          // state.data = action.payload;
          state.record1 = action.payload;
          state.getData.cgappointmentId = action.payload[0].cgappointmentId;
          state.getData.id = action.payload[0].id;
          state.getData.appointmentdto.appointmentId =
            action.payload[0].appointmentDto.appointmentId;
          state.getData.appointmentdto.subject =
            action.payload[0].appointmentDto.subject;
          state.getData.appointmentdto.status =
            action.payload[0].appointmentDto.status;
          state.getData.appointmentdto.caseworker =
            action.payload[0].appointmentDto.caseworker;
          state.getData.appointmentdto.client =
            action.payload[0].appointmentDto.client;
          state.getData.appointmentdto.date =
            action.payload[0].appointmentDto.date;
          state.getData.appointmentdto.notes =
            action.payload[0].appointmentDto.notes;
          state.getData.appointmentdto.duration =
            action.payload[0].appointmentDto.duration;
          state.getData.appointmentdto.endDate =
            action.payload[0].appointmentDto.endDate;
          state.getData.appointmentdto.frequency =
            action.payload[0].appointmentDto.frequency;
          state.getData.appointmentdto.location =
            action.payload[0].appointmentDto.location;
          state.getData.appointmentdto.recurringAppointment =
            action.payload[0].appointmentDto.recurringAppointment;
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
          state.record2 = action.payload;
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
  }
);

export const {
  cleanState,
  disableClosingDate,
  enableClosingDate,
  disabledFrequency,
  enableFrequency,
  setClick,
  setCGAppointmentClientName,
  setCGAppointmentParticipantId,
} = CGappointmentsSlice.actions;
export const { spliceRecord } = CGappointmentsSlice.actions;
export default CGappointmentsSlice.reducer;
