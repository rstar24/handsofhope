import { Typography, Box, Button, Checkbox } from "@mui/material";

import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import AuthLayout from "../../components/auth/layout/AuthLayout";
import CYFMSLayout from "../../components/cyfms/CYFMSLayout";
import type { FormEvent, ReactElement } from "react";
import CYFMSInput from "../../components/cyfms/CYFMSInput";

/**
 * The CYFMSCriminalHistory functional component.
 * @returns CYFMSCriminalHistory component skeleton.
 */
const CYFMSCriminalHistory = (): ReactElement => {
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
          <Typography>Record 1</Typography>
          <CYFMSInput id="arrestDate" value="Arrest Date" />
          <CYFMSInput id="charges" value="Charges" />
          <CYFMSInput id="conviction" value="Conviction" />
          <CYFMSInput id="sentence" value="Sentence" />
          <Button variant="contained">Add More</Button>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox defaultChecked={false} />}
              label="Probation"
            />
            <FormControlLabel
              control={<Checkbox defaultChecked={false} />}
              label="Parole"
            />
          </FormGroup>
          <CYFMSInput id="conditions" value="Conditions" />
          <CYFMSInput
            id="courtContactInfo"
            value="Court Worker(s) And Contact Information"
          />
          <Button variant="contained" type="submit">
            Next
          </Button>
        </Box>
      </CYFMSLayout>
    </AuthLayout>
  );
};

export default CYFMSCriminalHistory;
