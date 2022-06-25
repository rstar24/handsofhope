import Box from "@mui/material/Box";
import Footer from "./Footer";
import Header from "./Header";
import React from "react";
import type { ReactElement, ReactNode } from "react";

/**
 * The Layout functional component.
 * @example
 * ```tsx
 * <Layout>...</Layout>
 * // OR
 * <Layout />
 * ```
 * @returns Layout component skeleton.
 */
const Layout = (props: { children: ReactNode | ReactNode[] }): ReactElement => {
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

export default Layout;
