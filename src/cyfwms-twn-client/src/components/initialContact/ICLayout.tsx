import NavBar from "../NavBar";
import ICHeader from "./ICHeader";
import { Box, Grid } from "@mui/material";
import React from "react";
import type { ReactElement, ReactNode } from "react";

/**
 * The ICLayout functional component.
 * @example
 * ```tsx
 * <ICLayout>...</ICLayout>
 * // OR
 * <ICLayout />
 * ```
 * @returns ICLayout component skeleton.
 */
const ICLayout = (props: {
  children: ReactNode | ReactNode[];
}): ReactElement => {
  return (
    <Box>
      <ICHeader />
      <Box sx={{ display: "flex" }}>
        <Grid container md={12}>
          <Grid item md={2}>
            <NavBar
              tabs={[
                {
                  value: "File Details",
                  route: "/initial_contact/file_details",
                },
                {
                  value: "Referral Information",
                  route: "/initial_contact/referral_information",
                },
                {
                  value: "Incident Report",
                  route: "/initial_contact/incident_report",
                },
                {
                  value: "Present Concerns",
                  route: "/initial_contact/present_concerns",
                },
                {
                  value: "Patient Care Information",
                  route: "/initial_contact/patient_care_information",
                },
              ]}
            />
          </Grid>
          <Grid item md={10} sx={{ px: "1rem" }}>
            {props.children}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ICLayout;
