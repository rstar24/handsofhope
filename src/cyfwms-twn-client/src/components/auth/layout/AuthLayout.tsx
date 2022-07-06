import { Box } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../library/hooks";
import Footer from "../../layout/Footer";
import Header from "./AuthHeader";
import React, { useEffect } from "react";
import type { ReactElement, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import {
  setIsLoggedInTrue,
  setIsLoggedInFalse,
} from "../../../features/login/loginSlice";

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
  const dispatch = useAppDispatch();
  // Select login state from store:
  const isLoggedIn: boolean = useAppSelector((state) => {
    return state.login.isLoggedIn;
  });

  useEffect(() => {
    if (sessionStorage.getItem("token") != null) {
      dispatch(setIsLoggedInTrue());
      console.log(sessionStorage.getItem("token"));
    } else {
      dispatch(setIsLoggedInFalse());
      // <Navigate to="/login" />;
    }
  }, []);

  // If not logged-in, then redirect:
  // if (!isLoggedIn) {
  //   return <Navigate to="/login" />;
  // }
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
