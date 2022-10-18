import Header from "../../../components/Header";
import Popup from "../../../components/Popup";
import AuthLayout from "../../../components/auth/layout/AuthLayout";
import Router from "../../../components/nestedRouters/CG";
import { doGetCGStatus, doGetCGType } from "../../../features/codetable/slice";
import { setOpen as setOpenPopup } from "../../../features/popupSlice";
import { cleanState as cleanContactNotes } from "../../../features/cg/contactNotes/slice";
import { cleanState as cleanCaregiverState } from "../../../features/cg/caregivers/slice";
import { useAppDispatch } from "../../../library/hooks";
import { Box, Button } from "@mui/material";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import type { FC } from "react";

/**
 * `CG` aka `Caregivers` module main page.
 * @returns `ReactElement`
 */
const CG: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(doGetCGStatus())
    dispatch(doGetCGType())
  });

  const cleanStore = () => {
    dispatch(cleanContactNotes(null));
    dispatch(cleanCaregiverState(null));
    //dispatch(cleanProviderStatus(null));
  };

  return (
    <AuthLayout>
      <Header bannerTitle="Caregiver" />
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
            to="/cg/care_provider"
            sx={{
              background: "lightgrey",
              color: "black",
              border: "1px solid black",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              textAlign: "center",
            }}
            onClick={() => {
              cleanStore();
              dispatch(setOpenPopup(true));
            }}
          >
            Add Caregiver
          </Button>
          <Button
            component={Link}
            to="/cg/search"
            sx={{
              background: "lightgrey",
              color: "black",
              border: "1px solid black",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              textAlign: "center",
            }}
          >
            Search Caregivers
          </Button>
        </Box>
      </Box>
      <Popup children={<Router />} />
    </AuthLayout>
  );
};

export default CG;
