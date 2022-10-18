import Popup from "../../../components/Popup";

import Router from "../../../components/nestedRouters/CG";
import TabContext from "../../../contexts/view/TabContext";
import { useAppSelector } from "../../../library/hooks";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import React, { useContext } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import type { ReactElement } from "react";
import Header from "../../../components/Header";
import EditIcon from "../../../components/cg/EditIcon";
import AuthLayout from "../../../components/auth/layout/AuthLayout";

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
  const tabContext = useContext(TabContext);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    tabContext.tabNumber = newValue;
  };

  return (
    <AuthLayout>
      <Header bannerTitle="Caregivers" />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "#d7d3d354",
          px: "1rem",
        }}
      >
        <Typography variant="h5" alignSelf="center">
          Care Provider: {state.cgCareProvider.data.id}
        </Typography>
        <Typography>
          <EditIcon
            value={state.cgCareProvider.data.id}
            cgProviderId={state.cgCareProvider.data.id || 0}
          />
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
      >
        <TabContext.Provider value={{ tabNumber: 1 }}>
          <Tabs
            variant="scrollable"
            value={tabContext.tabNumber}
            onChange={handleChange}
            aria-label="InitialContact view navigation tabs"
          >
            <Tab
              label="Care Provider"
              value={1}
              onClick={() => navigate("care_provider")}
            />
            <Tab
              label="Capacity"
              value={2}
              onClick={() => navigate("capacity")}
            />
            <Tab
              label="Care Givers"
              value={3}
              onClick={() => navigate("caregivers")}
            />
            <Tab
              label="Contact Notes"
              value={4}
              onClick={() => navigate("contact_notes")}
            />
            <Tab
              label="Attachments"
              value={5}
              onClick={() => navigate("attachments")}
            />
          </Tabs>
        </TabContext.Provider>
      </Box>
      <Box sx={{ height: 400, overflowY: "scroll" }}>
        <Routes>
          {/* <Route path="*" element={<FileDetails />} />
          <Route path="file_details" element={<FileDetails />} /> */}
        </Routes>
      </Box>
      <Popup children={<Router />} />
    </AuthLayout>
  );
};

export default View;
