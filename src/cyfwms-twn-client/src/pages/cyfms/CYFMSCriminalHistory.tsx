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
import React, { useEffect, useState, useRef } from "react";
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
    (state) => (state as any).cyfmsRegister.user.participantId
  );
  const readData = useAppSelector(
    (state) => (state as any).criminalHistory.readUser
  );
  const criminalHistoryData = useAppSelector(
    (state) => (state as any).criminalHistory.user
  );

  // State for the records list
  const [recordList, setRecordList] = useState([{}]);

  // Reference to the form
  const formRef = useRef(null);

  useEffect(() => {
    dispatch(doGetCriminalHistory(participantId))
      .unwrap()
      .then((recordListFromAPI) => {
        setRecordList((previousRecordList) => [
          ...previousRecordList,
          ...recordListFromAPI,
        ]);
      })
      .catch((err) => {
        console.log("CriminalHistory backend API didn't work");
        console.log(err);
      });
  }, []);

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

    dispatch(doPostCriminalHistory({ user: newCriminalHistory }))
      .unwrap()
      .then(() => {
        console.log("CriminalHistory data has been posted!");
        navigate("/cyfms/family_physician");
      })
      .catch((err) => {
        console.log("CriminalHistory data NOT posted!");
        console.log(err);
      });
  };

  const addMoreHandler = (e: MouseEvent) => {
    e.preventDefault();
    if (recordList.length >= 1) {
      setRecordList((previousList: any) => [
        ...previousList,
        {
          participantId: participantId,
          householdMemberId: 0,
          name: (formRef.current as any)[`criminalHistory_record_${1}_Arrest`]
            .value,
          gender: (formRef.current as any)[
            `criminalHistory_record_${1}_Charges`
          ].value,
          dateOfBirth: (formRef.current as any)[
            `criminalHistory_record_${1}_Conviction`
          ].value,
          residing: (formRef.current as any)[
            `criminalHistory_record_${1}_Sentence`
          ].value,
        },
      ]);
    } else {
      setRecordList((previousRecordList) => [
        ...previousRecordList,
        {
          criminalHistoryRecordId: 0,
          charges: "",
          arrestDate: "",
          conviction: "",
          sentence: "",
        },
      ]);
    }
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
        ref={formRef}
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
              value="Condition(s)"
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
