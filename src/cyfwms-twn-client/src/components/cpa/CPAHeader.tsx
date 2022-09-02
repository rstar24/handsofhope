import { Box, Typography } from "@mui/material";
import React from "react";
import type { ReactElement } from "react";

/**
 * The CPAHeader functional component.
 * @returns CPAHeader component skeleton.
 */
const CPAHeader = (): ReactElement => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box component="img" src="/img/halfMoon.svg" height={75} width={75} />
      <Typography component="h2">“Cultural Programs and Activities</Typography>
    </Box>
  );
};

export default CPAHeader;
