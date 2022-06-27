import { Box, Button } from "@mui/material";
import AuthLayout from "../../components/auth/layout/AuthLayout";
import CYFMSDropdown from "../../components/cyfms/CYFMSDropdown";
import CYFMSInput from "../../components/cyfms/CYFMSInput";
import CYFMSLayout from "../../components/cyfms/CYFMSLayout";
import React from "react";
import type { FormEvent, ReactElement } from "react";

/**
 * The CYFMSRegister functional component.
 * @returns CYFMSRegister component skeleton.
 */
const CYFMSRegister = (): ReactElement => {
  const submitHandler = (e: FormEvent) => {
    console.log("yolo");
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
          <CYFMSInput id="firstName" value="First Name" />
          <CYFMSInput id="middleName" value="Middle Name" />
          <CYFMSInput id="lastName" value="Last Name" />
          <CYFMSInput id="dateOfBirth" value="Date of Birth" />
          <CYFMSDropdown id="gender" value="Gender" />
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </Box>
      </CYFMSLayout>
    </AuthLayout>
  );
};

export default CYFMSRegister;
