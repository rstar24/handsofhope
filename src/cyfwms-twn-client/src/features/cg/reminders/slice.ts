import { doGetAPI, doPostAPI, doRemoveAPI, doSearchAPI } from "./api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { SliceCaseReducers } from "@reduxjs/toolkit";
import type { AxiosResponse } from "axios";

export interface Data {
  cgReminderId: number;
  id: number;
  referenceId: any;
  reminderDto: {
    reminderId: number;
    assignedTo: string;
    regarding: string;
    subject: string;
    status: string;
    reminderDate: string;
    endDate: string;
    description: string;
    frequency: string;
  };
}

// Empty Data
const emptyData: Data = {
  cgReminderId: 0,
  id: 0,
  referenceId: 0,
  reminderDto: {
    reminderId: 0,
    assignedTo: "",
    regarding: "",
    subject: "",
    status: "",
    reminderDate: "",
    endDate: "",
    description: "",
    frequency: "",
  },
};

export interface State {
  record: Data[];
  data: Data;
  status: "failed" | "none" | "loading" | "success";
}

export const doGet = createAsyncThunk<Data, number>(
  "caregiverservice/doGet",
  async (cgReminderId, { getState }) => {
    const store: any = getState();
    const res: AxiosResponse = await doGetAPI(cgReminderId, store.login.token);
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

export const cgReminderSlice = createSlice<State, SliceCaseReducers<State>>({
  name: "cgReminder",
  initialState: {
    record: [],
    data: emptyData,
    status: "failed",
  },
  reducers: {
    cleanState(state) {
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

export const { cleanState } = cgReminderSlice.actions;

export default cgReminderSlice.reducer;
