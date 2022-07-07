import * as React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import { Button, Typography } from "@mui/material";
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

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "black",
        display: "flex",
        textAlign: "center",
        justifyContent: "space-between",
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
        component={Link}
        to="#"
      >
        Logout
      </Box>
    </Box>
  );
}
