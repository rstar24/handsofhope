import NavBar from "../NavBar";

import { Box } from "@mui/material";
import React from "react";
import type { ReactElement, ReactNode } from "react";
import CPAHeader from "./CPAHeader";

/**
 * The CPALayout functional component.
 * @example
 * ```tsx
 * <CPALayout>...</CPALayout>
 * // OR
 * CPALayout />
 * ```
 * @returns CPALayout component skeleton.
 */
const CPALayout = (props: {
  children: ReactNode | ReactNode[];
}): ReactElement => {
  return (
    <Box>
      <CPAHeader />
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
                value: "Cultural Program Or Activity",
                route: "../cultural_program_activity",
              },
              {
                value: "Participants",
                route: "../participants",
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

export default CPALayout;
