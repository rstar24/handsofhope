import CYFMSDropdown from "../../components/cyfms/CYFMSDropdown";
import CYFMSInput from "../../components/cyfms/CYFMSInput";
import CYFMSLayout from "../../components/cyfms/CYFMSLayout";
import { Box, Button, Typography } from "@mui/material";
import type { FormEvent, ReactElement } from "react";

/**
 * The CYFMSWorker functional component.
 * @returns CYFMSWorker component skeleton.
 */
const CYFMSWorker = (): ReactElement => {
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
        <Typography>Record 1</Typography>
        <CYFMSDropdown id="cyfmsWorkerRole" value="Role" />
        <CYFMSInput id="cyfmsWorkerName" value="Name" />
        <CYFMSInput id="cyfmsWorkerContactInfo" value="Contact Information" />
        <Button variant="contained">Add More</Button>
        <Button variant="contained" type="submit">
          Next
        </Button>
      </Box>
    </CYFMSLayout>
  );
};

export default CYFMSWorker;
