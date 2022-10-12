import { CYFSWMSNextButton } from "../../../components/CYFSWMSButtons";
import Input from "../../../components/Input";
import InputNumber from "../../../components/InputNumber";
import CgLayout from "../../../components/cg/CgLayout";
import { onKeyDown } from "../../../library/app";
import { useAppDispatch, useAppSelector } from "../../../library/hooks";
import { handleEffect, handleSubmit } from "./capacity_";
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
    (state) => state.cgCareProvider.data.id
  );
  const state = useAppSelector((state) => state.cgCapacity);

  useEffect(() => handleEffect(dispatch, cgCareProviderId), []);

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
          handleSubmit(event, navigate, dispatch, cgCareProviderId, state.data)
        }
        onKeyDown={onKeyDown}
      >
        <div>
          <div>
            <InputNumber
              autofill={state.data.maxCap}
              id="maxCap"
              value="Maximum Capacity"
              min={0}
            />
          </div>
          <div>
            <InputNumber
              autofill={state.data.currUtil}
              id="currUtil"
              value="Current Utilization"
              min={0}
            />
          </div>
        </div>
        <div>
          <div>
            <InputNumber
              autofill={state.data.maxCap - state.data.currUtil}
              id="availableCap"
              value="Available Capacity"
              min={0}
              disabled
            />
          </div>
          <div></div>
        </div>
        <div>
          <Input
            autofill={state.data.currUtilDetails}
            id="currUtilDetails"
            value="Current Utilization Details"
            outlinedInputFlex="5.25 1 0"
          />
        </div>
        <div>
          <Input
            autofill={state.data.preferences}
            id="preferences"
            value="Please Specify your Preferences"
            outlinedInputFlex="5.25 1 0"
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
