import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { RootState } from "../../library/store";
import {
  doGenderGetAPI,
  doGetMaritalStatusAPI,
  doGetReminderStatusAPI,
  doGetProvinceAPI,
  doGetAppointmentStatusAPI,
  doGetRoleAPI,
  doGetEducationAPI,
  doGetTypeOfEmployeeAPI,
  doGetInitialContactStatusAPI,
  doGetInitialContactReferralAPI,
  doGetInitialContactRiskAPI,
  doGetInitialContactTypeOfPatientAPI,
  doGetICMentalHealthOrSubstanceAbuseAPI,
  doGetICPresentConcernsAPI,
  doGetICContactMethodAPI,
  doGetCPACulturalTypeAPI,
  doGetCPACulturalStatusAPI,
  doGetCGStatusAPI,
  doGetCGTypeAPI,
  doGetFrequencyAPI,
  doGetCgBgCheckStatusAPI,
} from "./api";

export interface CodeTableData {
  gender: {};
  appointment: {};
  reminderstatus: {};
  maritalstatus: {};
  province: {};
  role: {};
  education: {};
  typeOfEmployee: {};
  initialContactStatus: {};
  initialContactReferral: {};
  risk: {};
  patient: {};
  mentalHealthOrSubstanceAbuse: {};
  presentConcerns: {};
  contactMethod: {};
  culturalType: {};
  culturalStatus: {};
  cgStatus: {};
  cgType: {};
  frequency: {};
  cgBgCheckStatus: {};
}

export interface CodeTableState {
  jwtToken: string;
  status: "failed" | "loading" | "success";
}

export const doGetGender = createAsyncThunk(
  "codetable/doGetGender",
  async (_, { dispatch, getState }) => {
    const res: AxiosResponse = await doGenderGetAPI(
      (getState() as RootState).login.token
    );
    // Becomes the `fulfilled` action payload:
    return res.data;
  }
);
export const doGetAppointmentStatus = createAsyncThunk(
  "codetable/doGetAppointmentStatus",
  async (_, { dispatch, getState }) => {
    const res: AxiosResponse = await doGetAppointmentStatusAPI(
      (getState() as RootState).login.token
    );
    // Becomes the `fulfilled` action payload:
    return res.data;
  }
);
export const doGetReminderStatus = createAsyncThunk(
  "codetable/doGetReminderStatus",
  async (_, { dispatch, getState }) => {
    const res: AxiosResponse = await doGetReminderStatusAPI(
      (getState() as RootState).login.token
    );
    // Becomes the `fulfilled` action payload:
    return res.data;
  }
);
export const doGetFrequency = createAsyncThunk(
  "codetable/doGetFrequency",
  async (_, { dispatch, getState }) => {
    const res: AxiosResponse = await doGetFrequencyAPI(
      (getState() as RootState).login.token
    );
    // Becomes the `fulfilled` action payload:
    return res.data;
  }
);

export const doGetMaritalStatus = createAsyncThunk(
  "codetable/doGetMaritalStatus",
  async (_, { dispatch, getState }) => {
    const res: AxiosResponse = await doGetMaritalStatusAPI(
      (getState() as RootState).login.token
    );
    // Becomes the `fulfilled` action payload:
    return res.data;
  }
);

export const doGetProvince = createAsyncThunk(
  "codetable/doGetProvince",
  async (_, { dispatch, getState }) => {
    const res: AxiosResponse = await doGetProvinceAPI(
      (getState() as RootState).login.token
    );
    // Becomes the `fulfilled` action payload:
    return res.data;
  }
);

export const doGetRole = createAsyncThunk(
  "codetable/doGetRole",
  async (_, { dispatch, getState }) => {
    const res: AxiosResponse = await doGetRoleAPI(
      (getState() as RootState).login.token
    );
    // Becomes the `fulfilled` action payload:
    return res.data;
  }
);

export const doGetEducation = createAsyncThunk(
  "codetable/doGetEducation",
  async (_, { dispatch, getState }) => {
    const res: AxiosResponse = await doGetEducationAPI(
      (getState() as RootState).login.token
    );
    // Becomes the `fulfilled` action payload:
    return res.data;
  }
);

export const doGetTypeOfEmployee = createAsyncThunk(
  "codetable/doGetTypeOfEmployee",
  async (_, { dispatch, getState }) => {
    const res: AxiosResponse = await doGetTypeOfEmployeeAPI(
      (getState() as RootState).login.token
    );
    // Becomes the `fulfilled` action payload:
    return res.data;
  }
);

