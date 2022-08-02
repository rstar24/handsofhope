import { useAppSelector } from "../library/hooks";
import { listItemClasses } from "@mui/material/ListItem";
import { Box, List, ListItemButton, ListItemText } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";
import type { ReactElement } from "react";

function MyNavLink(props: any) {
  return <NavLink {...props} activeClassName="active" />;
}

interface NavBarProps {
  tabs: {
    value: string;
    route: string;
  }[];
}

/**
 * The NavBar functional component.
 * @returns NavBar component skeleton.
 */
const NavBar = (props: NavBarProps): ReactElement => {
  const tabsHidden = useAppSelector((state) => state.navBar.tabsHidden);
  const isInitiated = useAppSelector((state) => state.initiator.isInitiated);

  // Change the value of Register to Identity when participant is registered.
  if (props.tabs[0].value === "Register" && isInitiated) {
    props.tabs[0].value = "Identity";
  }

  return (
    <Box aria-label="tabs" sx={{ bgcolor: "#DFDADA" }}>
      <List
        disablePadding
        sx={{
          [`& .active, & .${listItemClasses.root}:hover`]: {
            "&:hover": {
              backgroundColor: "#740808",
            },
            color: "white",
            backgroundColor: "#da0404",
          },
        }}
      >
        {props.tabs.map((tab, index) => {
          return (
            <ListItemButton
              disabled={index !== 0 ? tabsHidden : false}
              component={MyNavLink}
              to={tab.route}
            >
              <ListItemText primary={tab.value} />
            </ListItemButton>
          );
        })}
      </List>
    </Box>
  );
};

export default NavBar;
