import "../../styles/App.css";
import Popup from "../../components/Popup";
import AuthLayout from "../../components/auth/layout/AuthLayout";
import CYFMSHeader from "../../components/cyfms/CYFMSHeader";
import EditIcon from "../../components/cyfms/EditIcon";
import Contact from "../../components/cyfms/view/Contact";
import Counselors from "../../components/cyfms/view/Counselors";
import CriminalHistory from "../../components/cyfms/view/CriminalHistory";
import EducationAndEmployment from "../../components/cyfms/view/EducationAndEmployment";
import FamilyPhysicians from "../../components/cyfms/view/FamilyPhysicians";
import HouseholdMembers from "../../components/cyfms/view/HouseholdMembers";
import OtherInformation from "../../components/cyfms/view/OtherInformation";
import Register from "../../components/cyfms/view/Register";
import Router from "../../components/nestedRouters/CYFMS";
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
  panel: {
    padding: "1rem 0",
  },
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
  values: {
    variant: "h6",
    fontWeight: 400,
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
        document.getElementById("register")?.scrollIntoView();
        document.getElementById("register")?.focus();
        break;
      case 1:
        document.getElementById("contact")?.scrollIntoView();
        document.getElementById("contact")?.focus();
        break;
      case 2:
        document.getElementById("householdMembers")?.scrollIntoView();
        document.getElementById("householdMembers")?.focus();
        break;
      case 3:
        document.getElementById("educationAndEmployment")?.scrollIntoView();
        document.getElementById("educationAndEmployment")?.focus();
        break;
      case 4:
        document.getElementById("criminalHistory")?.scrollIntoView();
        document.getElementById("criminalHistory")?.focus();
        break;
      case 5:
        document.getElementById("familyPhysicians")?.scrollIntoView();
        document.getElementById("familyPhysicians")?.focus();
        break;
      case 6:
        document.getElementById("counselors")?.scrollIntoView();
        document.getElementById("counselors")?.focus();
        break;
      case 7:
        document.getElementById("otherInformation")?.scrollIntoView();
        document.getElementById("otherInformation")?.focus();
        break;
    }
  };

  return (
    <AuthLayout>
      <CYFMSHeader />
      <Box
        sx={{
          display: "flex",
          background: "#d7d3d354",
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h5" alignSelf="center">
              {`${state.cyfmsRegister.data.firstname} ${state.cyfmsRegister.data.surname}`}
            </Typography>
            <Typography>
              <EditIcon value={state.cyfmsRegister.data.participantId} />
            </Typography>
          </Box>
          <hr />
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
          aria-label="CYFMS view navigation tabs."
        >
          <Tab label="Registration" {...tabPanelProps(0)} />
          <Tab label="Contact" {...tabPanelProps(1)} />
          <Tab label="Household Members" {...tabPanelProps(2)} />
          <Tab label="Education and Employment" {...tabPanelProps(3)} />
          <Tab label="Criminal History" {...tabPanelProps(4)} />
          <Tab label="Family Physician" {...tabPanelProps(5)} />
          <Tab label="Counselor/ CFS Worker" {...tabPanelProps(6)} />
          <Tab label="Other Information" {...tabPanelProps(7)} />
        </Tabs>
      </Box>
      <div id="register" className="highlight" tabIndex={0}>
        <Typography variant="h6" sx={styles.header}>
          Registration
        </Typography>
        <Register />
      </div>
      <div id="contact" className="highlight" tabIndex={1}>
        <Typography variant="h6" sx={styles.header}>
          Contact
        </Typography>
        <Contact />
      </div>
      <div id="householdMembers" className="highlight" tabIndex={2}>
        <Typography variant="h6" sx={styles.header}>
          Household Members
        </Typography>
        <HouseholdMembers />
      </div>
      <div id="educationAndEmployment" className="highlight" tabIndex={3}>
        <Typography variant="h6" sx={styles.header}>
          Education and Employment
        </Typography>
        <EducationAndEmployment />
      </div>
      <div id="criminalHistory" className="highlight" tabIndex={4}>
        <Typography variant="h6" sx={styles.header}>
          Criminal History
        </Typography>
        <CriminalHistory />
      </div>
      <div id="familyPhysicians" className="highlight" tabIndex={5}>
        <Typography variant="h6" sx={styles.header}>
          Family Physician
        </Typography>
        <FamilyPhysicians />
      </div>
      <div id="counselors" className="highlight" tabIndex={6}>
        <Typography variant="h6" sx={styles.header}>
          Counselor / CFS Worker
        </Typography>
        <Counselors />
      </div>
      <div id="otherInformation" className="highlight" tabIndex={7}>
        <Typography variant="h6" sx={styles.header}>
          Other Information
        </Typography>
        <OtherInformation />
      </div>
      <Popup children={<Router />} />
    </AuthLayout>
  );
};

export default View;