export const doGetICStatus = createAsyncThunk(
  "codetable/doGetICStatus",
  async (_, { dispatch, getState }) => {
    const res: AxiosResponse = await doGetInitialContactStatusAPI(
      (getState() as RootState).login.token
    );
    // Becomes the `fulfilled` action payload:
    return res.data;
  }
);

export const doGetICReferral = createAsyncThunk(
  "codetable/doGetICReferral",
  async (_, { dispatch, getState }) => {
    const res: AxiosResponse = await doGetInitialContactReferralAPI(
      (getState() as RootState).login.token
    );
    // Becomes the `fulfilled` action payload:
    return res.data;
  }
);

export const doGetICRisk = createAsyncThunk(
  "codetable/doGetICRisk",
  async (_, { dispatch, getState }) => {
    const res: AxiosResponse = await doGetInitialContactRiskAPI(
      (getState() as RootState).login.token
    );
    // Becomes the `fulfilled` action payload:
    return res.data;
  }
);

export const doGetICTypeOfPatient = createAsyncThunk(
  "codetable/doGetICTypeOfPatient",
  async (_, { dispatch, getState }) => {
    const res: AxiosResponse = await doGetInitialContactTypeOfPatientAPI(
      (getState() as RootState).login.token
    );
    // Becomes the `fulfilled` action payload:
    return res.data;
  }
);
export const doGetICMentalHealthOrSubstanceAbuse = createAsyncThunk(
  "codetable/doGetICMentalHealthOrSubstanceAbuse",
  async (_, { dispatch, getState }) => {
    const res: AxiosResponse = await doGetICMentalHealthOrSubstanceAbuseAPI(
      (getState() as RootState).login.token
    );
    // Becomes the `fulfilled` action payload:
    return res.data;
  }
);

export const doGetICPresentConcerns = createAsyncThunk(
  "codetable/doGetICPresentConcerns",
  async (_, { dispatch, getState }) => {
    const res: AxiosResponse = await doGetICPresentConcernsAPI(
      (getState() as RootState).login.token
    );
    // Becomes the `fulfilled` action payload:
    return res.data;
  }
);

export const doGetICContactMethod = createAsyncThunk(
  "codetable/doGetICContactMethod",
  async (_, { dispatch, getState }) => {
    const res: AxiosResponse = await doGetICContactMethodAPI(
      (getState() as RootState).login.token
    );
    // Becomes the `fulfilled` action payload:
    return res.data;
  }
);
// Cpa cultural program Activity cultural type
export const doGetCPACulturalType = createAsyncThunk(
  "codetable/doGetCPACulturalType",
  async (_, { dispatch, getState }) => {
    const res: AxiosResponse = await doGetCPACulturalTypeAPI(
      (getState() as RootState).login.token
    );
    // Becomes the `fulfilled` action payload:
    return res.data;
  }
);
//Cpa cultiral program Activity cultural status
export const doGetCPACulturalStatus = createAsyncThunk(
  "codetable/doGetCPACulturalStatus",
  async (_, { dispatch, getState }) => {
    const res: AxiosResponse = await doGetCPACulturalStatusAPI(
      (getState() as RootState).login.token
    );
    // Becomes the `fulfilled` action payload:
    console.log("sdasfasfsf", res);
    return res.data;
  }
);

//CareGivers status
export const doGetCGStatus = createAsyncThunk(
  "codetable/doGetCGStatus",
  async (_, { dispatch, getState }) => {
    const res: AxiosResponse = await doGetCGStatusAPI(
      (getState() as RootState).login.token
    );
    // Becomes the `fulfilled` action payload:

    return res.data;
  }
);

//CareGivers Type
export const doGetCGType = createAsyncThunk(
  "codetable/doGetCGType",
  async (_, { dispatch, getState }) => {
    const res: AxiosResponse = await doGetCGTypeAPI(
      (getState() as RootState).login.token
    );
    // Becomes the `fulfilled` action payload:
    return res.data;
  }
);

//CareGivers Background Check Status
export const doGetCgBgCheckStatus = createAsyncThunk(
  "codetable/doGetCgBgCheckStatus",
  async (arg, { getState }) => {
    const res: AxiosResponse = await doGetCgBgCheckStatusAPI(
      (getState() as RootState).login.token
    );
    // Becomes the `fulfilled` action payload:
    return res.data;
  }
);

