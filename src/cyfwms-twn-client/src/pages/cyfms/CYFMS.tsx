import React from 'react';
import { Box, Button } from "@mui/material";
import { Layout } from "../../components/auth/layout/Layout";
import { Link } from "react-router-dom";
import CYFMSHeader from "../../components/cyfms/CYFMSHeader";
import React from "react";
import type { ReactElement } from "react";

/**
 * The CYFMS functional component.
 * @returns CYFMS component skeleton.
 */
const CYFMS = (): ReactElement => {
  return (
    <>
      <CYFMSHeader />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          py: "3rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            maxWidth: 300,
            rowGap: "1rem",
          }}
        >
          <Button
            component={Link}
            to="/cyfms/register"
            sx={{
              background: "lightgrey",
              color: "black",
              border: "1px solid black",
            }}
          >
            Register a Child, Youth, or Family Member
          </Button>
          <Button
            component={Link}
            to="/cyfms/search"
            sx={{
              background: "lightgrey",
              color: "black",
              border: "1px solid black",
            }}
          >
            Search a Child, Youth, or Family Member
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default CYFMS;
