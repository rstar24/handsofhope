import Box from "@mui/material/Box";
import CYFMSHeader from "./CYFMSHeader";
import CYFMSSideNav from "./CYFMSSideNav";
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
        <CYFMSSideNav />
        {props.children}
      </Box>
    </Box>
  );
};

export default CYFMSLayout;
