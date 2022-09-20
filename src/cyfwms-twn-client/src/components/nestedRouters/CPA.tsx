import Add from "../../pages/cpa/attachments/Add";
import Attachments from "../../pages/cpa/attachments/Attachments";
import Edit from "../../pages/cpa/attachments/Edit";
import View from "../../pages/cpa/attachments/View";
import CulturalProgramOrActivity from "../../pages/cpa/culturalProgramOrActivity/CulturalProgramOrActivity";
import Participants from "../../pages/cpa/Participants/Participant";
import React from "react";
import { Route, Routes } from "react-router-dom";
import type { ReactElement } from "react";

const CPA = (): ReactElement => {
  return (
    <Routes>
      <Route path="add_cpa" element={<CulturalProgramOrActivity />} />
      <Route path="participants" element={<Participants />} />
      <Route path="attachments" element={<Attachments />} />
      <Route path="attachments/add" element={<Add />} />
      <Route path="attachments/view" element={<View />} />
      <Route path="attachments/edit" element={<Edit />} />
    </Routes>
  );
};

export default CPA;
