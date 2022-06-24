import React from 'react';
import { Box } from "@mui/material";
import Footer from "./Footer";
import Header from "./Header";
import type { ReactChildren } from "../../shared/types";
import type { ReactElement } from "react";

/**
 * The Layout functional component.
 * @returns Layout component skeleton.
 */
export const Layout = (props: ReactChildren): ReactElement => {
  return (
    <Box
      sx={{
        border: "5px solid black",
        mx: { xs: 0, md: "5rem" },
        my: { xs: 0, md: "1rem" },
      }}
    >
      <Header />
      {props.children}
      <Footer />
    </Box>
  );
};
