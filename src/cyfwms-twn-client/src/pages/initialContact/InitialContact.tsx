import Popup from "../../components/Popup";
import AuthLayout from "../../components/auth/layout/AuthLayout";
import ICHeader from "../../components/initialContact/ICHeader";
import Router from "../../components/nestedRouters/InitialContact";
import {
  doGetICMentalHealthOrSubstanceAbuse,
  doGetICPresentConcerns,
  doGetICReferral,
  doGetICRisk,
  doGetICStatus,
  doGetICTypeOfPatient,
} from "../../features/codetable/slice";
import { setOpen as setOpenPopup } from "../../features/popupSlice";
import { useAppDispatch } from "../../library/hooks";
import { Box, Button } from "@mui/material";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import type { ReactElement } from "react";

/**
 * The InitialContact functional component.
 * @returns InitialContact component skeleton.
 */
const InitialContact = (): ReactElement => {
  const dispatch = useAppDispatch();

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
              dispatch(setOpenPopup(true));
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
          >
            Search for an Initial Contact File
          </Button>
        </Box>
      </Box>
      <Popup children={<Router />} />
    </AuthLayout>
  );
};

export default InitialContact;
