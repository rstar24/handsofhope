import Box from "@mui/material/Box";
import Footer from "./Footer";
import Header from "./Header";
import React from "react";
import type { FC, PropsWithChildren } from "react";

/**
 * `Layout` is layout of non-authorized pages.
 * @param props
 * @example
 * ```jsx
 * <Layout>...</Layout>
 * // OR
 * <Layout children={} />
 * ```
 */
const Layout: FC<PropsWithChildren> = (props) => {
  return (
    <Box
      sx={{
        border: "5px solid black",
        mx: { xs: 0, md: "5rem" },
        my: { xs: 0, md: "1rem" },
        boxShadow: `inset 1px 1px black,
                    inset -1px -1px black`,
      }}
    >
      <Header />
      {props.children}
      <Footer />
    </Box>
  );
};

export default Layout;
