import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../library/hooks";
import { cleanCodetableState } from "../../../features/codetable/codetableSlice";
import { cleanContactState } from "../../../features/contact/contactSlice";
import { cleanCriminalHistoryState } from "../../../features/cyfms/criminalHistory/criminalhistorySlice";
import { cleanEducationAndEmploymentState } from "../../../features/cyfms/educationAndEmployment/educationAndEmploymentSlice";
import { cleanFamilyPhysiciansState } from "../../../features/cyfms/familyPhysicians/familyPhysiciansSlice";
import { cleanHouseHoldAndMemberState } from "../../../features/cyfms/householdAndMembers/householdAndMembersSlice";
import { cleanOtherInformationState } from "../../../features/cyfms/otherInformation/otherInformationSlice";
import { cleanRegisterState } from "../../../features/cyfms/register/cyfmsRegisterSlice";
import { cleanSearchState } from "../../../features/search/searchSlice";

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
  const navigate = useNavigate();
  const [value, setValue] = React.useState(0);
  const dispatch = useAppDispatch();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    dispatch(cleanCodetableState());
    dispatch(cleanContactState());
    dispatch(cleanCriminalHistoryState());
    dispatch(cleanEducationAndEmploymentState());
    dispatch(cleanFamilyPhysiciansState());
    dispatch(cleanHouseHoldAndMemberState());
    dispatch(cleanOtherInformationState());
    dispatch(cleanRegisterState());
    dispatch(cleanSearchState());
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
      <Box
        color="#ffffff"
        sx={{ p: 1, textDecoration: "none" }}
        component={Link}
        to="/home"
      >
        Home
      </Box>
      <Box
        alignItems="flex-end"
        justifyContent="flex-end"
        color="#ffffff"
        sx={{ p: 1, textDecoration: "none" }}
        onClick={handleLogout}
      >
        Logout
      </Box>
    </Box>
  );
}
