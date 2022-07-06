import { CYFSWMSSaveButton } from "../../components/CYFSWMSButtons";
import CYFMSInput from "../../components/cyfms/CYFMSInput";
import CYFMSLayout from "../../components/cyfms/CYFMSLayout";
import {
  doGetOtherInformation,
  doPostOtherInformation,
} from "../../features/cyfms/otherInformation/otherInformationSlice";
import { PopupContext } from "./CYFMS";
import { Box, Typography } from "@mui/material";
import type { FormEvent, ReactElement } from "react";
import { useAppDispatch, useAppSelector } from "../../library/hooks";
import React, { useContext, useEffect, useState } from "react";

/**
 * The CYFMSOtherInformation functional component.
 * @returns CYFMSOtherInformation component skeleton.
 */
const CYFMSOtherInformation = (): ReactElement => {
  const popupContext = useContext(PopupContext);
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
      strength: data.otherInformation_Strengths.value,
      weakness: data.otherInformation_Weaknesses.value,
      skills: data.otherInformation_Skills.value,
      experiences: data.otherInformation_Experiences.value,
      effectiveCopingSkills: data.otherInformation_EffectiveCopingSkills.value,
    };
    dispatch(doPostOtherInformation({ user: newOtherInformation })).then(
      () => {
        console.log("OtherInformation data has been posted!");
        // TODO: And also perform other store cleanups
        popupContext.setOpen(false);
      },
      (err) => {
        console.log("EducationAndEmployment data NOT posted!");
        console.log(err);
      }
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
      >
        <Typography variant="body1" color="primary">
          Other Information
        </Typography>
        <CYFMSInput
          id="otherInformation_Strengths"
          value="Strengths"
          autofil={readData.strengths}
        />
        <CYFMSInput
          id="otherInformation_Weaknesses"
          value="Weaknesses"
          autofill={readData.weakness}
        />
        <CYFMSInput
          id="otherInformation_Skills"
          value="Skills"
          autofill={readData.skills}
        />
        <CYFMSInput
          id="otherInformation_Experiences"
          value="Experiences"
          autofill={readData.experiences}
        />
        <CYFMSInput
          id="otherInformation_EffectiveCopingSkills"
          value="Effective Coping Skills"
          autofill={readData.experiences}
        />
        <Box sx={{ display: "flex", justifyContent: "right" }}>
          <CYFSWMSSaveButton />
        </Box>
      </Box>
    </CYFMSLayout>
  );
};

export default CYFMSOtherInformation;
