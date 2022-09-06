import { Route, Routes } from "react-router-dom";
import React from "react";
import CulturalProgramOrActivity from "../../pages/cpa/culturalProgramOrActivity/CulturalProgramOrActivity";
import Participant from "../../pages/cpa/Participants/Participant";
import Attachment from "../../pages/cpa/Attachments/Attachment";

const CYFMS = () => {
  return (
    <Routes>
      <Route
        path="cultural_program_activity"
        element={<CulturalProgramOrActivity />}
      />
      <Route path="participant" element={<Participant />} />
      <Route path="attachment" element={<Attachment />} />
    </Routes>
  );
};

export default CYFMS;
