import { AttachmentsContextProvider } from "../../contexts/AttachmentsContext";
import Appointments from "../../pages/cg/appointment/CGAppointments";
import Add from "../../pages/cg/attachments/Add";
import Attachments from "../../pages/cg/attachments/Attachments";
import Edit from "../../pages/cg/attachments/Edit";
import View from "../../pages/cg/attachments/View";
import Capacity from "../../pages/cg/capacity/Capacity";
import Caregivers from "../../pages/cg/caregivers/Caregivers";
import CareProvider from "../../pages/cg/careProvider/CareProvider";
import ContactNotes from "../../pages/cg/ContactNotes/ContactNotes";
import Reminders from "../../pages/cg/Reminders/Reminders";
import React from "react";
import { Route, Routes } from "react-router-dom";
import type { FC } from "react";

/**
 * `CgRouter` is used in Popup of `CG` aka `Caregivers` module \
 *  and holds all of it's associated routes.
 * @returns `ReactElement`
 */
const CgRouter: FC = () => (
  <>
    <Routes>
      <Route path="care_provider" element={<CareProvider />} />
      <Route path="capacity" element={<Capacity />} />
      <Route path="caregivers" element={<Caregivers />} />
      <Route path="contact_notes" element={<ContactNotes />} />
      <Route path="appointment" element={<Appointments />} />
      <Route path="reminders" element={<Reminders />} />
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

export default CgRouter;
