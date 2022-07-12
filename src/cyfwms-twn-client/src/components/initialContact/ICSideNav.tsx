import { Box, List, ListItemButton, ListItemText } from "@mui/material";
import { NavLink } from "react-router-dom";
import React, { createContext } from "react";
import { listItemClasses } from "@mui/material/ListItem";
import type { ReactElement } from "react";

function MyNavLink(props: any) {
  return <NavLink {...props} activeClassName="active" />;
}

/**
 * The ICSideNavContext is used to hide/unhide
 * tabs of the side navbar.
 */
export const ICSideNavContext = createContext<{
  hideTabs: boolean;
  setHideTabs: (hideTabs: boolean) => void;
}>({
  hideTabs: true,
  setHideTabs: (hideTabs) => {},
});

/**
 * The ICSideNav functional component.
 * @returns ICideNav component skeleton.
 */
const ICSideNav = (): ReactElement => {
  //const { hideTabs } = useContext(ICSideNavContext);
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
        <ListItemButton component={MyNavLink} to="/initial_contact/fileDetails">
          <ListItemText primary="File Details" />
        </ListItemButton>

        <ListItemButton
          //disabled={hideTabs}
          component={MyNavLink}
          to="/initial_contact/referral"
        >
          <ListItemText primary="Referral Information" />
        </ListItemButton>
        <ListItemButton
          //disabled={hideTabs}
          component={MyNavLink}
          to="/initial_contact/incident_report"
        >
          <ListItemText primary="Incident Report" />
        </ListItemButton>
        <ListItemButton
          //disabled={hideTabs}
          component={MyNavLink}
          to="/initial_contact/presentConcerns"
        >
          <ListItemText primary="Present Concerns" />
        </ListItemButton>
        <ListItemButton
          //disabled={hideTabs}
          component={MyNavLink}
          to="/initial_contact/patientCareInformation"
        >
          <ListItemText primary="Patient Care Information" />
        </ListItemButton>
      </List>
    </Box>
  );
};

export default ICSideNav;
