import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { AxiosResponse } from "axios";
import { doGetSearchAPI } from "./searchAPI";

export interface SearchGetData {
  readUser: any;
}

export interface SearchGetState {
  jwtToken: string;
  status: "failed" | "loading" | "success";
}

export const doGetSearch = createAsyncThunk(
  "search/doGetSearch",
  async (data: SearchGetData, { dispatch, getState }) => {
    console.log("search data===", data);
    const res: AxiosResponse = await doGetSearchAPI(
      data,
      (getState() as any).login.jwtToken
    );
    // Becomes the `fulfilled` action payload:
    return res.data;
  }
);

export const searchSlice = createSlice({
  name: "search",
  initialState: {
    participantId: 0,
    readUser: {},

    jwtToken: "",
    status: "failed",
  },
  reducers: {
    cleanSearchState(state: any) {
      state.readUser = {};
      state.jwtToken = "";
      state.status = "failed";
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(doGetSearch.fulfilled, (state, action) => {
        try {
          //const decodedPayload: any = jwt(action.payload.jwtToken);
          state.readUser = action.payload;
        } catch (err) {
          console.log(err);
        }

        state.status = "success";
      })
      .addCase(doGetSearch.pending, (state) => {
        state.status = "loading";
      })
      .addCase(doGetSearch.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { cleanSearchState } = searchSlice.actions;

export default searchSlice.reducer;
