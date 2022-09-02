import { Route, Routes } from "react-router-dom";
import React from "react";
import CulturalProgramOrActivity from "../../pages/cpa/culturalProgramOrActivity/CulturalProgramOrActivity";

const CYFMS = () => {
  return (
    <Routes>
      <Route
        path="cultural_program_activity"
        element={<CulturalProgramOrActivity />}
      />
    </Routes>
  );
};

export default CYFMS;
