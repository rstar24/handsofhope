import { Box, Typography } from "@mui/material";
import React from "react";
import type { ReactElement } from "react";

/**
 * The ICHeader functional component.
 * @returns ICHeader component skeleton.
 */
const ICHeader = (): ReactElement => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box component="img" src="/img/flower.svg" height={75} width={75} />
      <Typography component="h2">Initial Contact</Typography>
    </Box>
  );
};

export default ICHeader;
