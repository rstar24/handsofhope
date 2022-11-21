import Header from "../../../components/Header";
import Popup from "../../../components/Popup";
import AuthLayout from "../../../components/auth/layout/AuthLayout";
import EditIcon from "../../../components/cpa/EditIcon";
import AttachmentsViewPage from "./AttachmentsViewPage";
import CpaViewPage from "./CpaViewPage";
import ParticipantsViewPage from "./ParticipantsViewPage";
import Router from "../../../components/routers/CpaRouter";
import TabContext from "../../../contexts/view/TabContext";
import { useAppSelector } from "../../../library/hooks";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import React, { useContext } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import type { FC } from "react";

/**
 * *CPA* aka *Cultural Programs and Activities* module. \
 * `ViewPage` is *CPA* modules' view page.
 */
const ViewPage: FC = () => {
  const navigate = useNavigate();
  const state = useAppSelector((state) => state);
  const tabContext = useContext(TabContext);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    tabContext.tabNumber = newValue;
  };

  return (
    <AuthLayout>
      <Header bannerTitle="Cultural Programs and Activities" />
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
        <TabContext.Provider value={{ tabNumber: 1 }}>
          <Tabs
            variant="scrollable"
            value={tabContext.tabNumber}
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
        </TabContext.Provider>
      </Box>
      <Box sx={{ height: 400, overflowY: "scroll" }}>
        <Routes>
          <Route path="*" element={<CpaViewPage />} />
          <Route path="add_cpa" element={<CpaViewPage />} />
          <Route path="participants" element={<ParticipantsViewPage />} />
          <Route path="attachments" element={<AttachmentsViewPage />} />
        </Routes>
      </Box>
      <Popup children={<Router />} />
    </AuthLayout>
  );
};

export default ViewPage;
