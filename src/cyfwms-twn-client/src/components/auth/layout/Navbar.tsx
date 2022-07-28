import { cleanCodetableState } from "../../../features/codetable/codetableSlice";
import { cleanState as cleanContactState } from "../../../features/cyfms/contact/slice";
import { cleanState as cleanCounselorsState } from "../../../features/cyfms/counselors/slice";
import { cleanState as cleanCriminalHistoryState } from "../../../features/cyfms/criminalHistory/slice";
import { cleanState as cleanEducationAndEmploymentState } from "../../../features/cyfms/educationAndEmployment/slice";
import { cleanState as cleanFamilyPhysiciansState } from "../../../features/cyfms/familyPhysicians/slice";
import { cleanState as cleanHouseholdMembersState } from "../../../features/cyfms/householdMembers/slice";
import { cleanState as cleanOtherInformationState } from "../../../features/cyfms/otherInformation/slice";
import { cleanState as cleanRegisterState } from "../../../features/cyfms/register/slice";
import { cleanSearchState } from "../../../features/search/searchSlice";
import { onLogout } from "../../../features/login/loginSlice";
import { useAppDispatch } from "../../../library/hooks";
import { Box, Tab } from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

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

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleClean = () => {
    sessionStorage.removeItem("token");
    dispatch(onLogout());
    dispatch(cleanCodetableState());
    dispatch(cleanRegisterState(null));
    dispatch(cleanContactState(null));
    dispatch(cleanCriminalHistoryState(null));
    dispatch(cleanEducationAndEmploymentState(null));
    dispatch(cleanHouseholdMembersState(null));
    dispatch(cleanFamilyPhysiciansState(null));
    dispatch(cleanCounselorsState(null));
    dispatch(cleanOtherInformationState(null));
    dispatch(cleanRegisterState(null));
    dispatch(cleanSearchState());
    dispatch(cleanCounselorsState(null));
    navigate("/home");
  };

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    dispatch(onLogout());
    dispatch(cleanCodetableState());
    dispatch(cleanContactState(null));
    dispatch(cleanCriminalHistoryState(null));
    dispatch(cleanEducationAndEmploymentState(null));
    dispatch(cleanFamilyPhysiciansState(null));
    dispatch(cleanHouseholdMembersState(null));
    dispatch(cleanOtherInformationState(null));
    dispatch(cleanRegisterState(null));
    dispatch(cleanSearchState());
    dispatch(cleanCounselorsState(null));
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
          onClick={handleClean}
        >
          Home
        </Button>
      </Box>
      <Box color="#ffffff" sx={{ p: 0 }}>
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
