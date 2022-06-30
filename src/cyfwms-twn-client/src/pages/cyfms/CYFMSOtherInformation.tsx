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
  const data = useAppSelector((state) => (state as any).contact.user);
  useEffect(() => {
    dispatch(doGetOtherInformation(participantId));
  }, []);

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    const data: any = e.currentTarget;
    const newOtherInformation = {
      participantId: participantId,
      participantOtherInfoId: 0,
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
        <CYFMSInput id="strengths" value="Strengths" />
        <CYFMSInput id="weaknesses" value="Weaknesses" />
        <CYFMSInput id="skills" value="Skills" />
        <CYFMSInput id="experiences" value="Experiences" />
        <CYFMSInput
          id="effectiveCopingSkills"
          value="Effective Coping Skills"
        />
        <Button variant="contained" type="submit">
          Next
        </Button>
      </Box>
    </CYFMSLayout>
  );
};

export default CYFMSOtherInformation;
