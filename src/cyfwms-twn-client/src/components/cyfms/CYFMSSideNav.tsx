import { Box, List, ListItemButton, ListItemText } from "@mui/material";
import { NavLink } from "react-router-dom";
import React, { createContext, useContext } from "react";
import { listItemClasses } from "@mui/material/ListItem";
import type { ReactElement } from "react";

function MyNavLink(props: any) {
  return <NavLink {...props} activeClassName="active" />;
}

/**
 * The CYFMSSideNavContext is used to hide/unhide
 * tabs of the side navbar.
 */
export const CYFMSSideNavContext = createContext<{
  hideTabs: boolean;
  setHideTabs: (hideTabs: boolean) => void;
}>({
  hideTabs: true,
  setHideTabs: (hideTabs) => {},
});

/**
 * The CYFMSSideNav functional component.
 * @returns CYFMSideNav component skeleton.
 */
const CYFMSSideNav = (): ReactElement => {
  const { hideTabs } = useContext(CYFMSSideNavContext);
  return (
    <Box aria-label="tabs" sx={{ bgcolor: "#DFDADA" }}>
      <List
        disablePadding
        sx={{
          [`& .active, & .${listItemClasses.root}:hover`]: {
            color: "white",
            backgroundColor: "#da0404",
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
          <ListItemText primary="Counselor / CFS Worker" />
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