export const CodeTableSlice = createSlice({
  name: "codetable",
  initialState: {
    gender: {},
    appointmentstatus: {},
    reminderstatus: {},
    frequency: {},
    maritalstatus: {},
    province: {},
    role: {},
    education: {},
    typeOfEmployee: {},
    initialContactStatus: {},
    initialContactReferral: {},
    risk: {},
    patient: {},
    mentalHealthOrSubstanceAbuse: {},
    presentConcerns: {},
    contactMethod: {},
    culturalType: {},
    culturalStatus: {},
    cgStatus: {},
    cgType: {},
    cgBgCheckStatus: {},
    jwtToken: "",
    status: "failed",
  },
  reducers: {
    cleanCodetableState(state: any) {
      state.gender = {};
      state.appointmentstatus = {};
      state.reminderstatus = {};
      state.maritalstatus = {};
      state.province = {};
      state.role = {};
      state.education = {};
      state.typeOfEmployee = {};
      state.initialContactStatus = {};
      state.initialContactReferral = {};
      state.risk = {};
      state.patient = {};
      state.mentalHealthOrSubstanceAbuse = {};
      state.presentConcerns = {};
      state.contactMethod = {};
      state.culturalType = {};
      state.culturalStatus = {};
      state.cgStatus = {};
      state.cgType = {};
      state.jwtToken = "";
      state.status = "failed";
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    //Gender
    builder.addCase(doGetGender.fulfilled, (state, action) => {
      try {
        state.gender = action.payload.valuesMap;
      } catch (err) {
        console.log(err);
      }
      state.status = "success";
    });
    builder.addCase(doGetGender.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(doGetGender.rejected, (state) => {
      state.status = "failed";
    });
    //AppointmentStatus
    builder.addCase(doGetFrequency.fulfilled, (state, action) => {
      try {
        state.frequency = action.payload.valuesMap;
      } catch (err) {
        console.log(err);
      }
      state.status = "success";
    });
    //frequency value
    builder.addCase(doGetAppointmentStatus.fulfilled, (state, action) => {
      try {
        state.appointmentstatus = action.payload.valuesMap;
      } catch (err) {
        console.log(err);
      }
      state.status = "success";
    });
    builder.addCase(doGetAppointmentStatus.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(doGetAppointmentStatus.rejected, (state) => {
      state.status = "failed";
    });

    //maritalstatus
    builder.addCase(doGetMaritalStatus.fulfilled, (state, action) => {
      try {
        state.maritalstatus = action.payload.valuesMap;
      } catch (err) {
        console.log(err);
      }
      state.status = "success";
    });
    builder.addCase(doGetMaritalStatus.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(doGetMaritalStatus.rejected, (state) => {
      state.status = "failed";
    });

    //province
    builder.addCase(doGetProvince.fulfilled, (state, action) => {
      try {
        state.province = action.payload.valuesMap;
      } catch (err) {
        console.log(err);
      }
      state.status = "success";
    });
    builder.addCase(doGetProvince.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(doGetProvince.rejected, (state) => {
      state.status = "failed";
    });

    //role
    builder.addCase(doGetRole.fulfilled, (state, action) => {
      try {
        state.role = action.payload.valuesMap;
      } catch (err) {
        console.log(err);
      }
      state.status = "success";
    });
    builder.addCase(doGetRole.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(doGetRole.rejected, (state) => {
      state.status = "failed";
    });

    //Education
    builder.addCase(doGetEducation.fulfilled, (state, action) => {
      try {
        state.education = action.payload.valuesMap;
      } catch (err) {
        console.log(err);
      }
      state.status = "success";
    });
    builder.addCase(doGetEducation.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(doGetEducation.rejected, (state) => {
      state.status = "failed";
    });
    //Reminder

    builder.addCase(doGetReminderStatus.fulfilled, (state, action) => {
      try {
        state.reminderstatus = action.payload.valuesMap;
      } catch (err) {
        console.log(err);
      }
      state.status = "success";
    });
    builder.addCase(doGetReminderStatus.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(doGetReminderStatus.rejected, (state) => {
      state.status = "failed";
    });

    //TypeOfEmployees
    builder.addCase(doGetTypeOfEmployee.fulfilled, (state, action) => {
      try {
        state.typeOfEmployee = action.payload.valuesMap;
      } catch (err) {
        console.log(err);
      }
      state.status = "success";
    });
    builder.addCase(doGetTypeOfEmployee.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(doGetTypeOfEmployee.rejected, (state) => {
      state.status = "failed";
    });

    // Initial Contact Status

    builder.addCase(doGetICStatus.fulfilled, (state, action) => {
      try {
        state.initialContactStatus = action.payload.valuesMap;
      } catch (err) {
        console.log(err);
      }
      state.status = "success";
    });
    builder.addCase(doGetICStatus.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(doGetICStatus.rejected, (state) => {
      state.status = "failed";
    });

    //Initial Contact Referral
    builder.addCase(doGetICReferral.fulfilled, (state, action) => {
      try {
        state.initialContactReferral = action.payload.valuesMap;
      } catch (err) {
        console.log(err);
      }
      state.status = "success";
    });
    builder.addCase(doGetICReferral.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(doGetICReferral.rejected, (state) => {
      state.status = "failed";
    });

    //Initial Contact Risk
    builder.addCase(doGetICRisk.fulfilled, (state, action) => {
      try {
        state.risk = action.payload.valuesMap;
      } catch (err) {
        console.log(err);
      }
      state.status = "success";
    });
    builder.addCase(doGetICRisk.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(doGetICRisk.rejected, (state) => {
      state.status = "failed";
    });

    //Initial Contact TypeofPatient
    builder.addCase(doGetICTypeOfPatient.fulfilled, (state, action) => {
      try {
        state.patient = action.payload.valuesMap;
      } catch (err) {
        console.log(err);
      }
      state.status = "success";
    });
    builder.addCase(doGetICTypeOfPatient.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(doGetICTypeOfPatient.rejected, (state) => {
      state.status = "failed";
    });

    //Initial Contact MentalHealthOrSubstanceAbuse
    builder.addCase(
      doGetICMentalHealthOrSubstanceAbuse.fulfilled,
      (state, action) => {
        try {
          state.mentalHealthOrSubstanceAbuse = action.payload.valuesMap;
        } catch (err) {
          console.log(err);
        }
        state.status = "success";
      }
    );
    builder.addCase(doGetICMentalHealthOrSubstanceAbuse.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(doGetICMentalHealthOrSubstanceAbuse.rejected, (state) => {
      state.status = "failed";
    });

    //Initial Contact Patient Concerns
    builder.addCase(doGetICPresentConcerns.fulfilled, (state, action) => {
      try {
        state.presentConcerns = action.payload.valuesMap;
      } catch (err) {
        console.log(err);
      }
      state.status = "success";
    });
    builder.addCase(doGetICPresentConcerns.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(doGetICPresentConcerns.rejected, (state) => {
      state.status = "failed";
    });
    //Initial Contact Contact-Method
    builder.addCase(doGetICContactMethod.fulfilled, (state, action) => {
      try {
        state.contactMethod = action.payload.valuesMap;
      } catch (err) {
        console.log(err);
      }
      state.status = "success";
    });
    builder.addCase(doGetICContactMethod.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(doGetICContactMethod.rejected, (state) => {
      state.status = "failed";
    });

    //Cpa Status
    builder.addCase(doGetCPACulturalStatus.fulfilled, (state, action) => {
      try {
        state.culturalStatus = action.payload.valuesMap;
      } catch (err) {
        console.log(err);
      }
      state.status = "success";
    });
    builder.addCase(doGetCPACulturalStatus.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(doGetCPACulturalStatus.rejected, (state) => {
      state.status = "failed";
    });

    //Cpa Type
    builder.addCase(doGetCPACulturalType.fulfilled, (state, action) => {
      try {
        state.culturalType = action.payload.valuesMap;
      } catch (err) {
        console.log(err);
      }
      state.status = "success";
    });
    builder.addCase(doGetCPACulturalType.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(doGetCPACulturalType.rejected, (state) => {
      state.status = "failed";
    });

    //CareGiver Type
    builder.addCase(doGetCGStatus.fulfilled, (state, action) => {
      try {
        state.cgStatus = action.payload.valuesMap;
      } catch (err) {
        console.log(err);
      }
      state.status = "success";
    });
    builder.addCase(doGetCGStatus.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(doGetCGStatus.rejected, (state) => {
      state.status = "failed";
    });

    //CareGiver Type
    builder.addCase(doGetCGType.fulfilled, (state, action) => {
      try {
        state.cgType = action.payload.valuesMap;
      } catch (err) {
        console.log(err);
      }
      state.status = "success";
    });
    builder.addCase(doGetCGType.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(doGetCGType.rejected, (state) => {
      state.status = "failed";
    });

    //CareGiver Background Check Status
    builder.addCase(doGetCgBgCheckStatus.fulfilled, (state, action) => {
      try {
        state.cgBgCheckStatus = action.payload.valuesMap;
      } catch (err) {
        console.log(err);
      }
      state.status = "success";
    });
    builder.addCase(doGetCgBgCheckStatus.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(doGetCgBgCheckStatus.rejected, (state) => {
      state.status = "failed";
    });
  },
});

export const { cleanCodetableState } = CodeTableSlice.actions;

export default CodeTableSlice.reducer;
