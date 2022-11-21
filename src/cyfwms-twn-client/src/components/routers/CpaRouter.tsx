import { AttachmentsContextProvider } from "../../contexts/AttachmentsContext";
import Add from "../../pages/cpa/attachments/Add";
import Attachments from "../../pages/cpa/attachments/Attachments";
import Edit from "../../pages/cpa/attachments/Edit";
import View from "../../pages/cpa/attachments/View";
import CulturalProgramOrActivity from "../../pages/cpa/culturalProgramOrActivity/CulturalProgramOrActivity";
import Participants from "../../pages/cpa/Participants/Participants";
import React from "react";
import { Route, Routes } from "react-router-dom";
import type { FC } from "react";

/**
 * `CpaRouter` is used in Popup of `CPA` aka \
 * `Cultural Programs and Activities` module \
 *  and holds all of it's associated routes.
 */
const CpaRouter: FC = () => (
  <>
    <Routes>
      <Route path="add_cpa" element={<CulturalProgramOrActivity />} />
      <Route path="participants" element={<Participants />} />
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

export default CpaRouter;
