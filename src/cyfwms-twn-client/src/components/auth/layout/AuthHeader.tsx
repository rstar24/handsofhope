import { Box, Typography } from "@mui/material";
import React from "react";
import type { ReactElement } from "react";
import Navbar from "./Navbar";

/**
 * The Header functional component.
 * @returns Header component skeleton.
 */
const Header = (): ReactElement => {
  return (
    <>
      <Box
        sx={{
          borderBottom: "5px solid black",
          boxShadow: `inset 1px 1px black,
                      inset -1px -1px black`,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" component="h1">
            Child, Youth, and Family Services
          </Typography>
          <Box
            component="img"
            src="/logo.png"
            sx={{ mx: "1rem", mb: "1rem", width: "100px" }}
          />
          <Typography variant="h5" component="h1">
            Wellness Management System
          </Typography>
        </Box>
        <Box sx={{ mt: -5 }}>
          <Navbar />
        </Box>
      </Box>
    </>
  );
};

export default Header;
