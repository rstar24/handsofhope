import { doGetAPI, doPostAPI, doRemoveAPI, doSearchAPI } from "./api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { SliceCaseReducers } from "@reduxjs/toolkit";
import type { AxiosResponse } from "axios";

export interface Recordnew {
  fileDetailsId: number;
  icReminderId: number;
  subject: string;
  assignedTo: string;
}
// Empty Recordnew
const emptyRecordnew: Recordnew =  {
  fileDetailsId: 0,
  icReminderId: 0,
  subject: "",
  assignedTo: "",
};

export interface Data {
  icReminderId:number,
  fileDetailsId:number,
  fileNumber:number,
  reminderDto:{
    reminderId: number;
    assignedTo: string;
    regarding: any;
    subject: string;
    status: string;
    reminderDate: string;
    endDate: string;
    description: string;
    frequency: string;
  }
  
}
// get api data 
export interface GetData {
  participantAppointmentId?:number;
  icReminderId:number,
  fileDetailsId:number,
  fileNumber:number,
  reminderDto:{
    reminderId: number;
    assignedTo: string;
    regarding: any;
    subject: string;
    status: string;
    reminderDate: string;
    endDate: string;
    description: string;
    frequency: string;
  }
}
// Empty  GetData
const emptyGetData: GetData = {
  participantAppointmentId:0,
  icReminderId:0,
  fileDetailsId:0,
  fileNumber:0,
  reminderDto:{
    reminderId: 0,
    assignedTo: "",
    regarding: "",
    subject: "",
    status: "",
    reminderDate: "",
    endDate: "",
    description: "",
    frequency: "",
  }
}
// Empty Data
const emptyData: Data = {
  icReminderId:0,
  fileDetailsId:0,
  fileNumber:0,
  reminderDto:{
    reminderId: 0,
    assignedTo: "",
    regarding: "",
    subject: "",
    status: "",
    reminderDate: "",
    endDate: "",
    description: "",
    frequency: "",
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
  record2: Recordnew[];
  data: Data;
  getData: GetData;
  recordNew:Recordnew;
  status: "failed" | "none" | "loading" | "success";
}

export const doGet = createAsyncThunk<Data, number>(
  "initialcontactservicenReminder/doGet",
  async (filedetailsid, { getState }) => {
    const store: any = getState();
    const res: AxiosResponse = await doGetAPI(filedetailsid, store.login.token);
    // Becomes the `fulfilled` action payload:
    return res.data;
  }
);

export const doPost = createAsyncThunk<Data[], Data>(
  "initialcontactserviceReminder/doPost",
  async (formData: Data, { getState }) => {
    const store: any = getState();
    const res: AxiosResponse = await doPostAPI(formData, store.login.token);
    // Becomes the `fulfilled` action payload:
    return res.data;
  }
);

export const doRemove = createAsyncThunk<Data, number>(
  "initialcontactserviceReminder/doRemove",
  async (formData, { getState }) => {
    const store: any = getState();
    const res: AxiosResponse = await doRemoveAPI(formData, store.login.token);
    // Becomes the `fulfilled` action payload:
    return res.data;
  }
);

export const doSearch = createAsyncThunk<Recordnew[], any>(
  "initialcontactserviceReminder/doSearch",
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

export const contactNotesSlice = createSlice<State, SliceCaseReducers<State>>({
  name: "initialcontactreminder",
  initialState: {
    disabledClosingDate: true,
    disabledFrequency:true,
    clientName: "",
    id: 0,
    click: false,
    record: [],
    record1:[],
    record2:[],
    data: emptyData,
    getData: emptyGetData,
    recordNew:emptyRecordnew,
    status: "failed",
  },
  reducers: {
    add(state, action) {
      state.record2.push(emptyRecordnew);
    },
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
      state.record2=[];
      state.status = "none";
      state.click = false;
      state.clientName = "";
      state.getData = emptyGetData;
      state.id = 0;
    },
    setClick(state, action) {
      state.click = action.payload;
    },

    setInitialContactReminderClientName(state, action) {
      state.clientName = action.payload;
      state.getData.reminderDto.regarding = action.payload;
    },
    setInitialContactReminderId(state, action) {
      state.id = action.payload;
      state.getData.icReminderId = action.payload;
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
        //state.data = action.payload;
        state.getData.icReminderId=action.payload[0].icReminderId;
        state.getData.fileDetailsId=action.payload[0].fileDetailsId;
        state.getData.reminderDto.reminderId=action.payload[0].reminderDto.reminderId;
        state.getData.reminderDto.assignedTo=action.payload[0].reminderDto.assignedTo;
        state.getData.reminderDto.subject=action.payload[0].reminderDto.subject;
        state.getData.reminderDto.status=action.payload[0].reminderDto.status;
        state.getData.reminderDto.regarding=action.payload[0].reminderDto.regarding;
        state.getData.reminderDto.reminderDate=action.payload[0].reminderDto.reminderDate;
        state.getData.reminderDto.endDate=action.payload[0].reminderDto.endDate;
        state.getData.reminderDto.frequency=action.payload[0].reminderDto.frequency;
        state.getData.reminderDto.description=action.payload[0].reminderDto.description;
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
});

export const { cleanState,
  disableClosingDate,
  enableClosingDate,
  disabledFrequency,
  enableFrequency,setClick,setInitialContactReminderClientName,setInitialContactReminderId } 
  =  contactNotesSlice.actions;
export const { spliceRecord} =  contactNotesSlice.actions;
export default contactNotesSlice.reducer;
