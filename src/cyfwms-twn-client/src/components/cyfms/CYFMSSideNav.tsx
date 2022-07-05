import { useAppSelector } from "../../library/hooks";
import { Box, List, ListItemButton, ListItemText } from "@mui/material";
import { createSelector } from "@reduxjs/toolkit";
import { NavLink } from "react-router-dom";
import React from "react";
import ListItem, { listItemClasses } from "@mui/material/ListItem";
import type { ReactElement } from "react";

function MyNavLink(props: any) {
  return <NavLink {...props} activeClassName="active" />;
}

const hideTabsSelector = createSelector(
  (state: any) => (state as any).cyfmsSideNav.hideTabs,
  (hideTabs) => hideTabs
);

/**
 * The CYFMSSideNav functional component.
 * @returns CYFMSideNav component skeleton.
 */
const CYFMSSideNav = (): ReactElement => {
  const hideTabs = useAppSelector(hideTabsSelector);

  return (
    <Box aria-label="tabs" sx={{ bgcolor: "background.paper" }}>
      <List
        disablePadding
        sx={{
          [`& .active, & .${listItemClasses.root}:hover`]: {
            color: "red",
            backgroundColor: "#D9D9D9",
          },
        }}
      >
        <ListItemButton component={MyNavLink} to="/cyfms/register">
          <ListItemText primary="Identity" />
        </ListItemButton>

        <ListItemButton
          disabled={hideTabs}
          component={MyNavLink}
          to="/cyfms/contact"
        >
          <ListItemText primary="Contact" />
        </ListItemButton>
        <ListItemButton
          disabled={hideTabs}
          component={MyNavLink}
          to="/cyfms/household_members"
        >
          <ListItemText primary="Household Members" />
        </ListItemButton>
        <ListItemButton
          disabled={hideTabs}
          component={MyNavLink}
          to="/cyfms/education_and_employment"
        >
          <ListItemText primary="Education and Employment" />
        </ListItemButton>
        <ListItemButton
          disabled={hideTabs}
          component={MyNavLink}
          to="/cyfms/criminal_history"
        >
          <ListItemText primary="Criminal History" />
        </ListItemButton>
        <ListItemButton
          disabled={hideTabs}
          component={MyNavLink}
          to="/cyfms/family_physician"
        >
          <ListItemText primary="Family Physician" />
        </ListItemButton>
        <ListItemButton
          disabled={hideTabs}
          component={MyNavLink}
          to="/cyfms/cyfms_worker"
        >
          <ListItemText primary="Conselor / CYFMS Worker" />
        </ListItemButton>
        <ListItemButton
          disabled={hideTabs}
          component={MyNavLink}
          to="/cyfms/other_information"
        >
          <ListItemText primary="Other Information" />
        </ListItemButton>
      </List>
    </Box>
  );
};

export default CYFMSSideNav;
