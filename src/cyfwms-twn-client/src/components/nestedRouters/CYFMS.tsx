import CYFMSFamilyPhysicians from "../../pages/cyfms/FamilyPhysicians";
import CYFMSContact from "../../pages/cyfms/Contact";
import CYFMSCriminalHistory from "../../pages/cyfms/CriminalHistory";
import CYFMSCounselors from "../../pages/cyfms/Counselors";
import CYFMSEducationAndEmployment from "../../pages/cyfms/EducationAndEmployment";
import CYFMSHouseholdMembers from "../../pages/cyfms/HouseholdMembers";
import CYFMSOtherInformation from "../../pages/cyfms/OtherInformation";
import CYFMSRegister from "../../pages/cyfms/Register";
import { Route, Routes } from "react-router-dom";
import React from "react";

const CYFMS = () => {
  return (
    <Routes>
      <Route path="register" element={<CYFMSRegister />} />
      <Route path="contact" element={<CYFMSContact />} />
      <Route path="household_members" element={<CYFMSHouseholdMembers />} />
      <Route
        path="education_and_employment"
        element={<CYFMSEducationAndEmployment />}
      />
      <Route path="criminal_history" element={<CYFMSCriminalHistory />} />
      <Route path="family_physicians" element={<CYFMSFamilyPhysicians />} />
      <Route path="counselors" element={<CYFMSCounselors />} />
      <Route path="other_information" element={<CYFMSOtherInformation />} />
    </Routes>
  );
};

export default CYFMS;
