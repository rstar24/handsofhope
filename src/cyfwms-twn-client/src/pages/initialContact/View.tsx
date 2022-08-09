import Popup from "../../components/Popup";
import AuthLayout from "../../components/auth/layout/AuthLayout";
import ICHeader from "../../components/initialContact/ICHeader";
import EditIcon from "../../components/initialContact/EditIcon";
import Router from "../../components/nestedRouters/InitialContact";
import { useAppSelector } from "../../library/hooks";
import FileDetails from "../../components/initialContact/search/view/FileDetails";
import Home from "../../components/initialContact/search/view/Home";
import IncidentReport from "../../components/initialContact/search/view/IncidentReport";
import PatientCareInformation from "../../components/initialContact/search/view/PatientCareInformation";
import PresentConcerns from "../../components/initialContact/search/view/PresentConcerns";
import ReferralInformation from "../../components/initialContact/search/view/ReferralInformation";
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
  };

  return (
    <AuthLayout>
      <ICHeader />
      <Box
        component="form"
        sx={{
          justifyContent: "center",
        }}
      >
        <Box
          component="form"
          paddingLeft={2}
          boxShadow={2}
          sx={{
            display: "flex",
            textAlign: "center",
            justifyContent: "space-between",
            backgroundColor: "#ededed",
            background: "#d7d3d354",
            maxHeight: "10vh",
          }}
        >
          <Box>
            <Typography variant="h6" fontWeight={500} paddingTop={0.3}>
              Reference ID -{" "}
              {state.icFileDetails.data.initialContactReferenceId} <></>
            </Typography>
          </Box>
          <Box>
            <Typography paddingRight={1}>
              <EditIcon value={state.icFileDetails.data.fileDetailsId} />
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            justifyContent: "center",
            display: "flex",
            flexDirection: "row",
            background: "#d7d3d354",
            maxHeight: "100vh",
          }}
        ></Box>
        <Box sx={{ width: "100%" }}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
            }}
          >
            <Tabs
              variant="fullWidth"
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              sx={{
                maxWidth: "100%",
                minWidth: 100,
                backgroundColor: "white",
              }}
            >
              <Tab label="Home" {...tabPanelProps(0)} />
              <Tab label="File Details" {...tabPanelProps(1)} />
              <Tab label="Referral Information" {...tabPanelProps(2)} />
              <Tab label="Incident Report" {...tabPanelProps(3)} />
              <Tab label="Present Concerns" {...tabPanelProps(4)} />
              <Tab label="Patient Care Information" {...tabPanelProps(5)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <Home />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <FileDetails />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <ReferralInformation />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <IncidentReport />
          </TabPanel>
          <TabPanel value={value} index={4}>
            <PresentConcerns />
          </TabPanel>
          <TabPanel value={value} index={5}>
            <PatientCareInformation />
          </TabPanel>
        </Box>{" "}
      </Box>
      <Popup children={<Router />} />
    </AuthLayout>
  );
};

export default View;
