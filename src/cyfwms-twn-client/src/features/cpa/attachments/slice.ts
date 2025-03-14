import { doDeleteAPI, doGetAPI, doGetOneAPI, doPostAPI } from "./api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../../library/store";
import type { SliceCaseReducers } from "@reduxjs/toolkit";
import type { AxiosResponse } from "axios";

export interface Record {
  culturalProgramId: number;
  culturalProgImageId: number;
  culturalimagename: string;
  name: string;
  type: string;
}

// Empty Record
const emptyRecord: Record = {
  culturalProgramId: 0,
  culturalProgImageId: 0,
  culturalimagename: "",
  name: "",
  type: "",
};

export interface State {
  data: Record[];
  status: "failed" | "none" | "loading" | "success";
}

export const doGet = createAsyncThunk<Record[], number>(
  "attachments/doGet",
  async (cpaID, { getState }) => {
    const store = getState() as RootState;
    const res: AxiosResponse = await doGetAPI(cpaID, store.login.token);
    // Becomes the `fulfilled` action payload:
    return res.data;
  }
);

export const doGetOne = createAsyncThunk<Record, number>(
  "attachments/doGetOne",
  async (cpaFileID, { getState }) => {
    const store = getState() as RootState;
    const res: AxiosResponse = await doGetOneAPI(cpaFileID, store.login.token);
    // Becomes the `fulfilled` action payload:
    return res.data;
  }
);

export const doPost = createAsyncThunk<Record[], FormData>(
  "attachments/doPost",
  async (attachment, { getState }) => {
    const store = getState() as RootState;
    const res: AxiosResponse = await doPostAPI(attachment, store.login.token);
    // Becomes the `fulfilled` action payload:
    return res.data;
  }
);

export const doDelete = createAsyncThunk<any, number>(
  "attachments/doDelete",
  async (cpaFileId, { getState }) => {
    const store = getState() as RootState;
    const res: AxiosResponse = await doDeleteAPI(cpaFileId, store.login.token);
    // Becomes the `fulfilled` action payload:
    return res.data;
  }
);

export const attachmentsSlice = createSlice<State, SliceCaseReducers<State>>({
  name: "attachments",
  initialState: {
    data: [],
    status: "none",
  },
  reducers: {
    add(state, action) {
      state.data.push(emptyRecord);
    },
    clean(state) {
      state.data = [];
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
      .addCase(doGetOne.fulfilled, (state, action) => {
        state.status = "success";
      })
      .addCase(doGetOne.pending, (state) => {
        state.status = "loading";
      })
      .addCase(doGetOne.rejected, (state) => {
        state.status = "failed";
      });
    builder
      .addCase(doPost.fulfilled, (state, action) => {
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

export const { add, clean } = attachmentsSlice.actions;

export default attachmentsSlice.reducer;
