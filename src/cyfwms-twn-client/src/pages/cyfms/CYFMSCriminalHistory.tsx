import CYFMSInput from "../../components/cyfms/CYFMSInput";
import {
  doGetCriminalHistory,
  doPostCriminalHistory,
} from "../../features/criminalHistory/criminalhistorySlice";
import CYFMSLayout from "../../components/cyfms/CYFMSLayout";
import { useAppDispatch, useAppSelector } from "../../library/hooks";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import type { FormEvent, ReactElement } from "react";
import CYFMSLongInput from "../../components/cyfms/CYFMSLongInput";
import { Link } from "react-router-dom";

/**
 * The CYFMSCriminalHistory functional component.
 * @returns CYFMSCriminalHistory component skeleton.
 */
const CYFMSCriminalHistory = (): ReactElement => {
  const dispatch = useAppDispatch();
  const participantId = useAppSelector(
    (state) => (state as any).registration.user.participantId
  );
  const readData = useAppSelector(
    (state) => (state as any).criminalHistory.readUser
  );
  const criminalHistoryData = useAppSelector(
    (state) => (state as any).criminalHistory.user
  );
  console.log("criminal ", criminalHistoryData);

  useEffect(() => {
    dispatch(doGetCriminalHistory(participantId));
  }, [criminalHistoryData, dispatch, participantId]);

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    const data: any = e.currentTarget;
    const newCriminalHistory = {
      criminalHistoryId: criminalHistoryData.criminalHistoryId,
      criminalHistoryRecordList: [
        {
          criminalHistoryRecordId: 0,
          charges: data.charges.value,
          arrestDate: data.arrestDate.value,
          conviction: data.conviction.value,
          sentence: data.sentence.value,
        },
      ],
      //probation: data.probation.value,
      //parole: data.parole.value,
      conditions: data.conditions.value,
      courtWorkerAndContactInfo: data.courtContactInfo.value,
      participantId: participantId,
    };

    dispatch(doPostCriminalHistory({ user: newCriminalHistory }));
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
        <Typography sx={{ color: "blue" }}>Record 1</Typography>
        <Grid container sm={12} spacing={2}>
          <Grid item sm={5}>
            <CYFMSInput
              id="arrestDate"
              type="date"
              value="Arrest Date"
              autofill={readData.arrestDate}
            />
          </Grid>
          <Grid item sm={5}>
            <CYFMSInput
              id="charges"
              value="Charges"
              autofill={readData.charges}
            />
          </Grid>
          <Grid item sm={5}>
            <CYFMSInput
              id="conviction"
              value="Conviction"
              autofill={readData.conviction}
            />
          </Grid>
          <Grid item sm={5}>
            <CYFMSInput
              id="sentence"
              value="Sentence"
              autofill={readData.sentence}
            />
          </Grid>
          <Grid item sm={2.2}></Grid>
          <Grid item sm={9.8}>
            <Button variant="contained">Add More</Button>
          </Grid>
        </Grid>

        <Grid container sm={12} spacing={2}>
          <Grid item sm={5}>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox defaultChecked={false} id="probation" />}
                label="Probation"
              />
              <FormControlLabel
                control={<Checkbox defaultChecked={false} id="parole" />}
                label="Parole"
              />
            </FormGroup>
          </Grid>
          <Grid item sm={5}>
            <CYFMSInput
              id="conditions"
              value="Conditions"
              autofill={readData.conditions}
            />
          </Grid>
          <Grid item sm={10}>
            <CYFMSLongInput
              id="courtContactInfo"
              value="Court Worker(s) And Contact Information"
              autofill={readData.courtWorkerAndContactInfo}
              multiline={true}
            />
          </Grid>
          <Grid item sm={9}></Grid>
          <Grid item sm={2}>
            <Button
              variant="contained"
              type="submit"
              component={Link}
              to="/cyfms/family_physician"
            >
              Next
            </Button>
          </Grid>
        </Grid>
      </Box>
    </CYFMSLayout>
  );
};

export default CYFMSCriminalHistory;
