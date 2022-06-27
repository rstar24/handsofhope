import { Box, Button } from "@mui/material";
import AuthLayout from "../../components/auth/layout/AuthLayout";
import CYFMSInput from "../../components/cyfms/CYFMSInput";
import CYFMSLayout from "../../components/cyfms/CYFMSLayout";
import React from "react";
import type { FormEvent, ReactElement } from "react";
import CYFMSDropdown from "../../components/cyfms/CYFMSDropdown";

/**
 * The CYFMSHouseholdMembers functional component.
 * @returns CYFMSHouseholdMembers component skeleton.
 */
const CYFMSHouseholdMembers = (): ReactElement => {
  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <AuthLayout>
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
          <CYFMSInput id="memberName" value="Name" />
          <CYFMSInput id="memberDOB" value="Date of Birth" />
          <CYFMSInput id="memberResiding" value="Residing" />
          <CYFMSDropdown id="memberGender" value="Member Gender" />
          <Button variant="contained" type="submit">
            Add More
          </Button>
          <Button variant="contained" type="submit">
            Next
          </Button>
        </Box>
      </CYFMSLayout>
    </AuthLayout>
  );
};

export default CYFMSHouseholdMembers;
