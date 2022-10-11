import codetableReducer from "../features/codetable/slice";
import cpaAttachmentsReducer from "../features/cpa/attachments/slice";
import cpaParticipantReducer from "../features/cpa/participant/slice";
import cpaReducer from "../features/cpa/culturalProgramActivity/slice";
import cpaSearchReducer from "../features/cpa/search/slice";
import cgCapacityReducer from "../features/cg/capacity/slice";
import cgCareProviderReducer from "../features/cg/careProvider/slice";
import cyfmsAllReducer from "../features/cyfms/all/slice";
import cyfmsContactReducer from "../features/cyfms/contact/slice";
import cyfmsCriminalHistoryReducer from "../features/cyfms/criminalHistory/slice";
import cyfmsEducationAndEmploymentReducer from "../features/cyfms/educationAndEmployment/slice";
import cyfmsFamilyPhysiciansReducer from "../features/cyfms/familyPhysicians/slice";
import cyfmsHouseholdMembersReducer from "../features/cyfms/householdMembers/slice";
import cyfmsOtherInformationReducer from "../features/cyfms/otherInformation/slice";
import cyfmsRegisterReducer from "../features/cyfms/register/slice";
import cyfmsCounselorsReducer from "../features/cyfms/counselors/slice";
import cyfmsSearchReducer from "../features/cyfms/search/slice";
import icContactNotesReducer from "../features/initialContact/contactNotes/slice";
import icFileDetailsReducer from "../features/initialContact/fileDetails/slice";
import icIncidentReportReducer from "../features/initialContact/incidentReport/slice";
import icPresentConcernsReducer from "../features/initialContact/presentConcerns/slice";
import icPatientCareInformationReducer from "../features/initialContact/patientCareInformation/slice";
import icReferralInformationReducer from "../features/initialContact/referralInformation/slice";
import icSearchReducer from "../features/initialContact/search/slice";
import initiatorReducer from "../features/initiatorSlice";
import loginReducer from "../features/login/slice";
import popupReducer from "../features/popupSlice";
import navBarReducer from "../features/navBarSlice";

const rootReducer = {
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
  cyfmsAll: cyfmsAllReducer,
  icFileDetails: icFileDetailsReducer,
  icIncidentReport: icIncidentReportReducer,
  icReferralInformation: icReferralInformationReducer,
  icPresentConcerns: icPresentConcernsReducer,
  icPatientCareInformation: icPatientCareInformationReducer,
  icContactNotes: icContactNotesReducer,
  icSearch: icSearchReducer,
  cpa: cpaReducer,
  cpaSearch: cpaSearchReducer,
  cpaParticipant: cpaParticipantReducer,
  cpaAttachments: cpaAttachmentsReducer,
  cgCareProvider: cgCareProviderReducer,
  cgCapacity: cgCapacityReducer,
};

export default rootReducer;
