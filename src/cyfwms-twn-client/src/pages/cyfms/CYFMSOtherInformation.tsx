import { Box, Button, Typography } from "@mui/material";
import CYFMSInput from "../../components/cyfms/CYFMSInput";
import CYFMSLayout from "../../components/cyfms/CYFMSLayout";
import type { FormEvent, ReactElement } from "react";
import { useAppDispatch, useAppSelector } from "../../library/hooks";
import React, { useEffect, useState } from "react";
import {
  doGetOtherInformation,
  doPostOtherInformation,
} from "../../features/otherInformation/otherInformationSlice";

/**
 * The CYFMSOtherInformation functional component.
 * @returns CYFMSOtherInformation component skeleton.
 */
const CYFMSOtherInformation = (): ReactElement => {
  const dispatch = useAppDispatch();
  const participantId = useAppSelector(
    (state) => (state as any).registration.user.participantId
  );
  const readData = useAppSelector(
    (state) => (state as any).otherInformation.readUser
  );
  const otherInformationData = useAppSelector(
    (state) => (state as any).otherInformation.user
  );
  useEffect(() => {
    dispatch(doGetOtherInformation(participantId));
  }, [dispatch, otherInformationData, participantId]);

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    const data: any = e.currentTarget;
    const newOtherInformation = {
      participantId: participantId,
      participantOtherInfoId: otherInformationData.participantOtherInfoId,
      strength: data.strengths.value,
      weakness: data.weaknesses.value,
      skills: data.skills.value,
      experiences: data.experiences.value,
      effectiveCopingSkills: data.effectiveCopingSkills.value,
    };

    dispatch(doPostOtherInformation({ user: newOtherInformation }));
  };

  return (
    <CYFMSLayout>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "2rem 2rem",
          mb: "auto",
        }}
        onSubmit={submitHandler}
      >
        <Typography>Other Information</Typography>
        <CYFMSInput
          id="strengths"
          value="Strengths"
          autofill={readData.strength}
        />
        <CYFMSInput
          id="weaknesses"
          value="Weaknesses"
          autofill={readData.weakness}
        />
        <CYFMSInput id="skills" value="Skills" autofill={readData.skills} />
        <CYFMSInput
          id="experiences"
          value="Experiences"
          autofill={readData.experiences}
        />
        <CYFMSInput
          id="effectiveCopingSkills"
          value="Effective Coping Skills"
          autofill={readData.effectiveCopingSkills}
        />
        <Button variant="contained" type="submit">
          Next
        </Button>
      </Box>
    </CYFMSLayout>
  );
};

export default CYFMSOtherInformation;
