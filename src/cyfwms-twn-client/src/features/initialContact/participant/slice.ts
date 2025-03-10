import { doGetAPI, doPostAPI, doRemoveAPI, doSearchAPI } from "./api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { SliceCaseReducers } from "@reduxjs/toolkit";
import type { AxiosResponse } from "axios";

export interface Data {
  icParticipantId: number;
  fileDetailsId: number;
  participant: any;
  role: string;
  notes: string;
}

//get api data
export interface GetData {
  icParticipantId: number;
  fileDetailsId: number;
  participant: any;
  role: string;
  notes: string;
  participantId: number;
}

// Empty get Data
const emptyGetData: GetData = {
  icParticipantId: 0,
  fileDetailsId: 0,
  participant: null,
  role: "",
  notes: "",
  participantId: 0,
};

// Empty Data
const emptyData: Data = {
  icParticipantId: 0,
  fileDetailsId: 0,
  participant: null,
  role: "",
  notes: "",
};

export interface State {
  click: boolean;
  clientName: string;
  id: number;
  record: Data[];
  data: Data;
  getData: GetData;
  status: "failed" | "none" | "loading" | "success";
}

export const doGet = createAsyncThunk<GetData, number>(
  "icParticipant/doGet",
  async (icParticiapntId, { getState }) => {
    const store: any = getState();
    const res: AxiosResponse = await doGetAPI(
      icParticiapntId,
      store.login.token
    );
    // Becomes the `fulfilled` action payload:
    return res.data;
  }
);

export const doPost = createAsyncThunk<Data, Data>(
  "icParticipant/doPost",
  async (formData: Data, { getState }) => {
    const store: any = getState();
    const res: AxiosResponse = await doPostAPI(formData, store.login.token);
    // Becomes the `fulfilled` action payload:
    return res.data;
  }
);

export const doRemove = createAsyncThunk<Data, number>(
  "icParticipant/doRemove",
  async (formData, { getState }) => {
    const store: any = getState();
    const res: AxiosResponse = await doRemoveAPI(formData, store.login.token);
    // Becomes the `fulfilled` action payload:
    return res.data;
  }
);

export const doSearch = createAsyncThunk<Data[], any>(
  "ic/doSearch",
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

export const icParticipantSlice = createSlice<State, SliceCaseReducers<State>>({
  name: "icParticipant",
  initialState: {
    clientName: "",
    id: 0,
    record: [],
    click: false,
    data: emptyData,
    getData: emptyGetData,
    status: "failed",
  },
  reducers: {
    cleanState(state) {
      state.click = false;
      state.clientName = "";
      state.getData = emptyGetData;
      state.id = 0;
      state.record = [];
      state.data = emptyData;
      state.status = "none";
    },
    setClick(state, action) {
      state.click = action.payload;
    },
    setParticipantClientName(state, action) {
      state.clientName = action.payload;
      state.getData.participant = action.payload;
    },
    setParticipantId(state, action) {
      state.id = action.payload;
      state.getData.participantId = action.payload;
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(doGet.fulfilled, (state, action) => {
        state.getData = action.payload;
        state.id = action.payload.participantId;
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
        state.getData.fileDetailsId = action.payload.fileDetailsId;
        state.getData.icParticipantId = action.payload.icParticipantId;
        state.getData.notes = action.payload.notes;
        state.getData.role = action.payload.role;

        state.status = "success";
      })
      .addCase(doPost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(doPost.rejected, (state) => {
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
  },
});

export const {
  cleanState,
  setClick,
  setParticipantClientName,
  setParticipantId,
} = icParticipantSlice.actions;

export default icParticipantSlice.reducer;
