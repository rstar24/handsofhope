import {
  CYFSWMSAddButton,
  CYFSWMSNextButton,
} from "../../../components/CYFSWMSButtons";
import Input from "../../../components/Input";
import CYFMSLayout from "../../../components/cyfms/CYFMSLayout";
import CYFMSTextArea from "../../../components/cyfms/CYFMSTextArea";
import RecordList from "../../../components/cyfms/criminalHistory/RecordList";
import {
  flipProbation,
  flipParole,
} from "../../../features/cyfms/criminalHistory/slice";
import { onKeyDown } from "../../../library/app";
import { useAppDispatch, useAppSelector } from "../../../library/hooks";
import { handleEffect, handleAddMore, handleSubmit } from "./criminalHistory_";
import { Box, Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
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

  useEffect(() => handleEffect(dispatch, participantID), []);

  return (
    <CYFMSLayout>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem 0",
        }}
        onSubmit={(event: FormEvent<HTMLFormElement>) =>
          handleSubmit(event, navigate, dispatch, participantID, data)
        }
        ref={formRef}
        onKeyDown={onKeyDown}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem 0" }}>
          <RecordList list={data.criminalHistoryRecordList} />
        </Box>
        <Box>
          <CYFSWMSAddButton
            onClick={(event: MouseEvent) =>
              handleAddMore(event, dispatch, formRef.current, data)
            }
          />
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
