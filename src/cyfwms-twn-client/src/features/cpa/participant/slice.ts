import { doGetAPI, doPostAPI, doRemoveAPI, doSearchAPI } from "./api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { SliceCaseReducers } from "@reduxjs/toolkit";
import type { AxiosResponse } from "axios";

export interface Data {
  participantCulturalProId: number;
  culturalProgramId: number;
  participantId: number;
  role: string;
  notes: string;
}

// Empty Data
const emptyData: Data = {
  participantCulturalProId: 0,
  culturalProgramId: 0,
  participantId: 0,
  role: "",
  notes: "",
};

export interface State {
  click: boolean;
  clientName: string;
  id: number;
  record: Data[];
  data: Data;
  status: "failed" | "none" | "loading" | "success";
}

export const doGet = createAsyncThunk<Data, number>(
  "cpaParticipant/doGet",
  async (participantculturalprogid, { getState }) => {
    const store: any = getState();
    const res: AxiosResponse = await doGetAPI(
      participantculturalprogid,
      store.login.token
    );
    // Becomes the `fulfilled` action payload:
    return res.data;
  }
);

export const doPost = createAsyncThunk<Data, Data>(
  "cpaParticipant/doPost",
  async (formData: Data, { getState }) => {
    const store: any = getState();
    const res: AxiosResponse = await doPostAPI(formData, store.login.token);
    // Becomes the `fulfilled` action payload:
    return res.data;
  }
);

export const doRemove = createAsyncThunk<Data, number>(
  "cpaParticipant/doRemove",
  async (formData, { getState }) => {
    const store: any = getState();
    const res: AxiosResponse = await doRemoveAPI(formData, store.login.token);
    // Becomes the `fulfilled` action payload:
    return res.data;
  }
);

export const doSearch = createAsyncThunk<Data[], any>(
  "cpa/doSearch",
  async (formData, { getState }) => {
    const store: any = getState();
    const res: AxiosResponse = await doSearchAPI(formData, store.login.token);
    // Becomes the `fulfilled` action payload:
    return res.data;
  }
);

export const cpaParticipantSlice = createSlice<State, SliceCaseReducers<State>>(
  {
    name: "cpaParticipant",
    initialState: {
      clientName: "",
      id: 0,
      record: [],
      click: false,
      data: emptyData,
      status: "failed",
    },
    reducers: {
      cleanState(state) {
        state.click = false;
        state.clientName = "";
        state.id = 0;
        state.record = [];
        state.data = emptyData;
        state.status = "none";
      },
      setClick(state, action) {
        state.click = action.payload;
      },
      setClientName(state, action) {
        console.log(action.payload);
        state.clientName = action.payload;
      },
      setId(state, action) {
        state.id = action.payload;
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
  }
);

export const { cleanState, setClick, setClientName, setId } =
  cpaParticipantSlice.actions;

export default cpaParticipantSlice.reducer;
