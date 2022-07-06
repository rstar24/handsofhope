import AuthLayout from "../../components/auth/layout/AuthLayout";
import CYFMSHeader from "../../components/cyfms/CYFMSHeader";
import CYFMSPopup from "../../components/cyfms/CYFMSPopup";
import {
  doGetEducation,
  doGetGender,
  doGetMaritalStatus,
  doGetRole,
  doGetTypeOfEmployee,
} from "../../features/codetable/codetableSlice";
import { doGetContact } from "../../features/contact/contactSlice";
import { doGetRegister } from "../../features/register/registerSlice";
import { useAppDispatch, useAppSelector } from "../../library/hooks";
import { Box, Button } from "@mui/material";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import type { ReactElement } from "react";

/**
 * The CYFMS functional component.
 * @returns CYFMS component skeleton.
 */
const CYFMS = (): ReactElement => {
  const dispatch = useAppDispatch();
  const { participantId } = useAppSelector(
    (state) => (state as any).registration
  );

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const registrationHandler = () => {
    dispatch(doGetRegister(participantId));
    dispatch(doGetGender());
    dispatch(doGetMaritalStatus());
    dispatch(doGetRole());
    dispatch(doGetEducation());
    dispatch(doGetTypeOfEmployee());
    dispatch(doGetContact(participantId));
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
            onClick={() => {
              handleOpen();
              registrationHandler();
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
            onClick={handleOpen}
          >
            Search a Child, Youth, or Family Member
          </Button>
        </Box>
      </Box>
      <CYFMSPopup
        open={open}
        onClose={(event, reason) => {
          switch (reason) {
            case "backdropClick":
              return;
            case "escapeKeyDown":
              handleClose();
          }
        }}
        children={<></>}
      />
    </AuthLayout>
  );
};

export default CYFMS;
