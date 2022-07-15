import React from "react";
import { Box, Typography } from "@mui/material";
import { useAppSelector } from "../../../../library/hooks";
import { styles } from "./ViewHome";
const ViewHouseholdMembers = () => {
  const data = useAppSelector((state) => state as any).cyfmsHouseholdMembers
    .householdMembersData;

  return (
    <>
      {Object.keys(data.recordsList).map((i: any) => (
        <>
          <Typography style={styles.header}>Member {i}</Typography>
          <Box>
            {Object.entries(data.recordsList[i]).map((t: any, k: any) => (
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  paddingLeft: 8,
                }}
              >
                {k !== 0 && k !== 1 && (
                  <>
                    <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
                      <Typography
                        variant="h6"
                        textTransform="capitalize"
                        style={styles.keys}
                      >
                        {t[0]}
                      </Typography>
                    </Box>

                    <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
                      <Typography
                        variant="h6"
                        textTransform="capitalize"
                        style={styles.values}
                      >
                        {t[1]}
                      </Typography>
                    </Box>
                  </>
                )}
              </Box>
            ))}
          </Box>
        </>
      ))}
    </>
  );
};

export default ViewHouseholdMembers;
