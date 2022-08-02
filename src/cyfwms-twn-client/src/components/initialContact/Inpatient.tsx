import { useAppSelector } from "../../library/hooks";
import ICTextAreaMax from "./ICTextAreaMax";
import { Box, Typography } from "@mui/material";
import React from "react";
import type { ReactElement } from "react";

/**
 * The Inpatient functional component.
 * @returns Inpatient component skeleton.
 */
const Inpatient = (): ReactElement => {
  const data = useAppSelector(
    (state) => state.icPatientCareInformation.data.inpatient
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem 0" }}>
      <Typography color="primary" sx={{ flexGrow: 1 }}>
        Inpatient
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        <Box
          sx={{
            paddingLeft: 1,
            flexBasis: 0,
            flexDirection: "column",
            flexGrow: 200,
          }}
        >
          <ICTextAreaMax
            autofill={data.hospitalizationRecord}
            id="hospitalizationRecord"
            value="Have you been in a hospital or residential treatment center for personal problems or alcohol/drug problems? Why?"
          />
        </Box>
        <Box sx={{ flexBasis: 0, flexGrow: 1 }}></Box>
      </Box>
      <Box
        sx={{
          paddingLeft: 1,
          flexBasis: 0,
          flexDirection: "column",
          flexGrow: 200,
        }}
      >
        <ICTextAreaMax
          autofill={data.hospitalizationReasons}
          id="hospitalizationReasons"
          value="Reasons"
        />
      </Box>
    </Box>
  );
};

export default Inpatient;
