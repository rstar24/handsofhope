import Box from "@mui/material/Box";
import Footer from "./Footer";
import Header from "./Header";
import type { ReactElement, ReactNode } from "react";

/**
 * The Layout functional component.
 * @returns Layout component skeleton.
 */
export const Layout = (props: {
  children: ReactNode | ReactNode[];
}): ReactElement => {
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
