import { CYFSWMSSaveButton } from "../../../components/CYFSWMSButtons";
import CYFMSLayout from "../../../components/cyfms/CYFMSLayout";
import CYFMSTextArea from "../../../components/cyfms/CYFMSTextArea";
import { onKeyDown } from "../../../library/app";
import { useAppDispatch, useAppSelector } from "../../../library/hooks";
import { handleEffect, handleSubmit } from "./otherInformation";
import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { FormEvent, ReactElement } from "react";

/**
 * The OtherInformation functional component.
 * @returns OtherInformation component skeleton.
 */
const OtherInformation = (): ReactElement => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const participantID = useAppSelector(
    (state) => state.cyfmsRegister.data.participantId
  );
  const edit = useAppSelector((state) => state.popup.edit);
  const data = useAppSelector((state) => state.cyfmsOtherInformation.data);

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
          handleSubmit(event, navigate, dispatch, participantID, data, edit)
        }
        onKeyDown={onKeyDown}
      >
        <Typography variant="body1" color="primary">
          Other Information
        </Typography>
        <CYFMSTextArea
          formLabelFlex="1 1 0"
          outlinedInputFlex="5 1 0"
          autofill={data.strength}
          id="strengths"
          value="Strengths"
        />
        <CYFMSTextArea
          formLabelFlex="1 1 0"
          outlinedInputFlex="5 1 0"
          autofill={data.weakness}
          id="weaknesses"
          value="Weaknesses"
        />
        <CYFMSTextArea
          formLabelFlex="1 1 0"
          outlinedInputFlex="5.05 1 0"
          autofill={data.skills}
          id="skills"
          value="Skills"
        />
        <CYFMSTextArea
          formLabelFlex="1 1 0"
          outlinedInputFlex="5 1 0"
          autofill={data.experiences}
          id="experiences"
          value="Experiences"
        />
        <CYFMSTextArea
          formLabelFlex="1 1 0"
          outlinedInputFlex="5 1 0"
          autofill={data.effectiveCopingSkills}
          id="effectiveCopingSkills"
          value="Effective Coping Skills"
        />
        <Box sx={{ display: "flex", justifyContent: "right" }}>
          <CYFSWMSSaveButton />
        </Box>
      </Box>
    </CYFMSLayout>
  );
};

export default OtherInformation;
