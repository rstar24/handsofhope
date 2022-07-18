import React from "react";
import { Box, Typography } from "@mui/material";
import { useAppSelector } from "../../../../library/hooks";
import { styles } from "./ViewHome";
import { CouncelorsLabel } from "./ViewPagesLabels";
const ViewCouncelors = () => {
  const data = useAppSelector(
    (state) => (state as any).cyfmsCounselors.counselorsData
  );
  return (
    <Box paddingTop={3}>
      {Object.keys(data.recordsList).map((i: any) => (
        <>
          <Typography paddingTop={2} paddingLeft={4}>
            Counselors/ CFS Worker {i}
          </Typography>
          <Box>
            {Object.entries(data.recordsList[i]).map((t: any, k) => (
              <Box
                sx={{
                  display: "flex",
                  paddingLeft: 8,
                }}
              >
                {k !== 0 && k !== 1 && (
                  <>
                    <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
                      <Typography variant="h6" style={styles.keys}>
                        {CouncelorsLabel[k]}
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
        </>
      ))}
    </Box>
  );
};

export default ViewCouncelors;
