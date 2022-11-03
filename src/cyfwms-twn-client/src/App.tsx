import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { persistor, store } from "./library/store";
import theme from "./library/theme";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound404 from "./pages/NotFound404";
import CPA from "./pages/cpa/CPA"; // where, cpa = Cultural Programs and Activities
import CpaSearch from "./pages/cpa/search/Search";
import CpaView from "./pages/cpa/view/View";
import CYFMS from "./pages/cyfms/CYFMS"; // where, cyfms = Child, Youth and Family Management Services
import CyfmsSearch from "./pages/cyfms/search/Search";
import CyfmsView from "./pages/cyfms/view/View";
import InitialContact from "./pages/initialContact/InitialContact"; // where, ic = Initial Contact
import IcSearch from "./pages/initialContact/Search";
import IcView from "./pages/initialContact/view/View";
import CG from "./pages/cg/cg/CG"; // where, cg = Caregivers
import CgSearch from "./pages/cg/search/Search";
// import CgView from "./pages/cg/view/View";
import { ThemeProvider } from "@mui/material/styles";
import React, { StrictMode } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import type { FC } from "react";
import Calendar_ from "./pages/Calendar/Calendar_";
import View from "./pages/cg/view/View";
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
                <Route path="cyfms/*" element={<CYFMS />} />
                <Route path="cyfms/search/*" element={<CyfmsSearch />} />
                <Route path="cyfms/view/*" element={<CyfmsView />} />
                <Route path="initial_contact/*" element={<InitialContact />} />
                <Route path="initial_contact/search/*" element={<IcSearch />} />
                <Route path="initial_contact/view/*" element={<IcView />} />
                <Route path="cpa/*" element={<CPA />} />
                <Route path="cpa/search/*" element={<CpaSearch />} />
                <Route path="cpa/view/*" element={<CpaView />} />
                <Route path="cg/*" element={<CG />} />
                <Route path="/cg/search/*" element={<CgSearch />} />
                <Route path="cg/view/*" element={<View />} />
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
