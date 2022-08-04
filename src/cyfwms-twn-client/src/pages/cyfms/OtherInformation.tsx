import { CYFSWMSSaveButton } from "../../components/CYFSWMSButtons";
import CYFMSLayout from "../../components/cyfms/CYFMSLayout";
import CYFMSTextArea from "../../components/cyfms/CYFMSTextArea";
import { doGet, doPost } from "../../features/cyfms/otherInformation/slice";
import { uninitiate } from "../../features/initiatorSlice";
import { hideTabs } from "../../features/navBarSlice";
import { setOpen, setView } from "../../features/popupSlice";
import { useAppDispatch, useAppSelector } from "../../library/hooks";
import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { Data } from "../../features/cyfms/otherInformation/slice";
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

  useEffect(() => {
    dispatch(doGet(participantID))
      .unwrap()
      .then((data) => {
        console.log("OtherInformation GET backend API was successful!");
      })
      .catch((err) => {
        console.log("OtherInformation GET backend API didn't work!");
        console.log(err);
      });
  }, []);

  // Handles the form data submission and other
  // activities.
  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    const form: any = e.currentTarget;
    const formData: Data = {
      participantId: participantID,
      participantOtherInfoId: data.participantOtherInfoId,
      strength: form.strengths.value,
      weakness: form.weaknesses.value,
      skills: form.skills.value,
      experiences: form.experiences.value,
      effectiveCopingSkills: form.effectiveCopingSkills.value,
    };
    dispatch(doPost(formData))
      .then(() => {
        console.log("otherInformation POST backend API was successful!");
        dispatch(setOpen(false));
        dispatch(hideTabs(null));
        dispatch(uninitiate(null));
        if (!edit) {
          dispatch(setView(true));
          navigate("/cyfms/view");
        }
      })
      .catch((err) => {
        console.log("otherInformation POST backend API was successful!");
        console.log(err);
      });
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
