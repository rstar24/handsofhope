import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { persistor, store } from "./library/store";
import theme from "./library/theme";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound404 from "./pages/NotFound404";
import CYFMS from "./pages/cyfms/CYFMS";
import CYFMSSearch from "./pages/cyfms/Search";
import CYFMSView from "./pages/cyfms/View";
import InitialContact from "./pages/initialContact/InitialContact";
import InitialContactSearch from "./pages/initialContact/Search";
import InitialContactView from "./pages/initialContact/View";
import { ThemeProvider } from "@mui/material/styles";
import React, { StrictMode } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import type { ReactElement } from "react";

const App = (): ReactElement => {
  return (
    <StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider theme={theme}>
            <BrowserRouter>
              <Routes>
                <Route path="*" element={<NotFound404 />} />
                <Route path="/" element={<Navigate to="login" />} />
                <Route path="home" element={<Home />} />
                <Route path="login" element={<Login />} />
                <Route path="cyfms/*" element={<CYFMS />} />
                <Route path="cyfms/search/*" element={<CYFMSSearch />} />
                <Route path="cyfms/view/*" element={<CYFMSView />} />
                <Route path="initial_contact/*" element={<InitialContact />} />
                <Route
                  path="initial_contact/search/*"
                  element={<InitialContactSearch />}
                />
                <Route
                  path="initial_contact/view/*"
                  element={<InitialContactView />}
                />
              </Routes>
            </BrowserRouter>
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </StrictMode>
  );
};

export default App;
