import NavBar from "../NavBar";
import CYFMSHeader from "./CYFMSHeader";
import { Box, Grid } from "@mui/material";
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
      <Box sx={{ display: "flex" }}>
        <Grid container md={12}>
          <Grid item md={2}>
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
          </Grid>
          <Grid item md={10} sx={{ px: "1rem" }}>
            {props.children}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default CYFMSLayout;
