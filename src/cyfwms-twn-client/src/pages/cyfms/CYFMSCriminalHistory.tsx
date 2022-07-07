import {
  CYFSWMSAddButton,
  CYFSWMSNextButton,
} from "../../components/CYFSWMSButtons";
import CYFMSInput from "../../components/cyfms/CYFMSInput";
import {
  doGetCriminalHistory,
  doPostCriminalHistory,
} from "../../features/cyfms/criminalHistory/criminalhistorySlice";
import CYFMSLayout from "../../components/cyfms/CYFMSLayout";
import CYFMSCriminalHistoryRecordList from "../../components/cyfms/records/CYFMSCriminalHistoryRecordList";
import { useAppDispatch, useAppSelector } from "../../library/hooks";
import { Box, Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { FormEvent, ReactElement } from "react";
import CYFMSTextArea from "../../components/cyfms/CYFMSTextArea";

/**
 * The CYFMSCriminalHistory functional component.
 * @returns CYFMSCriminalHistory component skeleton.
 */
const CYFMSCriminalHistory = (): ReactElement => {
  const navigate = useNavigate();
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

  // State for the records list
  const [recordList, setRecordList] = useState([{}]);

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

    dispatch(doPostCriminalHistory({ user: newCriminalHistory })).then(() => {
      navigate("/cyfms/family_physician");
    });
  };

  const addMoreHandler = (e: MouseEvent) => {
    e.preventDefault();
    setRecordList((previousRecordList) => [...previousRecordList, {}]);
  };

  return (
    <CYFMSLayout>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem 0",
        }}
        onSubmit={submitHandler}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem 0" }}>
          {CYFMSCriminalHistoryRecordList(recordList)}
        </Box>
        <Box>
          <CYFSWMSAddButton onClick={addMoreHandler} />
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
          <FormGroup sx={{ flexBasis: 0, flexGrow: 1 }}>
            <FormControlLabel
              control={
                <Checkbox
                  defaultChecked={false}
                  id="criminalHistory_Probation"
                />
              }
              label="Probation"
            />
            <FormControlLabel
              control={
                <Checkbox defaultChecked={false} id="criminalHistory_Parole" />
              }
              label="Parole"
            />
          </FormGroup>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <CYFMSInput
              id="criminalHistory_Conditions"
              value="Conditions"
              autofill={readData.conditions}
            />
          </Box>
        </Box>
        <CYFMSTextArea
          autofill={readData.courtWorkerAndContactInfo}
          id="criminalHistory_CourtWorkersAndContactInformation"
          value="Court Worker(s) And Contact Information"
        />
        <Box sx={{ display: "flex", justifyContent: "right" }}>
          <CYFSWMSNextButton />
        </Box>
      </Box>
    </CYFMSLayout>
  );
};

export default CYFMSCriminalHistory;
