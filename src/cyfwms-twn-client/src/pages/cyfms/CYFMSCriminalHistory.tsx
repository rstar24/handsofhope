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
  const id = useAppSelector(
    (state) => (state as any).criminalHistory.user.participantId
  );

  useEffect(() => {
    dispatch(doGetCriminalHistory(id));
  });

  const [contact, setContact] = useState(
    {
      criminalHistoryId: 0,
      criminalHistoryRecordList: [
        {
          criminalHistoryRecordId: 0,
          charges: "",
        },
      ],
      participantId: participantId,
    }

    // {
    // participantId: data.participantId,
    // criminalHistoryId:0,
    // probation: false,
    // parole: false,
    // conditions: "",
    // courtWorkerAndContactInfo: "",
    // //criminalHistoryRecordList:data.criminalHistoryRecordList
    // }
  );
  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    const data: any = e.currentTarget;
    const newContact = {
      criminalHistoryId: 0,
      criminalHistoryRecordList: [
        {
          criminalHistoryRecordId: 0,
          charges: data.charges.value,
        },
      ],
      participantId: participantId,
    };
    setContact(newContact);
    dispatch(doPostCriminalHistory({ user: newContact }));
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
  );
};

export default CYFMSCriminalHistory;
