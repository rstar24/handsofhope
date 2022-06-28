import { Box, Button, Typography } from "@mui/material";
import CYFMSInput from "../../components/cyfms/CYFMSInput";
import CYFMSLayout from "../../components/cyfms/CYFMSLayout";
import type { FormEvent, ReactElement } from "react";

/**
 * The CYFMSOtherInformation functional component.
 * @returns CYFMSOtherInformation component skeleton.
 */
const CYFMSOtherInformation = (): ReactElement => {
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
        <Typography>Other Information</Typography>
        <CYFMSInput id="strengths" value="Strengths" />
        <CYFMSInput id="weaknesses" value="Weaknesses" />
        <CYFMSInput id="skills" value="Skills" />
        <CYFMSInput id="experiences" value="Experiences" />
        <CYFMSInput
          id="effectiveCopingSkills"
          value="Effective Coping Skills"
        />
        <Button variant="contained" type="submit">
          Next
        </Button>
      </Box>
    </CYFMSLayout>
  );
};

export default CYFMSOtherInformation;
