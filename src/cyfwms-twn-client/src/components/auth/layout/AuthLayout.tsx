import { Box } from "@mui/material";
import { useAppSelector } from "../../../library/hooks";
import Footer from "../../layout/Footer";
import Header from "./AuthHeader";
import React from "react";
import type { ReactElement, ReactNode } from "react";
import { Navigate } from "react-router-dom";

/**
 * The `AuthLayout` functional component makes sure
 * that the user is logged-in. If not, then redirect
 * them to the respective login page.
 * @example
 * ```tsx
 * <AuthLayout>...</AuthLayout>
 * // OR
 * <AuthLayout />
 * ```
 * @returns `AuthLayout` component skeleton.
 */
const AuthLayout = (props: {
  children: ReactNode | ReactNode[];
}): ReactElement => {
  // Select login state from store:
  const isLoggedIn: boolean = useAppSelector((state) => {
    return state.login.isLoggedIn;
  });
  // If not logged-in, then redirect:
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }
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

export default AuthLayout;
