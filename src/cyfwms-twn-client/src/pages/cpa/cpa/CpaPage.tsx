import Header from "../../../components/Header";
import Popup from "../../../components/Popup";
import AuthLayout from "../../../components/auth/layout/AuthLayout";
import Router from "../../../components/routers/CpaRouter";
import {
  doGetCPACulturalStatus,
  doGetCPACulturalType,
} from "../../../features/codetable/slice";
import { clean as cleanAttachments } from "../../../features/cpa/attachments/slice";
import { cleanState as cleanCulturalProgramActivity } from "../../../features/cpa/culturalProgramActivity/slice";
import { cleanState as cleanParticipant } from "../../../features/cpa/participant/slice";
import { setOpen as setOpenPopup } from "../../../features/popupSlice";
import { useAppDispatch } from "../../../library/hooks";
import { Box, Button } from "@mui/material";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import type { FC } from "react";

/**
 * `CpaPage` is *CPA* aka \
 * *Cultural Programmes and Activities* module main page.
 */
const CpaPage: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Load all the code tables:
    dispatch(doGetCPACulturalType());
    dispatch(doGetCPACulturalStatus());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthLayout>
      <Header bannerTitle="Cultural Programs and Activities" />
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
            to="/cpa/add_cpa"
            sx={{
              background: "lightgrey",
              color: "black",
              border: "1px solid black",
              height: "63px",
            }}
            onClick={() => {
              dispatch(cleanCulturalProgramActivity(null));
              dispatch(cleanParticipant(null));
              dispatch(cleanAttachments(null));
              dispatch(setOpenPopup(true));
            }}
          >
            Add a Cultural Program or Activity
          </Button>
          <Button
            component={Link}
            to="/cpa/search"
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
            Search for a Cultural Program or Activity
          </Button>
        </Box>
      </Box>
      <Popup children={<Router />} />
    </AuthLayout>
  );
};

export default CpaPage;
