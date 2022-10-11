import Attachment from "../../pages/cg/Attachment/Attachment";
import ContactNotes from "../../pages/cg/ContactNotes/ContactNotes";
import Add from "../../pages/cg/cg/Add";
import View from "../../pages/cg/Attachment/View";
import Edit from "../../pages/cg/Attachment/Edit";
import Capacity from "../../pages/cg/capacity/Capacity";
//import Caregivers from "../../pages/cg/caregivers/Caregivers";
import CareProvider from "../../pages/cg/careProvider/CareProvider";
import React from "react";
import { Route, Routes } from "react-router-dom";
import type { FC } from "react";

/**
 * `CG` is the nested router used in `Popup` of `/cg` route.
 * @returns `ReactElement`
 */
const CG: FC = () => {
  return (
    <Routes>
      <Route path="care_provider" element={<CareProvider />} />
      <Route path="capacity" element={<Capacity />} />
      {/* <Route path="caregivers" element={<Caregivers />} /> */}
      <Route path="contact_notes" element={<ContactNotes />} />
      <Route path="attachments" element={<Attachment />} />
      <Route path="attachments/add" element={<Add />} />
      <Route path="attachments/view" element={<View />} />
      <Route path="attachments/edit" element={<Edit />} />
    </Routes>
  );
};

export default CG;
