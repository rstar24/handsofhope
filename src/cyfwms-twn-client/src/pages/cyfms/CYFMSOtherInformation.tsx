import { CYFSWMSSaveButton } from "../../components/CYFSWMSButtons";
import CYFMSTextArea from "../../components/cyfms/CYFMSTextArea";
import CYFMSLayout from "../../components/cyfms/CYFMSLayout";
import {
  cleanOtherInformationState,
  doGetOtherInformation,
  doPostOtherInformation,
} from "../../features/cyfms/otherInformation/otherInformationSlice";
import { PopupContext } from "./CYFMS";
import { Box, Typography } from "@mui/material";
import type { FormEvent, ReactElement } from "react";
import { useAppDispatch, useAppSelector } from "../../library/hooks";
import React, { useContext, useEffect } from "react";
import { cleanCodetableState } from "../../features/codetable/codetableSlice";
import { cleanContactState } from "../../features/cyfms/contact/cyfmsContactSlice";
import { cleanCriminalHistoryState } from "../../features/cyfms/criminalHistory/criminalhistorySlice";
import { cleanEducationAndEmploymentState } from "../../features/cyfms/educationAndEmployment/educationAndEmploymentSlice";
import { cleanFamilyPhysiciansState } from "../../features/cyfms/familyPhysicians/cyfmsFamilyPhysiciansSlice";
import { cleanHouseholdMembersState } from "../../features/cyfms/householdMembers/cyfmsHouseholdMembersSlice";
import { cleanRegisterState } from "../../features/cyfms/register/cyfmsRegisterSlice";
import { cleanSearchState } from "../../features/search/searchSlice";
import { cleanCounselorsState } from "../../features/cyfms/counselors/cyfmsCounselorsSlice";

/**
 * The CYFMSOtherInformation functional component.
 * @returns CYFMSOtherInformation component skeleton.
 */
const CYFMSOtherInformation = (): ReactElement => {
  const popupContext = useContext(PopupContext);
  const dispatch = useAppDispatch();
  const participantId = useAppSelector(
    (state) => (state as any).cyfmsRegister.user.participantId
  );
  const readData = useAppSelector(
    (state) => (state as any).otherInformation.readUser
  );
  const otherInformationData = useAppSelector(
    (state) => (state as any).otherInformation.user
  );
  console.log(readData);
  useEffect(() => {
    dispatch(doGetOtherInformation(participantId));
  }, [dispatch, otherInformationData, participantId]);

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    const data: any = e.currentTarget;
    const newOtherInformation = {
      participantId: participantId,
      participantOtherInfoId: 0,
      strength: data.otherInformation_Strengths.value,
      weakness: data.otherInformation_Weaknesses.value,
      skills: data.otherInformation_Skills.value,
      experiences: data.otherInformation_Experiences.value,
      effectiveCopingSkills: data.otherInformation_EffectiveCopingSkills.value,
    };
    dispatch(doPostOtherInformation({ user: newOtherInformation }))
      .then(
        () => {
          console.log("OtherInformation data has been posted!");
          // TODO: And also perform other store cleanups
          popupContext.setOpen(false);
        },
        (err) => {
          console.log("EducationAndEmployment data NOT posted!");
          console.log(err);
        }
      )
      .then(() => {
        dispatch(cleanCodetableState());
        dispatch(cleanContactState);
        dispatch(cleanCriminalHistoryState());
        dispatch(cleanEducationAndEmploymentState());
        dispatch(cleanFamilyPhysiciansState);
        dispatch(cleanHouseholdMembersState);
        dispatch(cleanOtherInformationState());
        dispatch(cleanRegisterState());
        dispatch(cleanSearchState());
        dispatch(cleanCounselorsState);
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
          id="otherInformation_Strengths"
          value="Strengths"
          autofil={readData.strengths}
        />
        <CYFMSTextArea
          id="otherInformation_Weaknesses"
          value="Weaknesses"
          autofill={readData.weakness}
        />
        <CYFMSTextArea
          id="otherInformation_Skills"
          value="Skills"
          autofill={readData.skills}
        />
        <CYFMSTextArea
          id="otherInformation_Experiences"
          value="Experiences"
          autofill={readData.experiences}
        />
        <CYFMSTextArea
          id="otherInformation_EffectiveCopingSkills"
          value="Effective Coping Skills"
          autofill={readData.effectiveCopingSkills}
        />
        <Box sx={{ display: "flex", justifyContent: "right" }}>
          <CYFSWMSSaveButton />
        </Box>
      </Box>
    </CYFMSLayout>
  );
};

export default CYFMSOtherInformation;
