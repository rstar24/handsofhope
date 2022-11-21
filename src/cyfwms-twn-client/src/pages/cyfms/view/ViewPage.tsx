import Header from "../../../components/Header";
import Popup from "../../../components/Popup";
import AuthLayout from "../../../components/auth/layout/AuthLayout";
import EditIcon from "../../../components/cyfms/EditIcon";
import AppointmentsViewPage from "./AppointmentsViewPage";
import AttachmentsViewPage from "./AttachmentsViewPage";
import ContactViewPage from "./ContactViewPage";
import CounselorsViewPage from "./CounselorsViewPage";
import CriminalHistoryViewPage from "./CriminalHistoryViewPage";
import EducationAndEmploymentViewPage from "./EducationAndEmploymentViewPage";
import FamilyPhysiciansViewPage from "./FamilyPhysiciansViewPage";
import HouseholdMembersViewPage from "./HouseholdMembersViewPage";
import OtherInformationViewPage from "./OtherInformationViewPage";
import RegisterViewPage from "./RegisterViewPage";
import RemindersViewPage from "./RemindersViewPage";
import Router from "../../../components/routers/CyfmsRouter";
import TabContext from "../../../contexts/view/TabContext";
import { useAppSelector } from "../../../library/hooks";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import React, { useContext } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import type { FC } from "react";

/**
 * *CYFMS* aka *Child, Youth and Family Services* module. \
 * `ViewPage` is *CYFMS* modules' view page.
 */
const ViewPage: FC = () => {
  const navigate = useNavigate();
  const state = useAppSelector((state) => state);
  const tabContext = useContext(TabContext);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    tabContext.tabNumber = newValue;
  };

  return (
    <AuthLayout>
      <Header bannerTitle="Child, Youth, and Family Members" />
      <Box
        sx={{
          display: "flex",
          backgroundColor: "#d7d3d354",
          height: "210px",
        }}
      >
        <Box
          // flexBasis: 2,
          // flexGrow: 1,
          sx={{
            backgroundPosition: "center",
            marginLeft: "1rem",
            marginTop: "0.25rem",
            height: "200px",
            width: "200px",
            borderRadius: "100%",
            backgroundColor: "white",
            backgroundImage: state.cyfmsRegister.data.image
              ? `url(data:${state.cyfmsRegister.data.type};base64,${state.cyfmsRegister.data.image})`
              : "url('/img/profile1.png')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
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
        <TabContext.Provider value={{ tabNumber: 1 }}>
          <Tabs
            variant="scrollable"
            value={tabContext.tabNumber}
            onChange={handleChange}
            aria-label="CYFMS view navigation tabs"
          >
            <Tab
              label="Identity"
              value={1}
              onClick={() => navigate("register")}
            />
            <Tab
              label="Contact"
              value={2}
              onClick={() => navigate("contact")}
            />
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
            <Tab
              label="Attachments"
              value={9}
              onClick={() => navigate("attachments")}
            />
            <Tab
              label="Appointments"
              value={10}
              onClick={() => navigate("appointment")}
            />
            <Tab
              label="Reminders"
              value={11}
              onClick={() => navigate("reminders")}
            />
          </Tabs>
        </TabContext.Provider>
      </Box>
      <Box sx={{ height: 400, overflowY: "scroll" }}>
        <Routes>
          <Route path="*" element={<RegisterViewPage />} />
          <Route path="register" element={<RegisterViewPage />} />
          <Route path="contact" element={<ContactViewPage />} />
          <Route
            path="household_members"
            element={<HouseholdMembersViewPage />}
          />
          <Route
            path="education_and_employment"
            element={<EducationAndEmploymentViewPage />}
          />
          <Route
            path="criminal_history"
            element={<CriminalHistoryViewPage />}
          />
          <Route
            path="family_physicians"
            element={<FamilyPhysiciansViewPage />}
          />
          <Route path="counselors" element={<CounselorsViewPage />} />
          <Route
            path="other_information"
            element={<OtherInformationViewPage />}
          />
          <Route path="attachments" element={<AttachmentsViewPage />} />
          <Route path="appointment" element={<AppointmentsViewPage />} />
          <Route path="reminders" element={<RemindersViewPage />} />
        </Routes>
      </Box>
      <Popup children={<Router />} />
    </AuthLayout>
  );
};

export default ViewPage;
