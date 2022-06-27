import { Box, Button, Typography } from "@mui/material";
import AuthLayout from "../../components/auth/layout/AuthLayout";
import CYFMSInput from "../../components/cyfms/CYFMSInput";
import CYFMSLayout from "../../components/cyfms/CYFMSLayout";
import React from "react";
import type { FormEvent, ReactElement } from "react";
import CYFMSDropdown from "../../components/cyfms/CYFMSDropdown";

/**
 * The CYFMSEducationAndEmployment functional component.
 * @returns CYFMSEducationAndEmployment component skeleton.
 */
const CYFMSEducationAndEmployment = (): ReactElement => {
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
          <Typography>Education</Typography>
          <CYFMSDropdown id="attendingSchool" value="Attending School?" />
          <CYFMSInput id="school" value="School" />
          <CYFMSInput id="grade" value="Grade" />
          <Typography>Employment</Typography>
          <CYFMSDropdown id="employed" value="Employed?" />
          <CYFMSDropdown id="typeOfEmployment" value="Type of Employment" />
          <CYFMSInput id="desiredProfession" value="Desired Profession" />
          <Button variant="contained" type="submit">
            Next
          </Button>
        </Box>
      </CYFMSLayout>
    </AuthLayout>
  );
};

export default CYFMSEducationAndEmployment;
