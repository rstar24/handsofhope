import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../library/hooks";
import { cleanCodetableState } from "../../../features/codetable/codetableSlice";
import { cleanContactState } from "../../../features/cyfms/contact/cyfmsContactSlice";
import { cleanCriminalHistoryState } from "../../../features/cyfms/criminalHistory/cyfmsCriminalHistorySlice";
import { cleanEducationAndEmploymentState } from "../../../features/cyfms/educationAndEmployment/educationAndEmploymentSlice";
import { cleanFamilyPhysiciansState } from "../../../features/cyfms/familyPhysicians/cyfmsFamilyPhysiciansSlice";
import { cleanHouseholdMembersState } from "../../../features/cyfms/householdMembers/cyfmsHouseholdMembersSlice";
import { cleanOtherInformationState } from "../../../features/cyfms/otherInformation/cyfmsOtherInformationSlice";
import { cleanRegisterState } from "../../../features/cyfms/register/cyfmsRegisterSlice";
import { cleanSearchState } from "../../../features/search/searchSlice";
import { cleanCounselorsState } from "../../../features/cyfms/counselors/cyfmsCounselorsSlice";
import { onLogout } from "../../../features/login/loginSlice";
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
  const [value, setValue] = React.useState(0);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    dispatch(onLogout());
    dispatch(cleanCodetableState());
    dispatch(cleanContactState);
    dispatch(cleanCriminalHistoryState);
    dispatch(cleanEducationAndEmploymentState());
    dispatch(cleanFamilyPhysiciansState);
    dispatch(cleanHouseholdMembersState);
    dispatch(cleanOtherInformationState);
    dispatch(cleanRegisterState());
    dispatch(cleanSearchState());
    dispatch(cleanCounselorsState);
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
