import { AttachmentsContextProvider } from "../../contexts/AttachmentsContext";
import Appointments from "../../pages/ic/appointments/Appointments";
import Add from "../../pages/ic/attachments/Add";
import Attachments from "../../pages/ic/attachments/Attachments";
import Edit from "../../pages/ic/attachments/Edit";
import View from "../../pages/ic/attachments/View";
import ContactNotes from "../../pages/ic/contactNotes/ContactNotes";
import FileDetails from "../../pages/ic/FileDetails";
import IncidentReport from "../../pages/ic/IncidentReport";
import Participants from "../../pages/ic/participants/Participants";
import PatientCareInformation from "../../pages/ic/PatientCareInformation";
import PresentConcerns from "../../pages/ic/PresentConcerns";
import ReferralInformation from "../../pages/ic/ReferralInformation";
import Reminders from "../../pages/ic/reminders/Reminders";
import React from "react";
import { Route, Routes } from "react-router-dom";
import type { FC } from "react";

/**
 * `IcRouter` is used in Popup of `IC` aka `Initial Contact` \
 * module and holds all of it's associated routes.
 */
const IcRouter: FC = () => (
  <>
    <Routes>
      <Route path="file_details" element={<FileDetails />} />
      <Route path="referral_information" element={<ReferralInformation />} />
      <Route path="incident_report" element={<IncidentReport />} />
      <Route path="present_concerns" element={<PresentConcerns />} />
      <Route
        path="patient_care_information"
        element={<PatientCareInformation />}
      />
      <Route path="participants" element={<Participants />} />
      <Route path="contact_notes" element={<ContactNotes />} />
      <Route path="appointment" element={<Appointments />} />
      <Route path="reminder" element={<Reminders />} />
    </Routes>
    <AttachmentsContextProvider>
      <Routes>
        <Route path="attachments" element={<Attachments />} />
        <Route path="attachments/add" element={<Add />} />
        <Route path="attachments/view" element={<View />} />
        <Route path="attachments/edit" element={<Edit />} />
      </Routes>
    </AttachmentsContextProvider>
  </>
);

export default IcRouter;
