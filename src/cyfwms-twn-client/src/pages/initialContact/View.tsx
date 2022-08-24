import "../../styles/App.css";
import Popup from "../../components/Popup";
import AuthLayout from "../../components/auth/layout/AuthLayout";
import ICHeader from "../../components/initialContact/ICHeader";
import EditIcon from "../../components/initialContact/EditIcon";
import FileDetails from "../../components/initialContact/view/FileDetails";
import IncidentReport from "../../components/initialContact/view/IncidentReport";
import PatientCareInformation from "../../components/initialContact/view/PatientCareInformation";
import PresentConcerns from "../../components/initialContact/view/PresentConcerns";
import ReferralInformation from "../../components/initialContact/view/ReferralInformation";
import Router from "../../components/nestedRouters/InitialContact";
import { useAppSelector } from "../../library/hooks";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import React from "react";
import type { ReactElement } from "react";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

//TabPanel function return selected tabPanel
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

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
        document.getElementById("fileDetails")?.scrollIntoView();
        document.getElementById("fileDetails")?.focus();
        break;
      case 1:
        document.getElementById("referralInformation")?.scrollIntoView();
        document.getElementById("referralInformation")?.focus();
        break;
      case 2:
        document.getElementById("incidentReport")?.scrollIntoView();
        document.getElementById("incidentReport")?.focus();
        break;
      case 3:
        document.getElementById("presentConcerns")?.scrollIntoView();
        document.getElementById("presentConcerns")?.focus();
        break;
      case 4:
        document.getElementById("patientCareInformation")?.scrollIntoView();
        document.getElementById("patientCareInformation")?.focus();
        break;
    }
  };

  return (
    <AuthLayout>
      <ICHeader />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "#d7d3d354",
          px: "1rem",
        }}
      >
        <Typography variant="h5" alignSelf="center">
          File Number: {state.icFileDetails.data.fileNumber}
        </Typography>
        <Typography>
          <EditIcon value={state.icFileDetails.data.fileDetailsId} />
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
      >
        <Tabs
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="InitialContact view navigation tabs"
        >
          <Tab label="File Details" {...tabPanelProps(0)} />
          <Tab label="Referral Information" {...tabPanelProps(1)} />
          <Tab label="Incident Report" {...tabPanelProps(2)} />
          <Tab label="Present Concerns" {...tabPanelProps(3)} />
          <Tab label="Patient Care Information" {...tabPanelProps(4)} />
        </Tabs>
      </Box>
      <div id="fileDetails" className="highlight" tabIndex={0}>
        <Typography variant="h6" sx={styles.header}>
          File Details
        </Typography>
        <FileDetails />
      </div>
      <div id="referralInformation" className="highlight" tabIndex={1}>
        <Typography variant="h6" sx={styles.header}>
          Referral Information
        </Typography>
        <ReferralInformation />
      </div>
      <div id="incidentReport" className="highlight" tabIndex={2}>
        <Typography variant="h6" sx={styles.header}>
          Incident Report
        </Typography>
        <IncidentReport />
      </div>
      <div id="presentConcerns" className="highlight" tabIndex={3}>
        <Typography variant="h6" sx={styles.header}>
          Present Concerns
        </Typography>
        <PresentConcerns />
      </div>
      <div id="patientCareInformation" className="highlight" tabIndex={5}>
        <Typography variant="h6" sx={styles.header}>
          Patient Care Information
        </Typography>
        <PatientCareInformation />
      </div>
      <Popup children={<Router />} />
    </AuthLayout>
  );
};

export default View;
