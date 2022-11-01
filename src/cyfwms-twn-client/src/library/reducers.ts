import codetableReducer from "../features/codetable/slice";
import cpaAttachmentsReducer from "../features/cpa/attachments/slice";
import cpaParticipantReducer from "../features/cpa/participant/slice";
import cpaReducer from "../features/cpa/culturalProgramActivity/slice";
import cpaSearchReducer from "../features/cpa/search/slice";
import cgAttachmentsReducer from "../features/cg/attachments/slice";
import cgCapacityReducer from "../features/cg/capacity/slice";
import cgCaregiversReducer from "../features/cg/caregivers/slice";
import cgCareProviderReducer from "../features/cg/careProvider/slice";
import cgContactNotesReducer from "../features/cg/contactNotes/slice";
import cgSearchReducer from "../features/cg/search/slice";
import cyfmsAllReducer from "../features/cyfms/all/slice";
import cyfmsAttachmentsReducer from "../features/cyfms/attachments/slice";
import cyfmsContactReducer from "../features/cyfms/contact/slice";
import cyfmsCriminalHistoryReducer from "../features/cyfms/criminalHistory/slice";
import cyfmsEducationAndEmploymentReducer from "../features/cyfms/educationAndEmployment/slice";
import cyfmsFamilyPhysiciansReducer from "../features/cyfms/familyPhysicians/slice";
import cyfmsHouseholdMembersReducer from "../features/cyfms/householdMembers/slice";
import cyfmsOtherInformationReducer from "../features/cyfms/otherInformation/slice";
import cyfmsRegisterReducer from "../features/cyfms/register/slice";
import cyfmsCounselorsReducer from "../features/cyfms/counselors/slice";
import cyfmsSearchReducer from "../features/cyfms/search/slice";
import icAttachmentsReducer from "../features/initialContact/attachments/slice";
import icContactNotesReducer from "../features/initialContact/contactNotes/slice";
import icFileDetailsReducer from "../features/initialContact/fileDetails/slice";
import icIncidentReportReducer from "../features/initialContact/incidentReport/slice";
import icPresentConcernsReducer from "../features/initialContact/presentConcerns/slice";
import icPatientCareInformationReducer from "../features/initialContact/patientCareInformation/slice";
import icReferralInformationReducer from "../features/initialContact/referralInformation/slice";
import icParticipantsReducer from "../features/initialContact/participant/slice";
import icSearchReducer from "../features/initialContact/search/slice";
import initiatorReducer from "../features/initiatorSlice";
import loginReducer from "../features/login/slice";
import popupReducer from "../features/popupSlice";
import navBarReducer from "../features/navBarSlice";
import cyfmsAppointmentsReducer  from "../features/cyfms/appointment/slice";
import ICappointmentsReducer from "../features/initialContact/appointment/slice";
import cgAppointmentsReducer from "../features/cg/appointment/slice";
import calendarReducer from "../features/calendar/slice";
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
  cyfmsAppointments: cyfmsAppointmentsReducer,
  cyfmsAttachments: cyfmsAttachmentsReducer,
  cyfmsSearch: cyfmsSearchReducer,
  cyfmsAll: cyfmsAllReducer,
  icFileDetails: icFileDetailsReducer,
  icAppointment: ICappointmentsReducer,
  icIncidentReport: icIncidentReportReducer,
  icReferralInformation: icReferralInformationReducer,
  icPresentConcerns: icPresentConcernsReducer,
  icPatientCareInformation: icPatientCareInformationReducer,
  icContactNotes: icContactNotesReducer,
  icParticipants: icParticipantsReducer,
  icSearch: icSearchReducer,
  icAttachments: icAttachmentsReducer,
  cpa: cpaReducer,
  cpaSearch: cpaSearchReducer,
  cpaParticipant: cpaParticipantReducer,
  cpaAttachments: cpaAttachmentsReducer,
  cgCareProvider: cgCareProviderReducer,
  cgAppointment: cgAppointmentsReducer,
  cgCapacity: cgCapacityReducer,
  cgCaregivers: cgCaregiversReducer,
  cgAttachments: cgAttachmentsReducer,
  cgContactNotes: cgContactNotesReducer,
  cgSearch: cgSearchReducer,
  calendar: calendarReducer
};

export default rootReducer;
