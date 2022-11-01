import Popup from "../../components/Popup";
import AuthLayout from "../../components/auth/layout/AuthLayout";
import CYFMSHeader from "../../components/cyfms/CYFMSHeader";
import Router from "../../components/nestedRouters/CYFMS";
import {
  doGetEducation,
  doGetGender,
  doGetMaritalStatus,
  doGetProvince,
  doGetRole,
  doGetTypeOfEmployee,
} from "../../features/codetable/slice";
import { setOpen as setOpenPopup } from "../../features/popupSlice";
import { useAppDispatch, useAppSelector } from "../../library/hooks";
import { Box, Button } from "@mui/material";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import type { ReactElement } from "react";
import { useLocation } from "react-router-dom";
import { setOpen } from "../../features/popupSlice";
import { setCalendarView } from "../../features/calendar/slice";
/**
 * The CYFMS functional component.
 * @returns CYFMS component skeleton.
 */
const CYFMS = (): ReactElement => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const state = useAppSelector((state) => state.popup.open);

  useEffect(() => {
    if (location.pathname === "/cyfms" || location.pathname === "/cyfms/") {
      dispatch(setOpen(false));
    }
    // Load all the code tables:
    dispatch(doGetGender());
    dispatch(doGetProvince());
    dispatch(doGetMaritalStatus());
    dispatch(doGetRole());
    dispatch(doGetEducation());
    dispatch(doGetTypeOfEmployee());
  }, []);

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
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              textAlign: "center",
            }}
            onClick={() => {
              dispatch(setOpenPopup(true));
              dispatch(setCalendarView(false))
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
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              textAlign: "center",
            }}
          >
            Search for a Child, Youth, or Family Member
          </Button>
        </Box>
      </Box>
      <Popup children={<Router />} />
    </AuthLayout>
  );
};

export default CYFMS;
