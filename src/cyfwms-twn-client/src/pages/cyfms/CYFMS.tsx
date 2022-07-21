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
import { useAppDispatch } from "../../library/hooks";
import { Box, Button } from "@mui/material";
import React, { createContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import type { ReactElement } from "react";

export const PopupContext = createContext<{
  open: boolean;
  setOpen: (open: boolean) => void;
}>({
  open: false,
  setOpen: (open) => {},
});

/**
 * The CYFMS functional component.
 * @returns CYFMS component skeleton.
 */
const CYFMS = (): ReactElement => {
  const dispatch = useAppDispatch();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const location = useLocation();
  useEffect(() => {
    if (location.state === true) {
      setOpen(true);
    }

    // Load all the code tables:
    dispatch(doGetGender());
    dispatch(doGetMaritalStatus());
    dispatch(doGetRole());
    dispatch(doGetEducation());
    dispatch(doGetTypeOfEmployee());
  }, []);

  return (
    <AuthLayout>
      <PopupContext.Provider value={{ open: open, setOpen: setOpen }}>
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
              Search for a Child, Youth, or Family Member
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
      </PopupContext.Provider>
    </AuthLayout>
  );
};

export default CYFMS;
