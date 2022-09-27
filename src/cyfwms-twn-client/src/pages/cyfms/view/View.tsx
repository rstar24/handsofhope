import Popup from "../../../components/Popup";
import AuthLayout from "../../../components/auth/layout/AuthLayout";
import CYFMSHeader from "../../../components/cyfms/CYFMSHeader";
import EditIcon from "../../../components/cyfms/EditIcon";
import Contact from "../../../components/cyfms/view/Contact";
import Counselors from "../../../components/cyfms/view/Counselors";
import CriminalHistory from "../../../components/cyfms/view/CriminalHistory";
import EducationAndEmployment from "../../../components/cyfms/view/EducationAndEmployment";
import FamilyPhysicians from "../../../components/cyfms/view/FamilyPhysicians";
import HouseholdMembers from "../../../components/cyfms/view/HouseholdMembers";
import OtherInformation from "../../../components/cyfms/view/OtherInformation";
import Register from "../../../components/cyfms/view/Register";
import Router from "../../../components/nestedRouters/CYFMS";
import { useAppSelector } from "../../../library/hooks";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import React, { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import type { ReactElement } from "react";

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
};

const View = (): ReactElement => {
  const navigate = useNavigate();
  const state = useAppSelector((state) => state);
  const [tab, setTab] = useState(1);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  return (
    <AuthLayout>
      <CYFMSHeader />
      <Box
        sx={{
          display: "flex",
          backgroundColor: "#d7d3d354",
          height: "200px",
        }}
      >
        <Box
          sx={{
            borderRadius: "50%",
            flexBasis: 2,
            flexGrow: 1,
            p: "1rem 0 1rem 1rem",
          }}
          component="img"
          src={`data:${state.cyfmsRegister.data.type};base64,${state.cyfmsRegister.data.image}`}
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
              <EditIcon
                value={state.cyfmsRegister.data.participantId}
                referenceID={state.cyfmsRegister.data.referenceId || 0}
              />
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
          value={tab}
          onChange={handleChange}
          aria-label="CYFMS view navigation tabs"
        >
          <Tab
            label="Registration"
            value={1}
            onClick={() => navigate("register")}
          />
          <Tab label="Contact" value={2} onClick={() => navigate("contact")} />
          <Tab
            label="Household Members"
            value={3}
            onClick={() => navigate("household_members")}
          />
          <Tab
            label="Education and Employment"
            value={4}
            onClick={() => navigate("education_and_employment")}
          />
          <Tab
            label="Criminal History"
            value={5}
            onClick={() => navigate("criminal_history")}
          />
          <Tab
            label="Family Physician"
            value={6}
            onClick={() => navigate("family_physicians")}
          />
          <Tab
            label="Counselor/ CFS Worker"
            value={7}
            onClick={() => navigate("counselors")}
          />
          <Tab
            label="Other Information"
            value={8}
            onClick={() => navigate("other_information")}
          />
        </Tabs>
      </Box>
      <Box sx={{ height: 400, overflowY: "scroll" }}>
        <Routes>
          <Route path="*" element={<Register />} />
          <Route path="register" element={<Register />} />
          <Route path="contact" element={<Contact />} />
          <Route path="household_members" element={<HouseholdMembers />} />
          <Route
            path="education_and_employment"
            element={<EducationAndEmployment />}
          />
          <Route path="criminal_history" element={<CriminalHistory />} />
          <Route path="family_physicians" element={<FamilyPhysicians />} />
          <Route path="counselors" element={<Counselors />} />
          <Route path="other_information" element={<OtherInformation />} />
        </Routes>
      </Box>
      <Popup children={<Router />} />
    </AuthLayout>
  );
};

export default View;
