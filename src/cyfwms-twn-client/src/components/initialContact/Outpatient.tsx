import { useAppSelector } from "../../library/hooks";
import ICFullInput from "./ICFullInput";
import ICHalfInput from "./ICHalfInput";
import ICTextAreaMax from "./ICTextAreaMax";
import ICInput from "./ICInput";
import { Box } from "@mui/material";
import React from "react";
import type { ReactElement } from "react";

/**
 * The Outpatient functional component.
 * @returns Outpatient component skeleton.
 */
const Outpatient = (): ReactElement => {
  const data = useAppSelector(
    (state) => state.icPatientCareInformation.data.outpatient
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem 0" }}>
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
            autofill={data.therapyOrCounseling}
            id="therapyOrCounseling"
            value="Have you seen a therapist or counselor for personal or family problems or alcohol/drug treatment?"
          />
        </Box>
        <Box sx={{ flexBasis: 0, flexGrow: 1 }}></Box>
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
        <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
          <ICInput
            autofill={data.therapyTimePeriod}
            id="therapyTimePeriod"
            value="When?"
            type="datetime-local"
          />
        </Box>
        <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
          <ICInput
            autofill={data.therapyLocation}
            id="therapyLocation"
            value="Where?"
          />
        </Box>
      </Box>
      <Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem 0",
          }}
        >
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <ICFullInput
              autofill={data.reasonForTherapy}
              id="reasonForTherapy"
              value="Reasons"
            />
          </Box>
        </Box>
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
        <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
          <ICHalfInput
            autofill={data.selfHelpGroup}
            id="selfHelpGroup"
            value="Any involvement in self help groups such as NA, AA, etc?"
          />
        </Box>
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
        <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
          <ICInput
            autofill={data.selfHelpGroupPeriod}
            id="selfHelpGroupPeriod"
            value="When?"
            type="datetime-local"
          />
        </Box>
        <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
          <ICInput
            autofill={data.selfHelpGroupLocation}
            id="selfHelpGroupLocation"
            value="Where?"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Outpatient;
