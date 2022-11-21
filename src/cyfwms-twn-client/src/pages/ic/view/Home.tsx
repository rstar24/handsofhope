import FileDetails from "./FileDetailsViewPage";
import IncidentReport from "./IncidentReportViewPage";
import PatientCareInformation from "./PatientCareInformationViewPage";
import PresentConcerns from "./PresentConcernsViewPage";
import ReferralInformation from "./ReferralInformationViewPage";
import { Box, Typography } from "@mui/material";
import React from "react";
import type { FC } from "react";

export const styles = {
  header: {
    fontWeight: 1000,
    fontFamily: "Helvetica Neue",
    backgroundColor: "#ededed",
  },
  keys: {
    variant: "h6",
    paddingLeft: "40%",
    fontFamily: "Helvetica Neue",
    fontWeight: 600,
    fontSize: 16,
  },
  values: {
    variant: "h6",
    paddingLeft: "40%",
    fontFamily: "Helvetica Neue",
    fontWeight: 400,
    fontSize: 16,
  },
};

const Home: FC = () => {
  return (
    <Box
      sx={{
        flexDirection: "column",
        display: "flex",
        flexWrap: "wrap",
        gap: "0 1rem",
      }}
    >
      <Box>
        <Typography variant="h5" fontWeight={1000} fontFamily="Helvetica Neue">
          File Details
        </Typography>
      </Box>

      <Box>
        <Typography variant="h6" style={styles.header}>
          File Detail
        </Typography>
        <FileDetails />
      </Box>
      <Box>
        <Typography variant="h6" style={styles.header}>
          Referral Information
        </Typography>
        <ReferralInformation />
      </Box>
      <Box>
        <Typography variant="h6" style={styles.header}>
          Incident Report
        </Typography>
        <IncidentReport />
      </Box>
      <Box>
        <Typography variant="h6" style={styles.header}>
          Present Concerns
        </Typography>
        <PresentConcerns />
      </Box>
      <Box>
        <Typography variant="h6" style={styles.header}>
          Patient Care Information
        </Typography>
        <PatientCareInformation />
      </Box>
    </Box>
  );
};

export default Home;
