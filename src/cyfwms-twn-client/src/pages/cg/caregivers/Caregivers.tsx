import { CYFSWMSSaveButton } from "../../../components/CYFSWMSButtons";
import Input from "../../../components/Input";
import CgLayout from "../../../components/cg/CgLayout";
import CYFMSDropdown from "../../../components/cyfms/CYFMSDropdown";
import CYFMSTextArea from "../../../components/cyfms/CYFMSTextArea";
import { onKeyDown } from "../../../library/app";
import { useAppDispatch, useAppSelector } from "../../../library/hooks";
import { handleEffect, handleSubmit } from "./caregivers_";
import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { FC, FormEvent } from "react";

/**
 * `CG` aka `Caregivers` module.
 * Sub page: `Caregivers`.
 * @returns `ReactElement`
 */
const Caregivers: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const cgCareProviderId = useAppSelector(
    (state) => state.cgCareProvider
  );
  const {
    cgBgCheckStatus
  } = useAppSelector((state) => state.codetable);
  const state = useAppSelector((state) => state.cgCaregivers);

  useEffect(() => handleEffect(dispatch, cgCareProviderId.data.id || cgCareProviderId.getData.id ), []);

  return (
    <CgLayout>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem 0",
          "> div": { display: "flex", gap: "0 1rem" },
          "> div > div": { flex: "1 1 0" },
        }}
        onSubmit={(event: FormEvent<HTMLFormElement>) =>
          handleSubmit(event, navigate, dispatch, cgCareProviderId.data.id || cgCareProviderId.getData.id, state.data)
        }
        onKeyDown={onKeyDown}
      >
        <Typography variant="body1" color="primary">
          Primary Caregiver
        </Typography>
        <div>
          <div>
            <CYFMSDropdown
              autofill={state.data.priBGCheckStatus}
              id="priBgCheckStatus"
              value="Background Check Status"
              optionsList={Object.values(cgBgCheckStatus).map(
                (cgStatus: any) => cgStatus.en
              )}
            />
          </div>
          <div>
            <Input
              autofill={state.data.priDate}
              id="priDate"
              maxDate={new Date().toISOString().substring(0, 10)}
              minDate="1900-01-01"
              type="date"
              value="Date"
            />
          </div>
        </div>
        <div>
          <CYFMSTextArea
            formLabelFlex="1 1 0"
            outlinedInputFlex="5 1 0"
            autofill={state.data.priDetails}
            id="priDetails"
            value="Details"
          />
        </div>
        <div>
          <CYFMSTextArea
            formLabelFlex="1 1 0"
            outlinedInputFlex="5 1 0"
            autofill={state.data.priTrainingCompleted}
            id="priTrainingsCompleted"
            value="Training(s) Completed"
          />
        </div>
        <Typography variant="body1" color="primary">
          Secondary Caregiver
        </Typography>
        <div>
          <div>
            <CYFMSDropdown
              autofill={state.data.secBGCheckStatus}
              id="secBgCheckStatus"
              value="Background Check Status"
              optionsList={Object.values(cgBgCheckStatus).map(
                (cgStatus: any) => cgStatus.en
              )}
            />
          </div>
          <div>
            <Input
              autofill={state.data.secDate}
              id="secDate"
              maxDate={new Date().toISOString().substring(0, 10)}
              minDate="1900-01-01"
              type="date"
              value="Date"
            />
          </div>
        </div>
        <div>
          <CYFMSTextArea
            formLabelFlex="1 1 0"
            outlinedInputFlex="5 1 0"
            autofill={state.data.secDetails}
            id="secDetails"
            value="Details"
          />
        </div>
        <div>
          <CYFMSTextArea
            formLabelFlex="1 1 0"
            outlinedInputFlex="5 1 0"
            autofill={state.data.secTrainingCompleted}
            id="secTrainingsCompleted"
            value="Training(s) Completed"
          />
        </div>
        <Box sx={{ display: "flex", justifyContent: "right" }}>
          <CYFSWMSSaveButton />
        </Box>
      </Box>
    </CgLayout>
  );
};

export default Caregivers;
