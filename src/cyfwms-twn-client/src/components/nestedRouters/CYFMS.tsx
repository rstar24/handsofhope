import Add from "../../pages/cyfms/attachments/Add";
import Attachments from "../../pages/cyfms/attachments/Attachments";
import Edit from "../../pages/cyfms/attachments/Edit";
import View from "../../pages/cyfms/attachments/View";
import CYFMSFamilyPhysicians from "../../pages/cyfms/familyPhysicians/FamilyPhysicians";
import CYFMSContact from "../../pages/cyfms/contact/Contact";
import CYFMSCriminalHistory from "../../pages/cyfms/criminalHistory/CriminalHistory";
import CYFMSCounselors from "../../pages/cyfms/counselors/Counselors";
import CYFMSEducationAndEmployment from "../../pages/cyfms/educationAndEmployment/EducationAndEmployment";
import CYFMSHouseholdMembers from "../../pages/cyfms/householdMembers/HouseholdMembers";
import CYFMSOtherInformation from "../../pages/cyfms/otherInformation/OtherInformation";
import CYFMSRegister from "../../pages/cyfms/register/Register";
import Appointments from "../../pages/cyfms/appointment/Appointments";
import AppointmentsForm from "../../pages/cyfms/appointment/AppointmentsForm";
import React from "react";
import { Route, Routes } from "react-router-dom";
import type { FC } from "react";

/**
 * `CYFMS` is used in Popup of 
 * `CYFMS` aka `Child, Youth, and Family Management` module.
 * @returns `ReactElement`
 */
const CYFMS: FC = () => (
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
    <Route path="appointment" element={<Appointments />} />
    <Route path="attachments" element={<Attachments />} />
    <Route path="attachments/add" element={<Add />} />
    <Route path="attachments/view" element={<View />} />
    <Route path="attachments/edit" element={<Edit />} />
  </Routes>
);

export default CYFMS;
