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
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import type { FormEvent, ReactElement } from "react";

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
        <Typography>Record 1</Typography>
        <CYFMSInput
          id="arrestDate"
          value="Arrest Date"
          autofill={readData.arrestDate}
        />
        <CYFMSInput id="charges" value="Charges" autofill={readData.charges} />
        <CYFMSInput
          id="conviction"
          value="Conviction"
          autofill={readData.conviction}
        />
        <CYFMSInput
          id="sentence"
          value="Sentence"
          autofill={readData.sentence}
        />
        <Button variant="contained">Add More</Button>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox defaultChecked={false} id="probation" />}
            label="Probation"
          />
          <FormControlLabel
            control={<Checkbox defaultChecked={false} />}
            label="Parole"
          />
        </FormGroup>
        <CYFMSInput
          id="conditions"
          value="Conditions"
          autofill={readData.conditions}
        />
        <CYFMSInput
          id="courtContactInfo"
          value="Court Worker(s) And Contact Information"
          autofill={readData.courtWorkerAndContactInfo}
        />
        <Button variant="contained" type="submit">
          Next
        </Button>
      </Box>
    </CYFMSLayout>
  );
};

export default CYFMSCriminalHistory;
