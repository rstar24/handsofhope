import Popup from "../../../components/Popup";
import AuthLayout from "../../../components/auth/layout/AuthLayout";
import ICHeader from "../../../components/initialContact/ICHeader";
import EditIcon from "../../../components/initialContact/EditIcon";
import FileDetails from "../../../components/initialContact/view/FileDetails";
import IncidentReport from "../../../components/initialContact/view/IncidentReport";
import PatientCareInformation from "../../../components/initialContact/view/PatientCareInformation";
import PresentConcerns from "../../../components/initialContact/view/PresentConcerns";
import ReferralInformation from "../../../components/initialContact/view/ReferralInformation";
import ContactNotes from "../../../components/initialContact/view/ContactNotes";
import Router from "../../../components/nestedRouters/InitialContact";
import TabContext from "../../../contexts/view/TabContext";
import { useAppSelector } from "../../../library/hooks";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import React, { useContext } from "react";
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
  const tabContext = useContext(TabContext);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    tabContext.tabNumber = newValue;
  };

  return (
    <AuthLayout>
      <ICHeader />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "#d7d3d354",
          px: "1rem",
        }}
      >
        <Typography variant="h5" alignSelf="center">
          File Number: {state.icFileDetails.getData.fileNumber}
        </Typography>
        <Typography>
          <EditIcon
            value={state.icFileDetails.getData.fileDetailsId}
            fileNumber={state.icFileDetails.getData.fileNumber || 0}
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
              label="File Details"
              value={1}
              onClick={() => navigate("file_details")}
            />
            <Tab
              label="Referral Information"
              value={2}
              onClick={() => navigate("referral_information")}
            />
            <Tab
              label="Incident Report"
              value={3}
              onClick={() => navigate("incident_report")}
            />
            <Tab
              label="Present Concerns"
              value={4}
              onClick={() => navigate("present_concerns")}
            />
            <Tab
              label="Patient Care Information"
              value={5}
              onClick={() => navigate("patient_care_information")}
            />
            <Tab
              label="Contact Notes"
              value={6}
              onClick={() => navigate("contact_notes")}
            />
          </Tabs>
        </TabContext.Provider>
      </Box>
      <Box sx={{ height: 400, overflowY: "scroll" }}>
        <Routes>
          <Route path="*" element={<FileDetails />} />
          <Route path="file_details" element={<FileDetails />} />
          <Route
            path="referral_information"
            element={<ReferralInformation />}
          />
          <Route path="incident_report" element={<IncidentReport />} />
          <Route path="present_concerns" element={<PresentConcerns />} />
          <Route
            path="patient_care_information"
            element={<PatientCareInformation />}
          />
          <Route path="contact_notes" element={<ContactNotes />} />
        </Routes>
      </Box>
      <Popup children={<Router />} />
    </AuthLayout>
  );
};

export default View;
