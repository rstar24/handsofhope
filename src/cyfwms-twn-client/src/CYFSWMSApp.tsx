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
import CYFMSContact from "./pages/cyfms/CYFMSContact";
import CYFMSEducationAndEmployment from "./pages/cyfms/CYFMSEducationAndEmployment";
import CYFMSHouseholdMembers from "./pages/cyfms/CYFMSHouseholdMembers";
import CYFMSOther from "./pages/cyfms/CYFMSOther";
import CYFMSRegister from "./pages/cyfms/CYFMSRegister";
import CYFMSSearch from "./pages/cyfms/CYFMSSearch";
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
                <Route path="other" element={<CYFMSOther />} />
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
