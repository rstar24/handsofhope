import Box from "@mui/material/Box";
import CYFMSHeader from "./CYFMSHeader";
import CYFMSSideNav from "./CYFMSSideNav";
import React from "react";
import type { ReactElement, ReactNode } from "react";
import { Grid } from "@mui/material";

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
            <CYFMSSideNav />
          </Grid>
          <Grid item md={10}>
            {props.children}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default CYFMSLayout;
