import { Box } from "@mui/material";
import type { ReactElement } from "react";

/**
 * The Footer functional component.
 * @returns Footer component skeleton.
 */
const Footer = (): ReactElement => {
  return (
    <Box>
      <Box
        sx={{
          backgroundImage: "url('/img/bottom.png')",
          backgroundPosition: "top center",
          backgroundSize: { xs: "960px 100%", md: "100% 100%" },
          height: "68px",
          width: "100%",
        }}
      />
    </Box>
  );
};

export default Footer;
