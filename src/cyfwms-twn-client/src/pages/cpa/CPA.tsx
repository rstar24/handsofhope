import Popup from "../../components/Popup";
import AuthLayout from "../../components/auth/layout/AuthLayout";
import Router from "../../components/nestedRouters/CPA";
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
import CPAHeader from "../../components/cpa/CPAHeader";
/**
 * The CPA functional component.
 * @returns CPA component skeleton.
 */
const CPA = (): ReactElement => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const state = useAppSelector((state) => state.popup.open);

  useEffect(() => {
    if (location.pathname === "/cpa" || location.pathname === "/cpa/") {
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
      <CPAHeader />
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
            to="/cpa/cultural_program_activity"
            sx={{
              background: "lightgrey",
              color: "black",
              border: "1px solid black",
            }}
            onClick={() => {
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

export default CPA;
