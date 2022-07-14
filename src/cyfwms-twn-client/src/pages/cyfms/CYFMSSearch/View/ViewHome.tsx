import { Box, Typography } from "@mui/material";
import React from "react";
import { useAppSelector } from "../../../../library/hooks";

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
      <Box sx={{ paddingLeft: 2 }}>
        <Typography variant="h5" fontWeight={1000}>
          Person Details -
        </Typography>
      </Box>

      <Box
        sx={{
          paddingLeft: "20%",
          borderBottom: 2,
          borderColor: "divider",
          paddingTop: 4,
          justifyContent: "center",
        }}
      >
        <Typography variant="h6" fontWeight={1000}>
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
                  <Typography variant="h6" fontWeight={600} fontSize={15}>
                    {t[0]}
                  </Typography>
                </Box>
                <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
                  <Typography variant="h6" fontWeight={400} fontSize={15}>
                    {t[1]}
                  </Typography>
                </Box>
              </>
            )}
          </Box>
        ))}
      </Box>
      <Box
        sx={{
          paddingTop: 4,
          paddingLeft: "20%",
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <Typography variant="h6" fontWeight={1000}>
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
                  <Typography variant="h6" fontWeight={600} fontSize={15}>
                    {t[0]}
                  </Typography>
                </Box>
                <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
                  <Typography variant="h6" fontWeight={400} fontSize={15}>
                    {t[1]}
                  </Typography>
                </Box>
              </>
            )}
          </Box>
        ))}
      </Box>
      <Box
        sx={{
          paddingTop: 4,
          paddingLeft: "20%",
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <Typography variant="h6" fontWeight={1000}>
          Household Members
        </Typography>
      </Box>
      <Box
        sx={{
          paddingTop: 4,
          paddingLeft: "20%",
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <Typography variant="h6" fontWeight={1000}>
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
                    <Typography variant="h6" fontWeight={600} fontSize={15}>
                      {t[0]}
                    </Typography>
                  </Box>
                  <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
                    <Typography variant="h6" fontWeight={400} fontSize={15}>
                      {t[1]}
                    </Typography>
                  </Box>
                </>
              )}
            </Box>
          )
        )}
      </Box>
      <Box sx={{ paddingLeft: "20%", borderBottom: 1, borderColor: "divider" }}>
        <Typography variant="h6" fontWeight={1000}>
          Criminal History
        </Typography>
        {Object.entries(data.criminalHistory.readUser).map((t: any, k) => (
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
                  <Typography variant="h6" fontWeight={600} fontSize={15}>
                    {t[0]}
                  </Typography>
                </Box>
                <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
                  <Typography variant="h6" fontWeight={400} fontSize={15}>
                    {t[1]}
                  </Typography>
                </Box>
              </>
            )}
          </Box>
        ))}
      </Box>
      <Box sx={{ paddingLeft: "20%", borderBottom: 1, borderColor: "divider" }}>
        <Typography variant="h6" fontWeight={1000}>
          Family Physician
        </Typography>
      </Box>
      <Box sx={{ paddingLeft: "20%", borderBottom: 1, borderColor: "divider" }}>
        <Typography variant="h6" fontWeight={1000}>
          Counselor / CFS Worker
        </Typography>
      </Box>
      <Box sx={{ paddingLeft: "20%", borderBottom: 1, borderColor: "divider" }}>
        <Typography variant="h6" fontWeight={1000}>
          Other Information
        </Typography>
        {Object.entries(data.otherInformation.readUser).map((t: any, k) => (
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
                  <Typography variant="h6" fontWeight={600} fontSize={15}>
                    {t[0]}
                  </Typography>
                </Box>
                <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
                  <Typography variant="h6" fontWeight={400} fontSize={15}>
                    {t[1]}
                  </Typography>
                </Box>
              </>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ViewHome;
