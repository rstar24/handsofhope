import "../../styles/App.css";
import React, { ReactElement, useState } from "react";
import Popup from "../../components/Popup";
import { useAppSelector } from "../../library/hooks";
import CPAHeader from "../../components/cpa/CPAHeader";
import AuthLayout from "../../components/auth/layout/AuthLayout";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import CPA from "../../components/cpa/view/CPA";
import Router from "../../components/nestedRouters/CPA";
import EditIcon from "../../components/cpa/EditIcon";
import Participant from "../../components/cpa/view/Participant";
import Attachments from "../../components/cpa/view/Attachments";
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

function tabPanelProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const View = (): ReactElement => {
  const state = useAppSelector((state) => state);
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        document.getElementById("CPA")?.scrollIntoView();
        document.getElementById("CPA")?.focus();
        break;
      case 1:
        document.getElementById("referralInformation")?.scrollIntoView();
        document.getElementById("referralInformation")?.focus();
        break;
      case 2:
        document.getElementById("participant")?.scrollIntoView();
        document.getElementById("participant")?.focus();
        break;
    }
  };
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
          Reference Id: {state.cpa.data.referenceId}
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
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          bgcolor: "background.paper",
          boxShadow: `inset 1px 0 black,
                      inset -1px 0 black`,
        }}
      >
        <Tabs
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="InitialContact view navigation tabs"
        >
          <Tab label="Cultural Program or Activity" {...tabPanelProps(0)} />
          <Tab label="Participants" {...tabPanelProps(1)} />
          <Tab label="Attachments" {...tabPanelProps(2)} />
        </Tabs>
      </Box>
      <div id="CPA" className="highlight" tabIndex={0}>
        <CPA />
      </div>
      <div id="participant" className="highlight" tabIndex={2}>
        <Typography variant="h6" sx={styles.header}>
          Participant
        </Typography>
        <Participant />
      </div>
      <div id="participant" className="highlight" tabIndex={2}>
        <Typography variant="h6" sx={styles.header}>
          Attachments
        </Typography>
        <Attachments />
      </div>

      <Popup children={<Router />} />
    </AuthLayout>
  );
};

export default View;
