import FileDetails from "../../pages/initialContact/FileDetails";
import IncidentReport from "../../pages/initialContact/IncidentReport";
import PatientCareInformation from "../../pages/initialContact/PatientCareInformation";
import PresentConcerns from "../../pages/initialContact/PresentConcerns";
import ReferralInformation from "../../pages/initialContact/ReferralInformation";
import React from "react";
import { Route, Routes } from "react-router-dom";
import type { ReactElement } from "react";

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
    </Routes>
  );
};

export default InitialContact;
