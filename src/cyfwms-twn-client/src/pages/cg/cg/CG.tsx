import Header from "../../../components/Header";
import Popup from "../../../components/Popup";
import AuthLayout from "../../../components/auth/layout/AuthLayout";
import Router from "../../../components/routers/CgRouter";
import {
  doGetCgBgCheckStatus,
  doGetCGStatus,
  doGetCGType,
  doGetProvince,
} from "../../../features/codetable/slice";
import { setOpen as setOpenPopup } from "../../../features/popupSlice";
import { cleanState as cleanContactNotes } from "../../../features/cg/contactNotes/slice";
import { cleanState as cleanCaregiverState } from "../../../features/cg/caregivers/slice";
import { useAppDispatch } from "../../../library/hooks";
import { Box, Button } from "@mui/material";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import type { FC } from "react";
import { clean as cleanCareproviderState } from "../../../features/cg/careProvider/slice";
import { clean as cleanAttachmentState } from "../../../features/cg/attachments/slice";
import { clean as cleanCapacityState } from "../../../features/cg/capacity/slice";
import { setCalendarView } from "../../../features/calendar/appointments/slice";

/**
 * `CG` aka `Caregivers` module main page.
 * @returns `ReactElement`
 */
const CG: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(doGetCGStatus());
    dispatch(doGetCGType());
    dispatch(doGetProvince());
    dispatch(doGetCgBgCheckStatus());
  });

  const cleanStore = () => {
    dispatch(cleanContactNotes(null));
    dispatch(cleanCaregiverState(null));
    dispatch(cleanCareproviderState(null));
    dispatch(cleanAttachmentState(null));
    dispatch(cleanCapacityState(null));
    dispatch(setCalendarView(false));
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
            Add A Caregiver
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
            Search for a Caregiver
          </Button>
        </Box>
      </Box>
      <Popup children={<Router />} />
    </AuthLayout>
  );
};

export default CG;
