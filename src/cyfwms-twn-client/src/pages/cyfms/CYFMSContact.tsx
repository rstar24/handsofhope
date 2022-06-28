import CYFMSInput from "../../components/cyfms/CYFMSInput";
import CYFMSLayout from "../../components/cyfms/CYFMSLayout";
import { Box, Button } from "@mui/material";
import React from "react";
import type { FormEvent, ReactElement } from "react";

/**
 * The CYFMSContact functional component.
 * @returns CYFMSContact component skeleton.
 */
const CYFMSContact = (): ReactElement => {
  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <CYFMSLayout>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "2rem 2rem",
          mb: "auto",
        }}
        onSubmit={submitHandler}
      >
        <CYFMSInput id="addrLine1" value="Address Line 1" />
        <CYFMSInput id="addrLine2" value="Address Line 2" />
        <CYFMSInput id="city" value="Province" />
        <CYFMSInput id="postalCode" value="Postal Code" />
        <CYFMSInput id="homePhone" value="Home Phone" />
        <CYFMSInput id="cellPhone" value="Cell Phone" />
        <CYFMSInput id="workPhone" value="Work Phone" />
        <CYFMSInput id="emailAddr" value="Email Address" />
        <Button variant="contained" type="submit">
          Next
        </Button>
      </Box>
    </CYFMSLayout>
  );
};

export default CYFMSContact;
