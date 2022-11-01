import NavBar from "../NavBar";
import Header from "../Header";
import { Box } from "@mui/material";
import React from "react";
import type { FC, PropsWithChildren } from "react";

/**
 * `CG` aka `Caregivers` module.
 * Sub page component: `CG Layout`.
 * @param props
 * @returns `ReactElement`
 */
const CgLayout: FC<PropsWithChildren> = (props) => {
  return (
    <Box>
      <Header bannerTitle="Caregivers" />
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
              { value: "Care Provider", route: "../care_provider" },
              { value: "Capacity", route: "../capacity" },
              { value: "Caregivers", route: "../caregivers" },
              { value: "Contact Notes", route: "../contact_notes" },
              { value: "Attachments", route: "../attachments" },
              { value: "Appointment", route: "../appointment" },
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

export default CgLayout;
