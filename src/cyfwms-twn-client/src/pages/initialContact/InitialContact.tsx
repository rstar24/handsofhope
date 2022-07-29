import AuthLayout from "../../components/auth/layout/AuthLayout";
import ICHeader from "../../components/initialContact/ICHeader";
import ICPopup from "../../components/initialContact/ICPopup";
import { Box, Button } from "@mui/material";
import React, { createContext, useEffect } from "react";
import { Link } from "react-router-dom";
import type { ReactElement } from "react";
import { useAppDispatch } from "../../library/hooks";
import {
  doGetICMentalHealthOrSubstanceAbuse,
  doGetICPresentConcerns,
  doGetICReferral,
  doGetICRisk,
  doGetICStatus,
  doGetICTypeOfPatient,
} from "../../features/codetable/codetableSlice";

export const PopupContext = createContext<{
  open: boolean;
  setOpen: (open: boolean) => void;
}>({
  open: false,
  setOpen: (open) => {},
});

/**
 * The InitialContact functional component.
 * @returns InitialContact component skeleton.
 */
const InitialContact = (): ReactElement => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    // Load all the code tables:
    dispatch(doGetICStatus());
    dispatch(doGetICReferral());
    dispatch(doGetICRisk());
    dispatch(doGetICTypeOfPatient());
    dispatch(doGetICMentalHealthOrSubstanceAbuse());
    dispatch(doGetICPresentConcerns());
  }, []);
  return (
    <AuthLayout>
      <PopupContext.Provider value={{ open: open, setOpen: setOpen }}>
        <ICHeader />
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
              to="/initial_contact/file_details"
              sx={{
                background: "lightgrey",
                color: "black",
                border: "1px solid black",
              }}
              onClick={() => {
                handleOpen();
                //registrationHandler();
              }}
            >
              Add an Initial Contact File
            </Button>
            <Button
              component={Link}
              to="/initial_contact/search"
              sx={{
                background: "lightgrey",
                color: "black",
                border: "1px solid black",
              }}
              onClick={handleOpen}
            >
              Search for an Initial Contact File
            </Button>
          </Box>
        </Box>
        <ICPopup
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

export default InitialContact;
