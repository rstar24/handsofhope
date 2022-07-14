import educationAndEmploymentReducer from "../features/cyfms/educationAndEmployment/educationAndEmploymentSlice";
import codetableReducer from "../features/codetable/codetableSlice";
import cyfmsContactReducer from "../features/cyfms/contact/cyfmsContactSlice";
import criminalhistoryReducer from "../features/cyfms/criminalHistory/criminalhistorySlice";
import cyfmsFamilyPhysiciansReducer from "../features/cyfms/familyPhysicians/cyfmsFamilyPhysiciansSlice";
import cyfmsHouseholdMembersReducer from "../features/cyfms/householdMembers/cyfmsHouseholdMembersSlice";
import loginReducer from "../features/login/loginSlice";
import otherInformationReducer from "../features/cyfms/otherInformation/otherInformationSlice";
import cyfmsRegisterReducer from "../features/cyfms/register/cyfmsRegisterSlice";
import cyfmsCounselorsReducer from "../features/cyfms/counselors/cyfmsCounselorsSlice";
import searchReducer from "../features/search/searchSlice";
import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    codetable: codetableReducer,
    cyfmsRegister: cyfmsRegisterReducer,
    cyfmsContact: cyfmsContactReducer,
    cyfmsHouseholdMembers: cyfmsHouseholdMembersReducer,
    cyfmsFamilyPhysicians: cyfmsFamilyPhysiciansReducer,
    cyfmsCounselors: cyfmsCounselorsReducer,
    criminalHistory: criminalhistoryReducer,
    otherInformation: otherInformationReducer,
    educationAndEmployment: educationAndEmploymentReducer,
    search: searchReducer,
  },
});

/**
 * Infer the `AppDispatch` type from the store itself.
 */
export type AppDispatch = typeof store.dispatch;

/**
 * Infer the `RootState` type from the store itself.
 */
export type RootState = ReturnType<typeof store.getState>;

/**
 * Infer the `AppThunk` type from the store itself.
 */
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
