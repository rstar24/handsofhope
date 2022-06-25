import { Box } from "@mui/material";
import Footer from "../../layout/Footer";
import Header from "./Header";
import type { ReactElement, ReactNode } from "react";

/**
 * The Layout functional component.
 * Will be visible just to logged-in/authorized user.
 * @example
 * ```tsx
 * <Layout>...</Layout>
 * // OR
 * <Layout />
 * ```
 * @returns Layout component skeleton.
 */
export const Layout = (props: {
  children: ReactNode | ReactNode[];
}): ReactElement => {
  return (
    <Box
      sx={{
        border: "5px solid black",
        mx: { xs: "", md: "5rem" },
        my: { xs: "", md: "1rem" },
      }}
    >
      <Header />
      {props.children}
      <Footer />
    </Box>
  );
};

export default Layout;
