import Popup from "../../../components/Popup";
import AuthLayout from "../../../components/auth/layout/AuthLayout";
import Header from "../../../components/Header";
import Router from "../../../components/routers/CyfmsRouter";
import { setCalendarView } from "../../../features/calendar/appointments/slice";
import { setOpen as setOpenPopup } from "../../../features/popupSlice";
import { useAppDispatch } from "../../../library/hooks";
import { handleEffect } from "./CyfmsPage_";
import { Box, Button } from "@mui/material";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import type { FC } from "react";

/**
 * `CyfmsPage` is *CYFMS* aka \
 * *Child, Youth, Family and Wellness Management System* \
 * module main page.
 */
const CyfmsPage: FC = () => {
  const dispatch = useAppDispatch();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => handleEffect(dispatch), []);

  return (
    <AuthLayout>
      <Header bannerTitle="Child, Youth, and Family Members" />
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
              dispatch(setCalendarView(false));
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

export default CyfmsPage;
