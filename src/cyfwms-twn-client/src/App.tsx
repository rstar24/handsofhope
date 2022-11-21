import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { persistor, store } from "./library/store";
import theme from "./library/theme";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound404 from "./pages/NotFound404";
import Calendar_ from "./pages/Calendar/Calendar_";
import CpaPage from "./pages/cpa/cpa/CpaPage"; // where, cpa = Cultural Programs and Activities
import CpaSearchPage from "./pages/cpa/search/SearchPage";
import CpaViewPage from "./pages/cpa/view/ViewPage";
import CyfmsPage from "./pages/cyfms/cyfms/CyfmsPage"; // where, cyfms = Child, Youth and Family Management Services
import CyfmsSearchPage from "./pages/cyfms/search/SearchPage";
import CyfmsViewPage from "./pages/cyfms/view/ViewPage";
import IcPage from "./pages/ic/ic/IcPage"; // where, ic = Initial Contact
import IcSearchPage from "./pages/ic/search/SearchPage";
import IcViewPage from "./pages/ic/view/ViewPage";
import CgPage from "./pages/cg/cg/CgPage"; // where, cg = Caregivers
import CgSearchPage from "./pages/cg/search/SearchPage";
import CgViewPage from "./pages/cg/view/ViewPage";
import { ThemeProvider } from "@mui/material/styles";
import React, { StrictMode } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import type { FC } from "react";

/**
 * `App` is primary router of CYFWMS application.
 * @returns `ReactElement`
 */
const App: FC = () => {
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
                <Route path="cyfms/*" element={<CyfmsPage />} />
                <Route path="cyfms/search/*" element={<CyfmsSearchPage />} />
                <Route path="cyfms/view/*" element={<CyfmsViewPage />} />
                <Route path="initial_contact/*" element={<IcPage />} />
                <Route
                  path="initial_contact/search/*"
                  element={<IcSearchPage />}
                />
                <Route path="initial_contact/view/*" element={<IcViewPage />} />
                <Route path="cpa/*" element={<CpaPage />} />
                <Route path="cpa/search/*" element={<CpaSearchPage />} />
                <Route path="cpa/view/*" element={<CpaViewPage />} />
                <Route path="cg/*" element={<CgPage />} />
                <Route path="/cg/search/*" element={<CgSearchPage />} />
                <Route path="cg/view/*" element={<CgViewPage />} />
                <Route path="calendar/*" element={<Calendar_ />} />
              </Routes>
            </BrowserRouter>
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </StrictMode>
  );
};

export default App;
