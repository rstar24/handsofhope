import { CYFSWMSNextButton } from "../../../components/CYFSWMSButtons";
import InputNumber from "../../../components/InputNumber";
import CgLayout from "../../../components/cg/CgLayout";
import CYFMSTextArea from "../../../components/cyfms/CYFMSTextArea";
import { onKeyDown } from "../../../library/app";
import { useAppDispatch, useAppSelector } from "../../../library/hooks";
import { handleChange, handleEffect, handleSubmit } from "./capacity_";
import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { FC } from "react";

/**
 * `CG` aka `Caregivers` module.
 * Sub page: `Capacity`.
 * @returns `ReactElement`
 */
const Capacity: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const cgCareProviderId = useAppSelector(
    (state) => state.cgCareProvider
  );
  const state = useAppSelector((state) => state.cgCapacity);

  useEffect(() => handleEffect(dispatch, cgCareProviderId.data.id || cgCareProviderId.getData.id), []);

  return (
    <CgLayout>
      <Box
        component="form"
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "1rem 0",
          "> div": { display: "flex", gap: "0 1rem" },
          "> div > div": { flex: "1 1 0" },
        }}
        onSubmit={(event: any) =>
          handleSubmit(event, navigate, dispatch, cgCareProviderId.data.id || cgCareProviderId.getData.id, state.data)
        }
        onKeyDown={onKeyDown}
        onChange={(event: any) => handleChange(event)}
      >
        <div>
          <div>
            <InputNumber
              autofill={state.data.maximumCap}
              id="maximumCapacity"
              value="Maximum Capacity"
              min={0}
            />
          </div>
          <div>
            <InputNumber
              autofill={state.data.currUtil}
              id="currentUtilization"
              value="Current Utilization"
              min={0}
            />
          </div>
        </div>
        <div>
          <div>
            <InputNumber
              autofill={state.data.maximumCap - state.data.currUtil}
              id="availableCapacity"
              value="Available Capacity"
              min={0}
              readOnly={true}
            />
          </div>
          <div></div>
        </div>
        <div>
          <CYFMSTextArea
            formLabelFlex="1 1 0"
            outlinedInputFlex="5 1 0"
            autofill={state.data.currUtilDetails}
            id="currentUtilizationDetails"
            value="Current Utilization Details"
          />
        </div>
        <div>
          <CYFMSTextArea
            formLabelFlex="1 1 0"
            outlinedInputFlex="5 1 0"
            autofill={state.data.preferences}
            id="preferences"
            value="Please Specify your Preferences"
          />
        </div>
        <Box sx={{ justifyContent: "right" }}>
          <CYFSWMSNextButton />
        </Box>
      </Box>
    </CgLayout>
  );
};

export default Capacity;
