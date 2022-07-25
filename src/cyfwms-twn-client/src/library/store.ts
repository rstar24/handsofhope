import educationAndEmploymentReducer from "../features/cyfms/educationAndEmployment/educationAndEmploymentSlice";
import codetableReducer from "../features/codetable/codetableSlice";
import cyfmsContactReducer from "../features/cyfms/contact/cyfmsContactSlice";
import cyfmsCriminalHistoryReducer from "../features/cyfms/criminalHistory/cyfmsCriminalHistorySlice";
import cyfmsFamilyPhysiciansReducer from "../features/cyfms/familyPhysicians/cyfmsFamilyPhysiciansSlice";
import cyfmsHouseholdMembersReducer from "../features/cyfms/householdMembers/cyfmsHouseholdMembersSlice";
import loginReducer from "../features/login/loginSlice";
import cyfmsOtherInformationReducer from "../features/cyfms/otherInformation/cyfmsOtherInformationSlice";
import cyfmsRegisterReducer from "../features/cyfms/register/cyfmsRegisterSlice";
import cyfmsCounselorsReducer from "../features/cyfms/counselors/cyfmsCounselorsSlice";
import icFileDetailsReducer from "../features/initialContact/fileDetails/slice";
import icIncidentReportReducer from "../features/initialContact/incidentReport/slice";
import icPresentConcernsReducer from "../features/initialContact/presentConcerns/slice";
import icPatientCareInformationReducer from "../features/initialContact/patientCareInformation/slice";
import icReferralInformationReducer from "../features/initialContact/referralInformation/slice";
import icSearchReducer from "../features/initialContact/search/slice";
import initiatorReducer from "../features/initiatorSlice";
import searchReducer from "../features/search/searchSlice";
import navBarReducer from "../features/navBarSlice";
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
    cyfmsCriminalHistory: cyfmsCriminalHistoryReducer,
    cyfmsOtherInformation: cyfmsOtherInformationReducer,
    icFileDetails: icFileDetailsReducer,
    icIncidentReport: icIncidentReportReducer,
    icReferralInformation: icReferralInformationReducer,
    icPresentConcerns: icPresentConcernsReducer,
    icPatientCareInformation: icPatientCareInformationReducer,
    icSearch: icSearchReducer,
    initiator: initiatorReducer,
    educationAndEmployment: educationAndEmploymentReducer,
    navBar: navBarReducer,
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
