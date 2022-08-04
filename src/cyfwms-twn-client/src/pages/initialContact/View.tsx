import Popup from "../../components/Popup";
import AuthLayout from "../../components/auth/layout/AuthLayout";
import ICHeader from "../../components/initialContact/ICHeader";
import EditIcon from "../../components/initialContact/EditIcon";
import Router from "../../components/nestedRouters/InitialContact";
import { useAppSelector } from "../../library/hooks";
import ViewFileDetails from "./search/View/ViewFileDetails";
import ViewHome from "./search/View/ViewHome";
import ViewIncidentReport from "./search/View/ViewIncidentReport";
import ViewPatientCareInformation from "./search/View/ViewPatientCareInformation";
import ViewPresentConcerns from "./search/View/ViewPresentConcerns";
import ViewReferralInformation from "./search/View/ViewReferralInformation";
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
            <ViewHome />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <ViewFileDetails />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <ViewReferralInformation />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <ViewIncidentReport />
          </TabPanel>
          <TabPanel value={value} index={4}>
            <ViewPresentConcerns />
          </TabPanel>
          <TabPanel value={value} index={5}>
            <ViewPatientCareInformation />
          </TabPanel>
        </Box>{" "}
      </Box>
      <Popup children={<Router />} />
    </AuthLayout>
  );
};

export default View;
