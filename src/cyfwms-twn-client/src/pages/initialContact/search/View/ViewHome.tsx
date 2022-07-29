import { Box, Typography } from "@mui/material";
import React from "react";
import { useAppSelector } from "../../../../library/hooks";
import ViewReferralInformation from "./ViewReferralInformation";
import ViewIncidentReport from "./ViewIncidentReport";
import ViewPresentConcerns from "./ViewPresentConcerns";
import ViewPatientCareInformation from "./ViewPatientCareInformation";
import { FileDetailsLabels } from "./ViewPagesLabels";

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
          Person Details -
        </Typography>
      </Box>

      <Box>
        <Typography variant="h6" style={styles.header}>
          Registration
        </Typography>
        <Box paddingTop={3}>
          {Object.entries(state.cyfmsRegister.data).map((t: any, k: any) => (
            <Box
              maxHeight={30}
              sx={{
                display: "flex",
                paddingLeft: 8,
              }}
            >
              {t[1] === "" ? (
                <></>
              ) : (
                <>
                  <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
                    <Typography variant="h6" style={styles.keys}>
                      {FileDetailsLabels[k]}
                    </Typography>
                  </Box>
                  <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
                    <Typography variant="h6" style={styles.values}>
                      {t[1]}
                    </Typography>
                  </Box>
                </>
              )}
            </Box>
          ))}
        </Box>
      </Box>
      <Box>
        <Typography variant="h6" style={styles.header}>
          Contact
        </Typography>
        <ViewReferralInformation />
      </Box>
      <Box>
        <Typography variant="h6" style={styles.header}>
          Household Members
        </Typography>
        <ViewIncidentReport />
      </Box>
      <Box>
        <Typography variant="h6" style={styles.header}>
          Education and Employment
        </Typography>
        <ViewPresentConcerns />
      </Box>
      <Box>
        <Typography variant="h6" style={styles.header}>
          Criminal History
        </Typography>
        <ViewPatientCareInformation />
      </Box>
    </Box>
  );
};

export default ViewHome;
