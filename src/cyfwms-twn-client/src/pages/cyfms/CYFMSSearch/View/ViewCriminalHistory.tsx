import React from "react";
import { Box, Typography } from "@mui/material";
import { useAppSelector } from "../../../../library/hooks";
import { styles } from "./ViewHome";
import {
  CriminalHistoryLabels,
  CriminalHistoryRecordLabels,
} from "./ViewPagesLabels";
const ViewCriminalHistory = () => {
  const data = useAppSelector(
    (state) => (state as any).cyfmsCriminalHistory.data
  );
  return (
    <>
      <Box paddingTop={1}>
        {Object.keys(data.criminalHistoryRecordList).map((i: any) => (
          <>
            {data.criminalHistoryRecordList[0].participantId !== 0 && (
              <Typography paddingTop={2} paddingLeft={4}>
                Criminal History {i}
              </Typography>
            )}
            <Box>
              {Object.entries(data.criminalHistoryRecordList[i]).map(
                (t: any, k) => (
                  <Box
                    sx={{
                      display: "flex",
                      paddingLeft: 8,
                    }}
                  >
                    {t[1] === "" ? (
                      <></>
                    ) : (
                      <>
                        {k !== 0 &&
                          k !== 5 &&
                          k !== 6 &&
                          k !== 7 &&
                          k !== 8 &&
                          k !== 9 &&
                          k !== 10 && (
                            <>
                              <Box sx={{ flexBasis: 0, flexGrow: 2 }}>
                                <Typography variant="h6" style={styles.keys}>
                                  {CriminalHistoryLabels[k]}
                                </Typography>
                              </Box>

                              <Box sx={{ flexBasis: 0, flexGrow: 2 }}>
                                <Typography variant="h6" style={styles.values}>
                                  {t[1]}
                                </Typography>
                              </Box>
                            </>
                          )}
                      </>
                    )}
                  </Box>
                )
              )}
            </Box>
          </>
        ))}
      </Box>
      <Box paddingTop={3}>
        {Object.entries(data).map((t: any, k: any) => (
          <Box
            maxHeight={40}
            sx={{
              display: "flex",
              paddingLeft: 8,
            }}
          >
            {t[1] === "" ? (
              <></>
            ) : (
              <>
                {k !== 0 && k !== 1 && k !== 2 && (
                  <>
                    <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
                      <Typography variant="h6" style={styles.keys}>
                        {CriminalHistoryRecordLabels[k]}
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
  );
};

export default ViewCriminalHistory;
