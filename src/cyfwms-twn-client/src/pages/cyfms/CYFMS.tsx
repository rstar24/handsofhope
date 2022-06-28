import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import AuthLayout from "../../components/auth/layout/AuthLayout";
import CYFMSHeader from "../../components/cyfms/CYFMSHeader";
import React from "react";
import type { ReactElement } from "react";
import { useAppDispatch, useAppSelector } from "../../library/hooks";
import { doGetRegister } from "../../features/register/registerSlice";
import {
  doGetGender,
  doGetMaritalStatus,
  doGetRole,
} from "../../features/codetable/codetableSlice";

/**
 * The CYFMS functional component.
 * @returns CYFMS component skeleton.
 */
const CYFMS = (): ReactElement => {
  const dispatch = useAppDispatch();
  const { participantId } = useAppSelector(
    (state) => (state as any).registration
  );

  const registrationHandler = () => {
    dispatch(doGetRegister(participantId));
    dispatch(doGetGender());
    dispatch(doGetMaritalStatus());
    dispatch(doGetRole());
  };
  return (
    <AuthLayout>
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
            onClick={registrationHandler}
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
    </AuthLayout>
  );
};

export default CYFMS;
