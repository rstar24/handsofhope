import { cleanCodetableState } from "../../../features/codetable/slice";
import { clean as cleanCyfmsAttachmentsState } from "../../../features/cyfms/attachments/slice";
import { cleanState as cleanContactState } from "../../../features/cyfms/contact/slice";
import { cleanState as cleanCounselorsState } from "../../../features/cyfms/counselors/slice";
import { cleanState as cleanCriminalHistoryState } from "../../../features/cyfms/criminalHistory/slice";
import { cleanState as cleanEducationAndEmploymentState } from "../../../features/cyfms/educationAndEmployment/slice";
import { cleanState as cleanFamilyPhysiciansState } from "../../../features/cyfms/familyPhysicians/slice";
import { cleanState as cleanHouseholdMembersState } from "../../../features/cyfms/householdMembers/slice";
import { cleanState as cleanOtherInformationState } from "../../../features/cyfms/otherInformation/slice";
import { cleanState as cleanRegisterState } from "../../../features/cyfms/register/slice";
import { cleanState as cleanCYFMSSearchState } from "../../../features/cyfms/search/slice";
import { clean as cleanIcAttachmentsState } from "../../../features/initialContact/attachments/slice";
import { cleanState as cleanFileDetailsState } from "../../../features/initialContact/fileDetails/slice";
import { cleanState as cleanReferralInformationState } from "../../../features/initialContact/referralInformation/slice";
import { cleanState as cleanIncidentReportState } from "../../../features/initialContact/incidentReport/slice";
import { cleanState as cleanPresentConcernsState } from "../../../features/initialContact/presentConcerns/slice";
import { cleanState as cleanPatientCareInformationState } from "../../../features/initialContact/patientCareInformation/slice";
import { cleanState as cleanInitialContactSearchState } from "../../../features/initialContact/search/slice";
import { cleanState as cleanLoginState } from "../../../features/login/slice";
import { cleanState as cleanCulturalProgramActivity } from "../../../features/cpa/culturalProgramActivity/slice";
import { clean as cleanCPAAttachments } from "../../../features/cpa/attachments/slice";
import { cleanState as cleanCPAParticipant } from "../../../features/cpa/participant/slice";
import { clean as cleanCGCareProvider } from "../../../features/cg/careProvider/slice";
import { clean as cleanCGCapacity } from "../../../features/cg/capacity/slice";
import { cleanState as cleanNavbar } from "../../../features/navBarSlice";
import { setView } from "../../../features/popupSlice";
import {
  changeCalendarColor,
  changeHomeColor,
} from "../../../features/navBarSlice";
import { useAppDispatch, useAppSelector } from "../../../library/hooks";
import "./Navbar.css";
import { Box, Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import type { FC } from "react";

/**
 * `Navbar` is navigation panel in authorized layout.
 */
const Navbar: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { homeColor, calendarColor } = useAppSelector((state) => state.navBar);

  const handleClean = () => {
    dispatch(cleanCodetableState());
    // CYFMS
    dispatch(cleanRegisterState(null));
    dispatch(cleanContactState(null));
    dispatch(cleanCriminalHistoryState(null));
    dispatch(cleanEducationAndEmploymentState(null));
    dispatch(cleanHouseholdMembersState(null));
    dispatch(cleanFamilyPhysiciansState(null));
    dispatch(cleanCounselorsState(null));
    dispatch(cleanOtherInformationState(null));
    dispatch(cleanCYFMSSearchState(null));
    dispatch(cleanCyfmsAttachmentsState(null));
    // InitialContact
    dispatch(cleanFileDetailsState(null));
    dispatch(cleanReferralInformationState(null));
    dispatch(cleanIncidentReportState(null));
    dispatch(cleanPresentConcernsState(null));
    dispatch(cleanPatientCareInformationState(null));
    dispatch(cleanInitialContactSearchState(null));
    dispatch(cleanIcAttachmentsState(null));
    // CPA
    dispatch(cleanCulturalProgramActivity(null));
    dispatch(cleanCPAParticipant(null));
    dispatch(cleanCPAAttachments(null));
    // CG
    dispatch(cleanCGCareProvider(null));
    dispatch(cleanCGCapacity(null));
    //NAVBAR
    dispatch(cleanNavbar(null));
  };

  const handleHome = () => {
    handleClean();
    dispatch(setView(false));
    dispatch(changeHomeColor("red"));
    navigate("/home");
  };

  const handleCalendar = (e: any) => {
    dispatch(changeCalendarColor("red"));
    navigate("/calendar");
  };

  const handleLogout = () => {
    dispatch(cleanLoginState(null));
    handleClean();
    navigate("/login");
  };

  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "black",
        mt: 4,
      }}
    >
      <ul>
        <li className="list">
          <Button
            sx={{
              color: "white",
              textTransform: "none",
              backgroundColor: homeColor,
              "&:hover": {
                backgroundColor: homeColor === "red" ? homeColor : "#464343",
              },
            }}
            onClick={handleHome}
          >
            Home
          </Button>
        </li>
        <li className="list">
          <Button
            sx={{
              color: "white",
              marginLeft: "10px",
              textTransform: "none",
              backgroundColor: calendarColor,
              "&:hover": {
                backgroundColor:
                  calendarColor === "red" ? calendarColor : "#464343",
              },
            }}
            onClick={handleCalendar}
          >
            Calendar
          </Button>
        </li>
        <li className="logout list">
          <Button
            sx={{ color: "white", textTransform: "none" }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </li>
      </ul>
    </Box>
  );
};

export default Navbar;
