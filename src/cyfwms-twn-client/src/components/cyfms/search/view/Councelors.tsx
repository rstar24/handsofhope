import { useAppSelector } from "../../../../library/hooks";
import { CouncelorsLabel } from "../../../../library/labels/cyfms";
import { styles } from "./Home";
import { Box, Typography } from "@mui/material";
import React from "react";
import type { ReactElement } from "react";

const Councelors = (): ReactElement => {
  const data = useAppSelector((state) => state.cyfmsCounselors.data);

  return (
    <Box paddingTop={1}>
      {Object.keys(data.recordsList).map((i: any) => (
        <>
          {data.recordsList[0].participantId > 0 && (
            <Typography paddingTop={2} paddingLeft={4}>
              Counselors/ CFS Worker {Number(i) + 1}
            </Typography>
          )}
          <Box>
            {Object.entries(data.recordsList[i]).map((t: any, k) => (
              <Box
                maxHeight={30}
                sx={{
                  display: "flex",
                  paddingLeft: 8,
                }}
              >
                {t[1] === "" || t[1] === "0001-01-01" ? (
                  <></>
                ) : (
                  <>
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

export default Councelors;
