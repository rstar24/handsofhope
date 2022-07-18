import {
  CYFSWMSAddButton,
  CYFSWMSNextButton,
} from "../../components/CYFSWMSButtons";
import CYFMSInput from "../../components/cyfms/CYFMSInput";
import CYFMSLayout from "../../components/cyfms/CYFMSLayout";
import CYFMSTextArea from "../../components/cyfms/CYFMSTextArea";
import CYFMSCriminalHistoryRecordList from "../../components/cyfms/records/CYFMSCriminalHistoryRecordList";
import {
  addMoreCriminalHistoryRecord,
  doGetCriminalHistory,
  doPostCriminalHistory,
} from "../../features/cyfms/criminalHistory/cyfmsCriminalHistorySlice";
import { useAppDispatch, useAppSelector } from "../../library/hooks";
import { Box, Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import type {
  cyfmsCHData,
  cyfmsCHRecord,
} from "../../features/cyfms/criminalHistory/cyfmsCriminalHistorySlice";
import type { FormEvent, ReactElement, Ref } from "react";

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
  const data = useAppSelector((state: any) => state.cyfmsCriminalHistory.data);

  // Reference to the form
  const formRef: Ref<HTMLFormElement> = useRef(null);

  useEffect(() => {
    dispatch(doGetCriminalHistory(participantId))
      .unwrap()
      .then((criminalHistoryDataFromAPI) => {
        console.log(criminalHistoryDataFromAPI);
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
    console.log(form.criminalHistory_Probation.value);
    const formData: cyfmsCHData = {
      participantId: participantId,
      criminalHistoryId: data.criminalHistoryId,
      criminalHistoryRecordList: new Array<cyfmsCHRecord>(len),
      probation: form.criminalHistory_Probation.value === "on" ? true : false,
      parole: form.criminalHistory_Parole.value === "on" ? true : false,
      conditions: form.criminalHistory_Conditions.value,
      courtWorkerAndContactInfo:
        form.criminalHistory_CourtWorkersAndContactInformation.value,
    };
    for (let index = 0; index < len; ++index) {
      formData.criminalHistoryRecordList[index] = {
        criminalHistoryRecordId:
          data.criminalHistoryRecordList[index].criminalHistoryRecordId,
        arrestDate:
          form[`criminalHistory_record_${index + 1}_ArrestDate`].value,
        charges: form[`criminalHistory_record_${index + 1}_Charges`].value,
        conviction:
          form[`criminalHistory_record_${index + 1}_Conviction`].value,
        sentence: form[`criminalHistory_record_${index + 1}_Sentence`].value,
      };
    }
    console.log("this is executed by form submission: ", formData);
    dispatch(doPostCriminalHistory(formData))
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
    dispatch(
      addMoreCriminalHistoryRecord({
        criminalHistoryRecordId: 0,
        arrestDate: form[`criminalHistory_record_${len}_ArrestDate`].value,
        charges: form[`criminalHistory_record_${len}_Charges`].value,
        conviction: form[`criminalHistory_record_${len}_Conviction`].value,
        sentence: form[`criminalHistory_record_${len}_Sentence`].value,
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
          {CYFMSCriminalHistoryRecordList(data.criminalHistoryRecordList)}
        </Box>
        <Box>
          <CYFSWMSAddButton onClick={addMoreHandler} />
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
          <FormGroup sx={{ flexBasis: 0, flexGrow: 1 }}>
            <FormControlLabel
              control={
                <Checkbox
                  defaultChecked={data.probation}
                  id="criminalHistory_Probation"
                />
              }
              label="Probation"
            />
            <FormControlLabel
              control={
                <Checkbox
                  defaultChecked={data.parole}
                  id="criminalHistory_Parole"
                />
              }
              label="Parole"
            />
          </FormGroup>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <CYFMSInput
              autofill={data.conditions}
              id="criminalHistory_Conditions"
              value="Condition(s)"
            />
          </Box>
        </Box>
        <CYFMSTextArea
          autofill={data.courtWorkerAndContactInfo}
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
