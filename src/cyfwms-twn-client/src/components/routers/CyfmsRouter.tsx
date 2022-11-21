import { AttachmentsContextProvider } from "../../contexts/AttachmentsContext";
import Appointments from "../../pages/cyfms/appointments/Appointments";
import Add from "../../pages/cyfms/attachments/Add";
import Attachments from "../../pages/cyfms/attachments/Attachments";
import Edit from "../../pages/cyfms/attachments/Edit";
import View from "../../pages/cyfms/attachments/View";
import Contact from "../../pages/cyfms/contact/Contact";
import Counselors from "../../pages/cyfms/counselors/Counselors";
import CriminalHistory from "../../pages/cyfms/criminalHistory/CriminalHistory";
import EducationAndEmployment from "../../pages/cyfms/educationAndEmployment/EducationAndEmployment";
import FamilyPhysicians from "../../pages/cyfms/familyPhysicians/FamilyPhysicians";
import HouseholdMembers from "../../pages/cyfms/householdMembers/HouseholdMembers";
import OtherInformation from "../../pages/cyfms/otherInformation/OtherInformation";
import Reminders from "../../pages/cyfms/reminders/Reminders";
import Register from "../../pages/cyfms/register/Register";
import React from "react";
import { Route, Routes } from "react-router-dom";
import type { FC } from "react";

/**
 * `CyfmsRouter` is used in Popup of `CYFMS` aka \
 * `Child, Youth, and Family Management Services` \
 * module and holds all the nested routes.
 */
const CyfmsRouter: FC = () => (
  <>
    <Routes>
      <Route path="register" element={<Register />} />
      <Route path="contact" element={<Contact />} />
      <Route path="household_members" element={<HouseholdMembers />} />
      <Route
        path="education_and_employment"
        element={<EducationAndEmployment />}
      />
      <Route path="criminal_history" element={<CriminalHistory />} />
      <Route path="family_physicians" element={<FamilyPhysicians />} />
      <Route path="counselors" element={<Counselors />} />
      <Route path="other_information" element={<OtherInformation />} />
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

export default CyfmsRouter;
