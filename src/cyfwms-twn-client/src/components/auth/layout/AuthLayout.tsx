import { Box } from "@mui/material";
import { useAppSelector } from "../../../library/hooks";
import Footer from "../../layout/Footer";
import Header from "./AuthHeader";
import React from "react";
import { Navigate } from "react-router-dom";
import type { ReactElement, ReactNode } from "react";

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
  const state = useAppSelector((state) => state.login);

  if (!state.isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <Box
      sx={{
        border: "5px solid black",
        mx: { xs: "", md: "5rem" },
        my: { xs: "", md: "1rem" },
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

export default AuthLayout;
