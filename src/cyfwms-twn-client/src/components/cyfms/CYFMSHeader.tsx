import { Box, Typography } from "@mui/material";
import React from "react";
import type { ReactElement } from "react";

/**
 * The CYFMSHeader functional component.
 * @returns CYFMSHeader component skeleton.
 */
const CYFMSHeader = (): ReactElement => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box
        component="img"
        src="/img/heartInCircle.svg"
        height={75}
        width={75}
      />
      <Typography component="h2">Child, Youth, and Family Members</Typography>
    </Box>
  );
};

export default CYFMSHeader;
