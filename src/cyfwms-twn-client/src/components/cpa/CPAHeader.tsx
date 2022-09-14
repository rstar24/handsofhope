import { Box, Typography } from "@mui/material";
import React from "react";
import type { ReactElement } from "react";

/**
 * The CPAHeader functional component.
 * @returns CPAHeader component skeleton.
 */
const CPAHeader = (): ReactElement => {
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
      <Typography component="h2">Cultural Programs and Activities</Typography>
    </Box>
  );
};

export default CPAHeader;
