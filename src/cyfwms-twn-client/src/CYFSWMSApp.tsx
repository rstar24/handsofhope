import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { ThemeProvider } from "@mui/material/styles";
import { Provider } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { store } from "./library/store";
import theme from "./library/theme";
import CYFMS from "./pages/cyfms/CYFMS";
import CYFMSFamilyPhysician from "./pages/cyfms/CYFMSFamilyPhysician";
import CYFMSContact from "./pages/cyfms/CYFMSContact";
import CYFMSCriminalHistory from "./pages/cyfms/CYFMSCriminalHistory";
import CYFMSEducationAndEmployment from "./pages/cyfms/CYFMSEducationAndEmployment";
import CYFMSHouseholdMembers from "./pages/cyfms/CYFMSHouseholdMembers";
import CYFMSOtherInformation from "./pages/cyfms/CYFMSOtherInformation";
import CYFMSRegister from "./pages/cyfms/CYFMSRegister";
import CYFMSSearch from "./pages/cyfms/CYFMSSearch";
import CYFMSWorker from "./pages/cyfms/CYFMSWorker";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound404 from "./pages/NotFound404";
import React, { StrictMode } from "react";
import type { ReactElement } from "react";

const CYFSWMSApp = (): ReactElement => {
  return (
    <StrictMode>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Routes>
              <Route path="*" element={<NotFound404 />} />
              <Route path="/" element={<Navigate to="login" />} />
              <Route path="home" element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route path="cyfms">
                <Route path="" element={<CYFMS />} />
                <Route path="register" element={<CYFMSRegister />} />
                <Route path="contact" element={<CYFMSContact />} />
                <Route
                  path="household_members"
                  element={<CYFMSHouseholdMembers />}
                />
                <Route
                  path="education_and_employment"
                  element={<CYFMSEducationAndEmployment />}
                />
                <Route
                  path="criminal_history"
                  element={<CYFMSCriminalHistory />}
                />
                <Route
                  path="family_physician"
                  element={<CYFMSFamilyPhysician />}
                />
                <Route path="cyfms_worker" element={<CYFMSWorker />} />
                <Route
                  path="other_information"
                  element={<CYFMSOtherInformation />}
                />
                <Route path="search" element={<CYFMSSearch />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    </StrictMode>
  );
};

export default CYFSWMSApp;
