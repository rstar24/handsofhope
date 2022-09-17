import Attachments from "../../pages/cpa/attachments/Attachments";
import Handle from "../../pages/cpa/attachments/Handle";
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
      <Route path="attachments/handle" element={<Handle />} />
    </Routes>
  );
};

export default CPA;
