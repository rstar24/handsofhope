import { doDeleteAPI, doGetAPI, doPostAPI } from "./api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../../library/store";
import type { SliceCaseReducers } from "@reduxjs/toolkit";
import type { AxiosResponse } from "axios";

export interface Record {
  participantId: number;
  householdMemberId: number;
  name: string;
  gender: string;
  dateOfBirth: string;
  relationship: string;
  residing: string;
}

//Empty Record
const emptyRecord: Record = {
  participantId: 0,
  householdMemberId: 0,
  name: "",
  gender: "",
  dateOfBirth: "",
  relationship: "",
  residing: "",
};

export interface Data {
  recordsList: Record[];
}

// Empty Data
const emptyData: Data = {
  recordsList: [emptyRecord],
};

export interface State {
  data: Data;
  status: "failed" | "none" | "loading" | "success";
}

export const doGet = createAsyncThunk<Record[], number>(
  "householdMembers/doGet",
  async (participantID, { getState }) => {
    const store = getState() as RootState;
    const res: AxiosResponse = await doGetAPI(participantID, store.login.token);
    // Becomes the `fulfilled` action payload:
    return res.data;
  }
);

export const doPost = createAsyncThunk<Record[], Data>(
  "householdMembers/doPost",
  async (formData, { getState }) => {
    const store = getState() as RootState;
    const res: AxiosResponse = await doPostAPI(
      formData.recordsList,
      store.login.token
    );
    // Becomes the `fulfilled` action payload:
    return res.data;
  }
);

export const doDelete = createAsyncThunk<any, number>(
  "householdMembers/doDelete",
  async (householdMemberID, { getState }) => {
    const store = getState() as RootState;
    const res: AxiosResponse = await doDeleteAPI(
      householdMemberID,
      store.login.token
    );
    // Becomes the `fulfilled` action payload:
    return res.data;
  }
);

export const householdMembersSlice = createSlice<
  State,
  SliceCaseReducers<State>
>({
  name: "householdMembers",
  initialState: { data: emptyData, status: "none" },
  reducers: {
    addMoreRecord(state, action) {
      const lastIndex = state.data.recordsList.length - 1;
      state.data.recordsList[lastIndex] = action.payload;
      state.data.recordsList.push(emptyRecord);
    },
    removeRecordNumber(state, action) {
      state.data.recordsList.splice(action.payload - 1, 1);
    },
    cleanState(state) {
      state.data = emptyData;
      state.status = "failed";
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(doGet.fulfilled, (state, action) => {
        if (action.payload.length === 0) {
          state.data = emptyData;
        } else {
          state.data.recordsList = action.payload;
        }
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
        state.data.recordsList = action.payload;
        state.status = "success";
      })
      .addCase(doPost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(doPost.rejected, (state) => {
        state.status = "failed";
      });
    builder
      .addCase(doDelete.fulfilled, (state, action) => {
        state.status = "success";
      })
      .addCase(doDelete.pending, (state) => {
        state.status = "loading";
      })
      .addCase(doDelete.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { addMoreRecord, removeRecordNumber, cleanState } =
  householdMembersSlice.actions;

export default householdMembersSlice.reducer;
