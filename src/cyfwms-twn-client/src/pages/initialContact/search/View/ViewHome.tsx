import { Box, Typography } from "@mui/material";
import React from "react";
import { useAppSelector } from "../../../../library/hooks";
import ViewReferralInformation from "./ViewReferralInformation";
import ViewIncidentReport from "./ViewIncidentReport";
import ViewPresentConcerns from "./ViewPresentConcerns";
import ViewPatientCareInformation from "./ViewPatientCareInformation";
import { FileDetailsLabels } from "./ViewPagesLabels";
import ViewFileDetails from "./ViewFileDetails";

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
const ViewHome = () => {
  const state = useAppSelector((state) => state);

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
          File Details -
        </Typography>
      </Box>

      <Box>
        <Typography variant="h6" style={styles.header}>
          File Detail
        </Typography>
        <ViewFileDetails />
      </Box>
      <Box>
        <Typography variant="h6" style={styles.header}>
          Referral Information
        </Typography>
        <ViewReferralInformation />
      </Box>
      <Box>
        <Typography variant="h6" style={styles.header}>
          Incident Report
        </Typography>
        <ViewIncidentReport />
      </Box>
      <Box>
        <Typography variant="h6" style={styles.header}>
          Present Concerns
        </Typography>
        <ViewPresentConcerns />
      </Box>
      <Box>
        <Typography variant="h6" style={styles.header}>
          Patient Care Information
        </Typography>
        <ViewPatientCareInformation />
      </Box>
    </Box>
  );
};

export default ViewHome;
