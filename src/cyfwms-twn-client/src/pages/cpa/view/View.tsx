import Popup from "../../../components/Popup";
import AuthLayout from "../../../components/auth/layout/AuthLayout";
import CPAHeader from "../../../components/cpa/CPAHeader";
import EditIcon from "../../../components/cpa/EditIcon";
import Attachments from "../../../components/cpa/view/Attachments";
import CPA from "../../../components/cpa/view/CPA";
import Participant from "../../../components/cpa/view/Participant";
import Router from "../../../components/nestedRouters/CPA";
import { useAppSelector } from "../../../library/hooks";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import React, { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import type { ReactElement } from "react";

export const styles = {
  header: {
    fontWeight: 1000,
    backgroundColor: "#ededed",
    px: "1rem",
    boxShadow: `inset 1px 0px black,
    inset -1px 0px black`,
  },
  keys: {
    variant: "h6",
    fontWeight: 600,
    fontSize: 16,
  },
};

const View = (): ReactElement => {
  const navigate = useNavigate();
  const state = useAppSelector((state) => state);
  const [tab, setTab] = useState(1);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  return (
    <AuthLayout>
      <CPAHeader />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "#d7d3d354",
          px: "1rem",
        }}
      >
        <Typography variant="h5" alignSelf="center">
          Reference Id: {state.cpa.data.referenceId}
        </Typography>
        <Typography>
          <EditIcon value={state.cpa.data.culturalProgramId} />
        </Typography>
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          bgcolor: "background.paper",
          boxShadow: `inset 1px 0 black,
                      inset -1px 0 black`,
        }}
      ></Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          bgcolor: "background.paper",
          boxShadow: `inset 1px 0 black,
                      inset -1px 0 black`,
        }}
      >
        <Tabs
          variant="scrollable"
          value={tab}
          onChange={handleChange}
          aria-label="InitialContact view navigation tabs"
        >
          <Tab
            label="Cultural Program(s) and Activities"
            value={1}
            onClick={() => navigate("add_cpa")}
          />
          <Tab
            label="Participants"
            value={2}
            onClick={() => navigate("participants")}
          />
          <Tab
            label="Attachments"
            value={3}
            onClick={() => navigate("attachments")}
          />
        </Tabs>
      </Box>
      <Box sx={{ height: 400, overflowY: "scroll" }}>
        <Routes>
          <Route path="*" element={<CPA />} />
          <Route path="add_cpa" element={<CPA />} />
          <Route path="participants" element={<Participant />} />
          <Route path="attachments" element={<Attachments />} />
        </Routes>
      </Box>
      <Popup children={<Router />} />
    </AuthLayout>
  );
};

export default View;
