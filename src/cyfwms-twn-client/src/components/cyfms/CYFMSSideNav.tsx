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
            "&:hover": {
              backgroundColor: "#740808",
            },
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
          to="/cyfms/family_physicians"
        >
          <ListItemText primary="Family Physician(s)" />
        </ListItemButton>
        <ListItemButton
          disabled={hideTabs}
          component={MyNavLink}
          to="/cyfms/counselors"
        >
          <ListItemText primary="Counselor(s) / CFS Worker(s)" />
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
