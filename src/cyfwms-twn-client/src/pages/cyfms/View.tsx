import Popup from "../../components/Popup";
import AuthLayout from "../../components/auth/layout/AuthLayout";
import CYFMSHeader from "../../components/cyfms/CYFMSHeader";
import EditIcon from "../../components/cyfms/EditIcon";
import Router from "../../components/nestedRouters/CYFMS";
import { useAppSelector } from "../../library/hooks";
import ViewContact from "./CYFMSSearch/View/ViewContact";
import ViewCouncelors from "./CYFMSSearch/View/ViewCouncelors";
import ViewCriminalHistory from "./CYFMSSearch/View/ViewCriminalHistory";
import ViewEducationAndEmployment from "./CYFMSSearch/View/ViewEducationAndEmployment";
import ViewFamilyPhysician from "./CYFMSSearch/View/ViewFamilyPhysician";
import ViewHome from "./CYFMSSearch/View/ViewHome";
import ViewHouseholdMembers from "./CYFMSSearch/View/ViewHouseholdMembers";
import ViewOtherInformation from "./CYFMSSearch/View/ViewOtherInformation";
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
      <CYFMSHeader />
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
            <Typography variant="h5" fontWeight={500} paddingTop={0.3}>
              {state.cyfmsRegister.data.firstname} <></>
              {state.cyfmsRegister.data.surname}
            </Typography>
          </Box>
          <Box>
            <Typography paddingRight={1}>
              <EditIcon value={state.cyfmsRegister.data.participantId} />
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
        >
          <Box
            sx={{ borderRadius: 0, flexBasis: 2, flexGrow: 1, p: 0 }}
            component="img"
            src="/img/profile1.png"
            height={200}
            width={200}
          ></Box>
          <Box
            sx={{
              borderRadius: 0,
              flexBasis: 0,
              flexGrow: 3,
              ml: 2,
              paddingLeft: 5,
            }}
          >
            <Typography variant="h5" paddingTop={2}>
              {state.cyfmsRegister.data.firstname} <></>
              {state.cyfmsRegister.data.surname}
            </Typography>
            <hr></hr>
            <Typography paddingTop={2}>
              {state.cyfmsContact.data.addressLine1}
              {state.cyfmsContact.data.addressLine1 &&
              state.cyfmsContact.data.city
                ? ","
                : ""}
              {state.cyfmsContact.data.city}
              {state.cyfmsContact.data.province && state.cyfmsContact.data.city
                ? ","
                : ""}{" "}
              {state.cyfmsContact.data.province}{" "}
            </Typography>
            <br />
            <Typography>{state.cyfmsRegister.data.gender} </Typography>
            <br />
            <Typography>
              Born : {state.cyfmsRegister.data.dateOfBirth} <></>
            </Typography>
          </Box>
        </Box>
        <Box sx={{ width: "100%" }}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
            }}
          >
            <Tabs
              variant="scrollable"
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
              <Tab label="Contact" {...tabPanelProps(1)} />
              <Tab label="Household Members" {...tabPanelProps(2)} />
              <Tab label="Education and Employment" {...tabPanelProps(3)} />
              <Tab label="Criminal History" {...tabPanelProps(4)} />
              <Tab label="Family Physician" {...tabPanelProps(5)} />
              <Tab label="Counselor/ CFS Worker" {...tabPanelProps(6)} />
              <Tab label="Other Information" {...tabPanelProps(7)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <ViewHome />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <ViewContact />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <ViewHouseholdMembers />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <ViewEducationAndEmployment />
          </TabPanel>
          <TabPanel value={value} index={4}>
            <ViewCriminalHistory />
          </TabPanel>
          <TabPanel value={value} index={5}>
            <ViewFamilyPhysician />
          </TabPanel>
          <TabPanel value={value} index={6}>
            <ViewCouncelors />
          </TabPanel>
          <TabPanel value={value} index={7}>
            <ViewOtherInformation />
          </TabPanel>
        </Box>{" "}
      </Box>
      <Popup children={<Router />} />
    </AuthLayout>
  );
};

export default View;
