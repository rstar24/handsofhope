import { Box, Button } from "@mui/material";
import React from "react";
import type { FormEvent, ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import ICLayout from "../../components/initialContact/ICLayout";
import ICInput from "../../components/initialContact/ICInput";
import ICDropdown from "../../components/initialContact/ICDropdown";

/**
 * The ICFileDetails functional component.
 * @returns ICFileDetails component skeleton.
 */
const ICFileDetails = (): ReactElement => {
  const navigate = useNavigate();

  // Handles the form data submission and other
  // activities.
  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
  };

  const nextClickHandler = () => {
    navigate("/initialContact/referralInformation");
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
            <ICInput id="ic_fileNo" value="File No." />
          </Box>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <ICInput id="ic_clientName" value="Client Name" />
          </Box>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <ICInput id="ic_date" value="Date" type="date" />
          </Box>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <ICInput id="ic_caseWorker" value="Case Worker" />
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
            <ICInput id="ic_dateClosed" value="Date Closed" type="date" />
          </Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "right" }}>
          <Button variant="contained">Next</Button>
        </Box>
      </Box>
    </ICLayout>
  );
};

export default ICFileDetails;
