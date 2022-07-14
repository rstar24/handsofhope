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
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound404 from "./pages/NotFound404";
import CYFMSSearch from "./pages/cyfms/CYFMSSearch";
import React, { StrictMode } from "react";
import type { ReactElement } from "react";
import CYFMSSearchPanel from "./pages/cyfms/CYFMSSearchPanel";
import InitialContact from "./pages/initialContact/InitialContact";
import ICSearchPanel from "./pages/initialContact/ICSearchPanel";
import ICFileDetails from "./pages/initialContact/ICFileDetails";
import ICREferralInformation from "./pages/initialContact/ICReferralInformation";
import CYFMSSearchView from "./pages/cyfms/CYFMSSearchView";

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
              <Route path="cyfms/*" element={<CYFMS />} />
              <Route path="cyfms/search" element={<CYFMSSearchPanel />} />
              <Route path="cyfms/search/*" element={<CYFMSSearchView />} />
              <Route path="initial_contact/*" element={<InitialContact />} />
              <Route
                path="/initial_contact/search"
                element={<ICSearchPanel />}
              />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    </StrictMode>
  );
};

export default CYFSWMSApp;
