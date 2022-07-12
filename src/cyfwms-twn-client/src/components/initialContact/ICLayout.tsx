import Box from "@mui/material/Box";
import React from "react";
import type { ReactElement, ReactNode } from "react";
import { Grid } from "@mui/material";
import ICHeader from "./ICHeader";
import ICSideNav from "./ICSideNav";

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
            <ICSideNav />
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
