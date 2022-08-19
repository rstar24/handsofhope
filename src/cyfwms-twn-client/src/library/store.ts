import codetableReducer from "../features/codetable/codetableSlice";
import cyfmsContactReducer from "../features/cyfms/contact/slice";
import cyfmsCriminalHistoryReducer from "../features/cyfms/criminalHistory/slice";
import cyfmsEducationAndEmploymentReducer from "../features/cyfms/educationAndEmployment/slice";
import cyfmsFamilyPhysiciansReducer from "../features/cyfms/familyPhysicians/slice";
import cyfmsHouseholdMembersReducer from "../features/cyfms/householdMembers/slice";
import cyfmsOtherInformationReducer from "../features/cyfms/otherInformation/slice";
import cyfmsRegisterReducer from "../features/cyfms/register/slice";
import cyfmsCounselorsReducer from "../features/cyfms/counselors/slice";
import cyfmsSearchReducer from "../features/cyfms/search/slice";
import icFileDetailsReducer from "../features/initialContact/fileDetails/slice";
import icIncidentReportReducer from "../features/initialContact/incidentReport/slice";
import icPresentConcernsReducer from "../features/initialContact/presentConcerns/slice";
import icPatientCareInformationReducer from "../features/initialContact/patientCareInformation/slice";
import icReferralInformationReducer from "../features/initialContact/referralInformation/slice";
import icContactNotesReducer from "../features/initialContact/contactNotes/slice";
import icSearchReducer from "../features/initialContact/search/slice";
import initiatorReducer from "../features/initiatorSlice";
import loginReducer from "../features/login/loginSlice";
import popupReducer from "../features/popupSlice";
import readAllRecordReducer from "../features/cyfms/getAllRecord/slice";
import navBarReducer from "../features/navBarSlice";
import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    popup: popupReducer,
    navBar: navBarReducer,
    initiator: initiatorReducer,
    codetable: codetableReducer,
    cyfmsRegister: cyfmsRegisterReducer,
    cyfmsContact: cyfmsContactReducer,
    cyfmsHouseholdMembers: cyfmsHouseholdMembersReducer,
    cyfmsEducationAndEmployment: cyfmsEducationAndEmploymentReducer,
    cyfmsCriminalHistory: cyfmsCriminalHistoryReducer,
    cyfmsFamilyPhysicians: cyfmsFamilyPhysiciansReducer,
    cyfmsCounselors: cyfmsCounselorsReducer,
    cyfmsOtherInformation: cyfmsOtherInformationReducer,
    cyfmsSearch: cyfmsSearchReducer,
    icFileDetails: icFileDetailsReducer,
    icIncidentReport: icIncidentReportReducer,
    icReferralInformation: icReferralInformationReducer,
    icPresentConcerns: icPresentConcernsReducer,
    icPatientCareInformation: icPatientCareInformationReducer,
    icContactNotes: icContactNotesReducer,
    icSearch: icSearchReducer,
    readAll: readAllRecordReducer,
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
