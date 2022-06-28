import { Box, Button, Typography } from "@mui/material";
import CYFMSInput from "../../components/cyfms/CYFMSInput";
import CYFMSLayout from "../../components/cyfms/CYFMSLayout";
import type { FormEvent, ReactElement } from "react";

/**
 * The CYFMSFamilyPhysician functional component.
 * @returns CYFMSFamilyPhysician component skeleton.
 */
const CYFMSFamilyPhysician = (): ReactElement => {
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
        <Typography>Family Physician:1</Typography>
        <CYFMSInput id="name" value="Name" />
        <CYFMSInput id="phone" value="Phone" />
        <CYFMSInput id="cell" value="Cell" />
        <CYFMSInput id="medicationInfo" value="List Of Medication" />
        <Button variant="contained">Add More</Button>
        <Button variant="contained">Next</Button>
      </Box>
    </CYFMSLayout>
  );
};

export default CYFMSFamilyPhysician;
