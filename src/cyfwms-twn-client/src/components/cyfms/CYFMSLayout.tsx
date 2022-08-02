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
              { value: "Register", route: "/cyfms/register" },
              { value: "Contact", route: "/cyfms/contact" },
              {
                value: "Household Members",
                route: "/cyfms/household_members",
              },
              {
                value: "Education and Employment",
                route: "/cyfms/education_and_employment",
              },
              { value: "Criminal History", route: "/cyfms/criminal_history" },
              {
                value: "Family Physician(s)",
                route: "/cyfms/family_physicians",
              },
              {
                value: "Counselor(s) / CFS Worker(s)",
                route: "/cyfms/counselors",
              },
              {
                value: "Other Information",
                route: "/cyfms/other_information",
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
