import { Box, Typography } from "@mui/material";
import React from "react";
import type { ReactElement } from "react";

/**
 * The CYFMSHeader functional component.
 * @returns CYFMSHeader component skeleton.
 */
const CYFMSHeader = (): ReactElement => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "0 0.5rem",
        p: "0.5rem",
      }}
    >
      <Box
        component="img"
        src="/img/logo-encircled.png"
        height={75}
        width={75}
      />
      <Typography component="h2">Child, Youth, and Family Members</Typography>
    </Box>
  );
};

export default CYFMSHeader;
