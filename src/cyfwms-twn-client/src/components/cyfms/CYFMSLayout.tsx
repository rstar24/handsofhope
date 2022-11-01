import NavBar from "../NavBar";
import CYFMSHeader from "./CYFMSHeader";
import { Box } from "@mui/material";
import React from "react";
import type { ReactElement, ReactNode } from "react";

/**
 * The CYFMSLayout functional component.
 * @example
 * ```tsx
 * <CYFMSLayout>...</CYFMSLayout>
 * // OR
 * <CYFMSLayout />
 * ```
 * @returns CYFMSLayout component skeleton.
 */
const CYFMSLayout = (props: {
  children: ReactNode | ReactNode[];
}): ReactElement => {
  return (
    <Box>
      <CYFMSHeader />
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: { xs: "1rem 0", md: undefined },
        }}
      >
        <Box sx={{ flex: "1 1 0", height: 400, overflowY: "auto" }}>
          <NavBar
            tabs={[
              { value: "Register", route: "../register" },
              { value: "Contact", route: "../contact" },
              {
                value: "Household Members",
                route: "../household_members",
              },
              {
                value: "Education and Employment",
                route: "../education_and_employment",
              },
              { value: "Criminal History", route: "../criminal_history" },
              {
                value: "Family Physician(s)",
                route: "../family_physicians",
              },
              {
                value: "Counselor(s) / CFS Worker(s)",
                route: "../counselors",
              },
              {
                value: "Other Information",
                route: "../other_information",
              },
              {
                value: "Appointments",
                route: "../appointment",
              },
              {
                value: "Attachments",
                route: "../attachments",
              },
            ]}
          />
        </Box>
        <Box sx={{ flex: "4 1 0", px: "1rem", height: 400, overflowY: "auto" }}>
          {props.children}
        </Box>
      </Box>
    </Box>
  );
};

export default CYFMSLayout;
