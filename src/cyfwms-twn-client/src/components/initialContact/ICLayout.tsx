import NavBar from "../NavBar";
import ICHeader from "./ICHeader";
import { Box } from "@mui/material";
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
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: { xs: "1rem 0", md: undefined },
        }}
      >
        <Box sx={{ flex: "1 1 0" }}>
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
        </Box>
        <Box sx={{ flex: "4 1 0", px: "1rem" }}>{props.children}</Box>
      </Box>
    </Box>
  );
};

export default ICLayout;
