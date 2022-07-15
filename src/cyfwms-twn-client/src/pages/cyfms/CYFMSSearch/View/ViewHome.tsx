import { Box, Typography } from "@mui/material";
import React from "react";
import { useAppSelector } from "../../../../library/hooks";

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

      <Box
        sx={{
          paddingTop: 4,
        }}
      >
        <Typography variant="h6" style={styles.header}>
          Registration
        </Typography>
        {Object.entries(data.cyfmsRegister.readUser).map((t: any, k) => (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              paddingLeft: 8,
              paddingTop: 1,
            }}
          >
            {k !== 0 && (
              <>
                <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
                  <Typography textTransform="capitalize" style={styles.keys}>
                    {t[0]}
                  </Typography>
                </Box>
                <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
                  <Typography style={styles.values}>{t[1]}</Typography>
                </Box>
              </>
            )}
          </Box>
        ))}
      </Box>
      <Box
        sx={{
          paddingTop: 4,
        }}
      >
        <Typography variant="h6" style={styles.header}>
          Contact
        </Typography>
        {Object.entries(data.cyfmsContact.contactData).map((t: any, k) => (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              paddingLeft: 8,
              paddingTop: 1,
            }}
          >
            {k !== 0 && k !== 1 && (
              <>
                <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
                  <Typography textTransform="capitalize" style={styles.keys}>
                    {t[0]}
                  </Typography>
                </Box>
                <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
                  <Typography style={styles.values}>{t[1]}</Typography>
                </Box>
              </>
            )}
          </Box>
        ))}
      </Box>
      <Box
        sx={{
          paddingTop: 4,
        }}
      >
        <Typography variant="h6" style={styles.header}>
          Household Members
        </Typography>
        <>
          {Object.keys(
            data.cyfmsHouseholdMembers.householdMembersData.recordsList
          ).map((i: any) => (
            <Box paddingTop="2%">
              <Typography paddingLeft="10%">Member {i}</Typography>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                {Object.entries(
                  data.cyfmsHouseholdMembers.householdMembersData.recordsList[i]
                ).map((t: any, k: any) => (
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
            </Box>
          ))}
        </>
      </Box>
      <Box
        sx={{
          paddingTop: 4,
        }}
      >
        <Typography variant="h6" style={styles.header}>
          Education and Employment
        </Typography>
        {Object.entries(data.educationAndEmployment.readUser).map(
          (t: any, k) => (
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                paddingLeft: 8,
                paddingTop: 1,
              }}
            >
              {k !== 0 && k !== 4 && k !== 5 && (
                <>
                  <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
                    <Typography textTransform="capitalize" style={styles.keys}>
                      {t[0]}
                    </Typography>
                  </Box>
                  <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
                    <Typography style={styles.values}>{t[1]}</Typography>
                  </Box>
                </>
              )}
            </Box>
          )
        )}
      </Box>
      <Box>
        <Typography variant="h6" style={styles.header}>
          Criminal History
        </Typography>
      </Box>
      <Box>
        <Typography variant="h6" style={styles.header}>
          Family Physician
        </Typography>
        <Box paddingTop={3}>
          {Object.keys(
            data.cyfmsFamilyPhysicians.familyPhysiciansData.recordsList
          ).map((i: any) => (
            <>
              <Typography paddingLeft="10%">Family Physician {i}</Typography>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                {Object.entries(
                  data.cyfmsFamilyPhysicians.familyPhysiciansData.recordsList[i]
                ).map((t: any, k: any) => (
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
        </Box>
      </Box>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Typography variant="h6" style={styles.header}>
          Counselor / CFS Worker
        </Typography>
        <Box paddingTop={3}>
          {Object.keys(data.cyfmsCounselors.counselorsData.recordsList).map(
            (i: any) => (
              <>
                <Typography paddingLeft="10%">
                  Councelor/ CFS Worker {i}
                </Typography>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  {Object.entries(
                    data.cyfmsCounselors.counselorsData.recordsList[i]
                  ).map((t: any, k: any) => (
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
            )
          )}
        </Box>
      </Box>
      <Box>
        <Typography variant="h6" style={styles.header}>
          Other Information
        </Typography>
        {Object.entries(data.cyfmsOtherInformation.otherInformationData).map(
          (t: any, k) => (
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",

                paddingLeft: 8,
                paddingTop: 1,
              }}
            >
              {k !== 1 && (
                <>
                  <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
                    <Typography textTransform="capitalize" style={styles.keys}>
                      {t[0]}
                    </Typography>
                  </Box>
                  <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
                    <Typography style={styles.values}>{t[1]}</Typography>
                  </Box>
                </>
              )}
            </Box>
          )
        )}
      </Box>
    </Box>
  );
};

export default ViewHome;
