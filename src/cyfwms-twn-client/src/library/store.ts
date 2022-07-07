import educationAndEmploymentReducer from "../features/cyfms/educationAndEmployment/educationAndEmploymentSlice";
import codetableReducer from "../features/codetable/codetableSlice";
import contactReducer from "../features/contact/contactSlice";
import criminalhistoryReducer from "../features/cyfms/criminalHistory/criminalhistorySlice";
import cyfmsSideNavReducer from "../features/cyfms/cyfmsSideNavSlice";
import familyPhysiciansReducer from "../features/cyfms/familyPhysicians/familyPhysiciansSlice";
import householdAndMembersReducer from "../features/cyfms/householdAndMembers/householdAndMembersSlice";
import loginReducer from "../features/login/loginSlice";
import otherInformationReducer from "../features/cyfms/otherInformation/otherInformationSlice";
import RegistrationReducer from "../features/register/registerSlice";
import workerReducer from "../features/worker/workerSlice";
import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import searchReducer from "../features/search/searchSlice";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    cyfmsSideNav: cyfmsSideNavReducer,
    codetable: codetableReducer,
    registration: RegistrationReducer,
    contact: contactReducer,
    householdAndMembers: householdAndMembersReducer,
    familyPhysicians: familyPhysiciansReducer,
    worker: workerReducer,
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
