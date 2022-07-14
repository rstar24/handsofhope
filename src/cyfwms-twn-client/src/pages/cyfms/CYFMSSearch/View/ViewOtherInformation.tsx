import React from "react";
import { Box, Typography } from "@mui/material";
import { useAppSelector } from "../../../../library/hooks";
const ViewOtherInformation = () => {
  const data = useAppSelector((state) => state as any);
  return (
    <Box sx={{ paddingLeft: "15%", borderBottom: 1, borderColor: "divider" }}>
      {Object.entries(data.otherInformation.readUser).map((t: any, k) => (
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
  );
};

export default ViewOtherInformation;
