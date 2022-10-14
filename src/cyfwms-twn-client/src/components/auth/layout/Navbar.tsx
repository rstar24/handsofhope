import { cleanCodetableState } from "../../../features/codetable/slice";
import { cleanState as cleanContactState } from "../../../features/cyfms/contact/slice";
import { cleanState as cleanCounselorsState } from "../../../features/cyfms/counselors/slice";
import { cleanState as cleanCriminalHistoryState } from "../../../features/cyfms/criminalHistory/slice";
import { cleanState as cleanEducationAndEmploymentState } from "../../../features/cyfms/educationAndEmployment/slice";
import { cleanState as cleanFamilyPhysiciansState } from "../../../features/cyfms/familyPhysicians/slice";
import { cleanState as cleanHouseholdMembersState } from "../../../features/cyfms/householdMembers/slice";
import { cleanState as cleanOtherInformationState } from "../../../features/cyfms/otherInformation/slice";
import { cleanState as cleanRegisterState } from "../../../features/cyfms/register/slice";
import { cleanState as cleanCYFMSSearchState } from "../../../features/cyfms/search/slice";
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

import { useAppDispatch } from "../../../library/hooks";
import { Box, Tab } from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { setView } from "../../../features/popupSlice";

interface LinkTabProps {
  label?: string;
  href?: string;
}

function LinkTab(props: LinkTabProps) {
  return (
    <Tab
      component={Link}
      to={""}
      onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

export default function Navbar() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [calendarColor, setCalendarColor] = React.useState("none");
  const [homeColor, setHomeColor] = React.useState("none");
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

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
    // InitialContact
    dispatch(cleanFileDetailsState(null));
    dispatch(cleanReferralInformationState(null));
    dispatch(cleanIncidentReportState(null));
    dispatch(cleanPresentConcernsState(null));
    dispatch(cleanPatientCareInformationState(null));
    dispatch(cleanInitialContactSearchState(null));
    //CPA
    dispatch(cleanCulturalProgramActivity(null));
    dispatch(cleanCPAParticipant(null));
    dispatch(cleanCPAAttachments(null));
    //Calendar
  };

  const handleHome = () => {
    handleClean();
    dispatch(setView(false));

    navigate("/home");
  };

  const handleCalendar = () => {};

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
        display: "flex",
        textAlign: "center",
        justifyContent: "space-between",
        mt: 4,
      }}
    >
      <Box color="#ffffff" sx={{ p: 0 }}>
        <Button
          component={Link}
          to="/home"
          sx={{ color: "white", textTransform: "none" }}
          onClick={handleHome}
        >
          Home
        </Button>
      </Box>
      <Box color="#ffffff" sx={{ p: 0 }}>
        <Button
          component={Link}
          to="/calendar"
          sx={{
            color: "white",
            textTransform: "none",
          }}
          onClick={handleCalendar}
        >
          Calendar
        </Button>
      </Box>
      <Box color="#ffffff" sx={{ paddingLeft: "970px" }}>
        <Button
          sx={{ color: "white", textTransform: "none" }}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );
}
