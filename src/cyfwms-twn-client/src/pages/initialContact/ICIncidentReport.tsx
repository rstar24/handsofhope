import { Box, Button } from "@mui/material";
import React from "react";
import type { FormEvent, ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import ICLayout from "../../components/initialContact/ICLayout";
import ICInput from "../../components/initialContact/ICInput";
import ICDropdown from "../../components/initialContact/ICDropdown";
import ICTextArea from "../../components/initialContact/ICTextArea";

/**
 * The ICIncidentReport functional component.
 * @returns ICIncidentReport component skeleton.
 */
const ICIncidentReport = (): ReactElement => {
  const navigate = useNavigate();

  // Handles the form data submission and other
  // activities.
  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
  };

  const nextClickHandler = () => {
    navigate("/initialContact/presentConcern");
  };

  return (
    <ICLayout>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem 0",
        }}
        onSubmit={submitHandler}
      >
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <ICInput id="ic_dateOfReport" value="Date of Report" type="date" />
          </Box>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <ICInput id="ic_reportedBy" value="Reported By" />
          </Box>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <ICInput id="ic_partiesInvolved" value="Parties Involved" />
          </Box>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <ICInput id="ic_witnesses" value="Witnesses" />
          </Box>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <ICDropdown
              id="ic_status"
              optionsList={["In Progress", "Closed"]}
              value="Status"
            />
          </Box>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <ICInput id="ic_incidentDate" value="Incident Date" type="date" />
          </Box>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <ICInput id="ic_incidentLocation" value="Incident Location" />
          </Box>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <ICDropdown
              id="ic_risk"
              optionsList={["Low", "Medium", "High"]}
              value="Risk"
            />
          </Box>
        </Box>
        <ICTextArea id="ic_actionTaken" value="Action Taken" />
        <ICTextArea id="ic_actionPlan" value="Action Plan" />
        <Box sx={{ display: "flex", justifyContent: "right" }}>
          <Button variant="contained">Next</Button>
        </Box>
      </Box>
    </ICLayout>
  );
};

export default ICIncidentReport;
