import {
  CYFSWMSAddButton,
  CYFSWMSNextButton,
} from "../../components/CYFSWMSButtons";
import Input from "../../components/Input";
import CYFMSLayout from "../../components/cyfms/CYFMSLayout";
import CYFMSTextArea from "../../components/cyfms/CYFMSTextArea";
import CriminalHistoryRecordList from "../../components/cyfms/records/CriminalHistoryRecordList";
import {
  flipProbation,
  flipParole,
  addMoreRecord,
  doGet,
  doPost,
} from "../../features/cyfms/criminalHistory/slice";
import { useAppDispatch, useAppSelector } from "../../library/hooks";
import { Box, Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import type { Data, Record } from "../../features/cyfms/criminalHistory/slice";
import type { FormEvent, ReactElement, Ref } from "react";

/**
 * The CriminalHistory functional component.
 * @returns CriminalHistory component skeleton.
 */
const CriminalHistory = (): ReactElement => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const participantID = useAppSelector(
    (state) => state.cyfmsRegister.data.participantId
  );
  const data = useAppSelector((state) => state.cyfmsCriminalHistory.data);

  // Reference to the form
  const formRef: Ref<HTMLFormElement> = useRef(null);

  useEffect(() => {
    dispatch(doGet(participantID))
      .unwrap()
      .then((data) => {
        console.log("CriminalHistory GET backend API was successful!");
      })
      .catch((err) => {
        console.log("CriminalHistory GET backend API didn't work!");
        console.log(err);
      });
  }, []);

  // Handles the form data submission and other
  // activities.
  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    const form: any = e.currentTarget;
    const len = data.criminalHistoryRecordList.length;
    const formData: Data = {
      participantId: participantID,
      criminalHistoryId: data.criminalHistoryId,
      criminalHistoryRecordList: new Array<Record>(len),
      probation: data.probation,
      parole: data.parole,
      conditions: form.conditions.value,
      courtWorkerAndContactInfo: form.courtWorkersAndContactInformation.value,
    };
    for (let index = 0; index < len; ++index) {
      formData.criminalHistoryRecordList[index] = {
        criminalHistoryRecordId:
          data.criminalHistoryRecordList[index].criminalHistoryRecordId,
        arrestDate: form[`record_${index + 1}_ArrestDate`].value,
        charges: form[`record_${index + 1}_Charges`].value,
        conviction: form[`record_${index + 1}_Conviction`].value,
        sentence: form[`record_${index + 1}_Sentence`].value,
      };
    }
    dispatch(doPost(formData))
      .unwrap()
      .then(() => {
        console.log("criminalHistory POST backend API was successful!");
        navigate("/cyfms/family_physicians");
      })
      .catch((err) => {
        console.log("criminalHistory POST backend API didn't work!");
        console.log(err);
      });
  };

  const addMoreHandler = (e: MouseEvent) => {
    e.preventDefault();
    const form: any = formRef.current;
    const len = data.criminalHistoryRecordList.length;
    const flag: boolean = data.criminalHistoryRecordList.length > 0;
    dispatch(
      addMoreRecord({
        criminalHistoryRecordId: 0,
        arrestDate: flag ? form[`record_${len}_ArrestDate`].value : "",
        charges: flag ? form[`record_${len}_Charges`].value : "",
        conviction: flag ? form[`record_${len}_Conviction`].value : "",
        sentence: flag ? form[`record_${len}_Sentence`].value : "",
      })
    );
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
          {CriminalHistoryRecordList(data.criminalHistoryRecordList)}
        </Box>
        <Box>
          <CYFSWMSAddButton onClick={addMoreHandler} />
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
          <FormGroup sx={{ flexBasis: 0, flexGrow: 1 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={data.probation}
                  id="probation"
                  onChange={() => dispatch(flipProbation(null))}
                  value="Probation"
                />
              }
              label="Probation"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={data.parole}
                  id="parole"
                  onChange={() => dispatch(flipParole(null))}
                  value="Parole"
                />
              }
              label="Parole"
            />
          </FormGroup>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <Input
              autofill={data.conditions}
              id="conditions"
              value="Condition(s)"
            />
          </Box>
        </Box>
        <CYFMSTextArea
          formLabelFlex="1 1 0"
          outlinedInputFlex="5.05 1 0"
          autofill={data.courtWorkerAndContactInfo}
          id="courtWorkersAndContactInformation"
          value="Court Worker(s) And Contact Information"
        />
        <Box sx={{ display: "flex", justifyContent: "right" }}>
          <CYFSWMSNextButton />
        </Box>
      </Box>
    </CYFMSLayout>
  );
};

export default CriminalHistory;
