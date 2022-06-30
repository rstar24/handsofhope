import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { doGetRegisterAPI, doPostRegisterAPI } from "./registerAPI";
import type { AxiosResponse } from "axios";

export interface RegisterGetData {
  readUser: {
    participantId: Number;
    firstname: "";
    middleName: "";
    surname: "";
    dateOfBirth: "";
    gender: "";
    maritalStatus: "";
  };
}
export interface RegisterPostData {
  user: {
    firstname: "";
    middleName: "";
    surname: "";
    dateOfBirth: "";
    gender: "";
    maritalStatus: "";
  };
}

export interface RegisterGetState {
  jwtToken: string;
  status: "failed" | "loading" | "success";
}
export interface RegisterPostState {
  jwtToken: string;
  status: "failed" | "loading" | "success";
}

export const doGetRegister = createAsyncThunk(
  "register/doGetRegister",
  async (data: RegisterGetData, { dispatch, getState }) => {
    const res: AxiosResponse = await doGetRegisterAPI(
      data,
      (getState() as any).login.jwtToken
    );
    // Becomes the `fulfilled` action payload:
    return res.data;
  }
);

export const doPostRegister = createAsyncThunk(
  "register/doPostRegister",
  async (data: RegisterPostData, { dispatch, getState }) => {
    const res: AxiosResponse = await doPostRegisterAPI(
      data,
      (getState() as any).login.jwtToken
    );
    // Becomes the `fulfilled` action payload:
    return res.data;
  }
);

export const registerSlice = createSlice({
  name: "register",
  initialState: {
    readUser: {
      participantId: 0,
      firstname: "",
      middleName: "",
      surname: "",
      dateOfBirth: "",
      gender: "",
      maritalStatus: "",
    },
    user: {
      participantId: 0,
      firstname: "",
      middleName: "",
      surname: "",
      dateOfBirth: "",
      gender: "",
      maritalStatus: "",
    },
    jwtToken: "",
    status: "failed",
  },
  reducers: {},
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(doGetRegister.fulfilled, (state, action) => {
        try {
          //const decodedPayload: any = jwt(action.payload.jwtToken);
          state.readUser = action.payload;
        } catch (err) {
          console.log(err);
        }

        state.status = "success";
      })
      .addCase(doGetRegister.pending, (state) => {
        state.status = "loading";
      })
      .addCase(doGetRegister.rejected, (state) => {
        state.status = "failed";
      });
    builder
      .addCase(doPostRegister.fulfilled, (state, action) => {
        try {
          //const decodedPayload: any = jwt(action.payload.jwtToken);
          state.user = action.payload;
        } catch (err) {
          console.log(err);
        }

        state.status = "success";
      })
      .addCase(doPostRegister.pending, (state) => {
        state.status = "loading";
      })
      .addCase(doPostRegister.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const {} = registerSlice.actions;

export default registerSlice.reducer;
