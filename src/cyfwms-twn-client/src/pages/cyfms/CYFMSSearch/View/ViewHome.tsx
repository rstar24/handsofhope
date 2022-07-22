import { Box, Typography } from "@mui/material";
import React from "react";
import { useAppSelector } from "../../../../library/hooks";
import ViewContact from "./ViewContact";
import ViewCouncelors from "./ViewCouncelors";
import ViewCriminalHistory from "./ViewCriminalHistory";
import ViewEducationAndEmployment from "./ViewEducationAndEmployment";
import ViewFamilyPhysician from "./ViewFamilyPhysician";
import ViewHouseholdMembers from "./ViewHouseholdMembers";
import ViewOtherInformation from "./ViewOtherInformation";
import { RegisterLabels } from "./ViewPagesLabels";

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
  const data = useAppSelector((state) => state as any);

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
          {Object.entries(data.cyfmsRegister.readUser).map((t: any, k: any) => (
            <Box
              sx={{
                display: "flex",
                paddingLeft: 8,
              }}
            >
              {k !== 0 && (
                <>
                  <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
                    <Typography variant="h6" style={styles.keys}>
                      {RegisterLabels[k]}
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
        <ViewContact />
      </Box>

      <Box>
        <Typography variant="h6" style={styles.header}>
          Household Members
        </Typography>
        <ViewHouseholdMembers />
      </Box>
      <Box>
        <Typography variant="h6" style={styles.header}>
          Education and Employment
        </Typography>
        <ViewEducationAndEmployment />
      </Box>
      <Box>
        <Typography variant="h6" style={styles.header}>
          Criminal History
        </Typography>
        <ViewCriminalHistory />
      </Box>
      <Box>
        <Typography variant="h6" style={styles.header}>
          Family Physician
        </Typography>
        <ViewFamilyPhysician />
      </Box>
      <Box>
        <Typography variant="h6" style={styles.header}>
          Counselor / CFS Worker
        </Typography>
        <ViewCouncelors />
      </Box>
      <Box>
        <Typography variant="h6" style={styles.header}>
          Other Information
        </Typography>
        <ViewOtherInformation />
      </Box>
    </Box>
  );
};

export default ViewHome;
