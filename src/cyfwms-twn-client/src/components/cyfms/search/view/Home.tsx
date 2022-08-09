import { useAppSelector } from "../../../../library/hooks";
import { RegisterLabels } from "../../../../library/labels/cyfms";
import Contact from "./Contact";
import Councelors from "./Councelors";
import CriminalHistory from "./CriminalHistory";
import EducationAndEmployment from "./EducationAndEmployment";
import FamilyPhysician from "./FamilyPhysician";
import HouseholdMembers from "./HouseholdMembers";
import OtherInformation from "./OtherInformation";
import { Box, Typography } from "@mui/material";
import React from "react";
import type { ReactElement } from "react";

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

const Home = (): ReactElement => {
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
          Person Details
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
        <Contact />
      </Box>
      <Box>
        <Typography variant="h6" style={styles.header}>
          Household Members
        </Typography>
        <HouseholdMembers />
      </Box>
      <Box>
        <Typography variant="h6" style={styles.header}>
          Education and Employment
        </Typography>
        <EducationAndEmployment />
      </Box>
      <Box>
        <Typography variant="h6" style={styles.header}>
          Criminal History
        </Typography>
        <CriminalHistory />
      </Box>
      <Box>
        <Typography variant="h6" style={styles.header}>
          Family Physician
        </Typography>
        <FamilyPhysician />
      </Box>
      <Box>
        <Typography variant="h6" style={styles.header}>
          Counselor / CFS Worker
        </Typography>
        <Councelors />
      </Box>
      <Box>
        <Typography variant="h6" style={styles.header}>
          Other Information
        </Typography>
        <OtherInformation />
      </Box>
    </Box>
  );
};

export default Home;
