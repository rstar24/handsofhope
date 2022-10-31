import FileDetails from "../../pages/initialContact/FileDetails";
import IncidentReport from "../../pages/initialContact/IncidentReport";
import PatientCareInformation from "../../pages/initialContact/PatientCareInformation";
import PresentConcerns from "../../pages/initialContact/PresentConcerns";
import ReferralInformation from "../../pages/initialContact/ReferralInformation";
import React from "react";
import { Route, Routes } from "react-router-dom";
import type { ReactElement } from "react";
import ContactNotes from "../../pages/initialContact/contactNotes/ContactNotes";
import Participants from "../../pages/initialContact/Participants/Participant";

const InitialContact = (): ReactElement => {
  return (
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
    </Routes>
  );
};

export default InitialContact;
