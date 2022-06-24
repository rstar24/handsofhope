import { Box } from "@mui/material";
import React from "react";
import type { ReactElement } from "react";

/**
 * The Footer functional component.
 * @returns Footer component skeleton.
 */
const Footer = (): ReactElement => {
  return (
    <Box>
      <Box
        component="img"
        src="/img/bottom.svg"
        sx={{ display: "block", width: "100%" }}
      />
    </Box>
  );
};

export default Footer;
