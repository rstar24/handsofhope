import { Box } from "@mui/material";
import React from "react";
import type { ReactElement } from "react";

/**
 * The Header functional component.
 * @returns Header component skeleton.
 */
const Header = (): ReactElement => {
  return (
    <Box>
      <Box
        sx={{
          backgroundImage: "url('/img/top.png')",
          backgroundPosition: "top center",
          backgroundSize: "960px 100%",
          height: "222px",
          width: "100%",
        }}
      />
    </Box>
  );
};

export default Header;
