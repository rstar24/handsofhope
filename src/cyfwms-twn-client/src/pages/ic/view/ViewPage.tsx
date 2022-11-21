import Header from "../../../components/Header";
import Popup from "../../../components/Popup";
import AuthLayout from "../../../components/auth/layout/AuthLayout";
import EditIcon from "../../../components/initialContact/EditIcon";
import AppointmentsViewPage from "./AppointmentsViewPage";
import AttachmentsViewPage from "./AttachmentsViewPage";
import ContactNotesViewPage from "./ContactNotesViewPage";
import FileDetailsViewPage from "./FileDetailsViewPage";
import IncidentReportViewPage from "./IncidentReportViewPage";
import PatientCareInformationViewPage from "./PatientCareInformationViewPage";
import ParticipantsViewPage from "./ParticipantsViewPage";
import PresentConcernsViewPage from "./PresentConcernsViewPage";
import ReferralInformationViewPage from "./ReferralInformationViewPage";
import RemindersViewPage from "./RemindersViewPage";
import Router from "../../../components/routers/IcRouter";
import TabContext from "../../../contexts/view/TabContext";
import { useAppSelector } from "../../../library/hooks";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import React, { useContext } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import type { FC } from "react";

/**
 * *IC* aka *Initial Contact* module. \
 * `ViewPage` is *IC* modules' view page.
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
      <Header bannerTitle="Initial Contact" />
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
              label="Participants"
              value={6}
              onClick={() => navigate("participants")}
            />
            <Tab
              label="Contact Notes"
              value={7}
              onClick={() => navigate("contact_notes")}
            />
            <Tab
              label="Attachments"
              value={8}
              onClick={() => navigate("attachments")}
            />
            <Tab
              label="Appointments"
              value={9}
              onClick={() => navigate("appointment")}
            />
            <Tab
              label="Reminders"
              value={10}
              onClick={() => navigate("reminder")}
            />
          </Tabs>
        </TabContext.Provider>
      </Box>
      <Box sx={{ height: 400, overflowY: "scroll" }}>
        <Routes>
          <Route path="*" element={<FileDetailsViewPage />} />
          <Route path="file_details" element={<FileDetailsViewPage />} />
          <Route
            path="referral_information"
            element={<ReferralInformationViewPage />}
          />
          <Route path="incident_report" element={<IncidentReportViewPage />} />
          <Route
            path="present_concerns"
            element={<PresentConcernsViewPage />}
          />
          <Route
            path="patient_care_information"
            element={<PatientCareInformationViewPage />}
          />
          <Route path="participants" element={<ParticipantsViewPage />} />
          <Route path="contact_notes" element={<ContactNotesViewPage />} />
          <Route path="attachments" element={<AttachmentsViewPage />} />
          <Route path="appointment" element={<AppointmentsViewPage />} />
          <Route path="reminder" element={<RemindersViewPage />} />
        </Routes>
      </Box>
      <Popup children={<Router />} />
    </AuthLayout>
  );
};

export default ViewPage;
