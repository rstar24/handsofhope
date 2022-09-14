import "../../styles/App.css";
import { ReactElement, useState } from "react";
import Popup from "../../components/Popup";
import { useAppSelector } from "../../library/hooks";
import CPAHeader from "../../components/cpa/CPAHeader";
import AuthLayout from "../../components/auth/layout/AuthLayout";
import { Box, Typography } from "@mui/material";
import CPA from "../../components/cpa/view/CPA";
import Router from "../../components/nestedRouters/CPA";
import EditIcon from "../../components/cpa/EditIcon";
export const styles = {
  header: {
    fontWeight: 1000,
    backgroundColor: "#ededed",
    px: "1rem",
    boxShadow: `inset 1px 0px black,
    inset -1px 0px black`,
  },
  keys: {
    variant: "h6",
    fontWeight: 600,
    fontSize: 16,
  },
};

const View = (): ReactElement => {
  const state = useAppSelector((state) => state);
  return (
    <AuthLayout>
      <CPAHeader />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "#d7d3d354",
          px: "1rem",
        }}
      >
        <Typography variant="h5" alignSelf="center">
          Cultural Program ID: {state.cpa.data.culturalProgramId}
        </Typography>
        <Typography>
          <EditIcon value={state.cpa.data.culturalProgramId} />
        </Typography>
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          bgcolor: "background.paper",
          boxShadow: `inset 1px 0 black,
                      inset -1px 0 black`,
        }}
      ></Box>
      <div id="fileDetails" className="highlight" tabIndex={0}>
        <CPA />
      </div>

      <Popup children={<Router />} />
    </AuthLayout>
  );
};

export default View;
