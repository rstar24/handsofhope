import { Box, List, ListItemButton, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import type { ReactElement } from "react";
import { useAppSelector } from "../../library/hooks";

/**
 * The CYFMSSideNav functional component.
 * @returns CYFMSideNav component skeleton.
 */
const CYFMSSideNav = (): ReactElement => {
  const participantId = useAppSelector(
    (state) => (state as any).registration.user.participantId
  );

  useEffect(() => {}, []);
  return (
    <Box aria-label="tabs" sx={{ bgcolor: "background.paper" }}>
      <List disablePadding>
        <ListItemButton component={Link} to="/cyfms/register">
          <ListItemText primary="Identity" />
        </ListItemButton>
        {participantId !== 0 && (
          <>
            <ListItemButton component={Link} to="/cyfms/contact">
              <ListItemText primary="Contact" />
            </ListItemButton>
            <ListItemButton component={Link} to="/cyfms/household_members">
              <ListItemText primary="Household Members" />
            </ListItemButton>
            <ListItemButton
              component={Link}
              to="/cyfms/education_and_employment"
            >
              <ListItemText primary="Education and Employment" />
            </ListItemButton>
            <ListItemButton component={Link} to="/cyfms/criminal_history">
              <ListItemText primary="Criminal History" />
            </ListItemButton>
            <ListItemButton component={Link} to="/cyfms/family_physician">
              <ListItemText primary="Family Physician" />
            </ListItemButton>
            <ListItemButton component={Link} to="/cyfms/cyfms_worker">
              <ListItemText primary="Conselor / CYFMS Worker" />
            </ListItemButton>
            <ListItemButton component={Link} to="/cyfms/other_information">
              <ListItemText primary="Other Information" />
            </ListItemButton>
          </>
        )}
      </List>
    </Box>
  );
};

export default CYFMSSideNav;
