import Add from "../../pages/initialContact/attachments/Add";
import Attachments from "../../pages/initialContact/attachments/Attachments";
import Edit from "../../pages/initialContact/attachments/Edit";
import View from "../../pages/initialContact/attachments/View";
import ContactNotes from "../../pages/initialContact/contactNotes/ContactNotes";
import FileDetails from "../../pages/initialContact/FileDetails";
import IncidentReport from "../../pages/initialContact/IncidentReport";
import Participants from "../../pages/initialContact/Participants/Participant";
import PatientCareInformation from "../../pages/initialContact/PatientCareInformation";
import PresentConcerns from "../../pages/initialContact/PresentConcerns";
import ReferralInformation from "../../pages/initialContact/ReferralInformation";
import ICAppointments from "../../pages/initialContact/appointment/ICAppointments";
import Appointments from "../../pages/initialContact/appointment/ICAppointments";
import React from "react";
import { Route, Routes } from "react-router-dom";
import type { FC } from "react";

/**
 * `InitialContact` is used in Popup of `IC` aka `Initial Contact` module.
 * @returns `ReactElement`
 */
const InitialContact: FC = () => (
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
    <Route path="appointment" element={<ICAppointments />} />
    <Route path="attachments" element={<Attachments />} />
    <Route path="attachments/add" element={<Add />} />
    <Route path="attachments/view" element={<View />} />
    <Route path="attachments/edit" element={<Edit />} />
  </Routes>
);

export default InitialContact;
