import { FormEvent, ReactElement } from "react";
import CPAInput from "../../../components/cpa/CPAInput";
import { Box } from "@mui/material";
import CPALayout from "../../../components/cpa/CPALayout";
import CPATextArea from "../../../components/cpa/CPATextArea";
import { CYFSWMSNextButton } from "../../../components/CYFSWMSButtons";
/**
 * The CulturalProgramOrActivity functional component.
 * @returns CulturalProgramOrActivity component skeleton.
 */
const CulturalProgramOrActivity = (): ReactElement => {
  // Handles the form data submission and other
  // activities.
  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <CPALayout>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem 0",
        }}
        //onSubmit={submitHandler}
        //onKeyDown={onKeyDown}
      >
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <CPAInput
              //autofill={data.dateOfReport}
              id="reference_id"
              value="Reference Id"
              type="text"
            />
          </Box>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}></Box>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <CPAInput
              //autofill={data.partiesInvolved}
              id="name"
              value="Name"
            />
          </Box>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <CPAInput
              //autofill={data.witnesses}
              id="type"
              value="Type"
            />
          </Box>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <CPAInput
              //autofill={data.incidentDate}
              id="status"
              value="Status"
            />
          </Box>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <CPAInput
              //autofill={data.incidentTime}
              id="caseworker"
              value="Caseworker"
            />
          </Box>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <CPAInput
              //autofill={data.incidentLocation}
              id="start_date"
              value="Start Date"
              type="Date"
            />
          </Box>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <CPAInput id="end_date" value="End Date" />
          </Box>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <CPAInput
              //autofill={data.incidentLocation}
              id="total_cost"
              value="Total Cost"
            />
          </Box>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <CPAInput id="total_participation" value="Total Participation" />
          </Box>
        </Box>
        <CPATextArea
          //autofill={data.actionTaken}
          id="session_details"
          value="Session Details"
        />
        <CPATextArea
          //autofill={data.actionPlan}
          id="participation_details"
          value="Cost/Participation Details"
        />
        <CPATextArea
          //autofill={data.actionTaken}
          id="outcomes"
          value="Outcomes"
        />
        <CPATextArea
          //autofill={data.actionPlan}
          id="notes"
          value="Notes"
        />
        <Box sx={{ display: "flex", justifyContent: "right" }}>
          <CYFSWMSNextButton />
        </Box>
      </Box>
    </CPALayout>
  );
};

export default CulturalProgramOrActivity;
