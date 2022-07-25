import { CYFSWMSSaveButton } from "../../components/CYFSWMSButtons";
import CYFMSLayout from "../../components/cyfms/CYFMSLayout";
import CYFMSTextArea from "../../components/cyfms/CYFMSTextArea";
import { cleanCodetableState } from "../../features/codetable/codetableSlice";
import { cleanContactState } from "../../features/cyfms/contact/cyfmsContactSlice";
import { cleanCounselorsState } from "../../features/cyfms/counselors/cyfmsCounselorsSlice";
import { cleanCriminalHistoryState } from "../../features/cyfms/criminalHistory/cyfmsCriminalHistorySlice";
import { cleanEducationAndEmploymentState } from "../../features/cyfms/educationAndEmployment/educationAndEmploymentSlice";
import { cleanFamilyPhysiciansState } from "../../features/cyfms/familyPhysicians/cyfmsFamilyPhysiciansSlice";
import { cleanHouseholdMembersState } from "../../features/cyfms/householdMembers/cyfmsHouseholdMembersSlice";
import {
  cleanOtherInformationState,
  doGetOtherInformation,
  doPostOtherInformation,
} from "../../features/cyfms/otherInformation/cyfmsOtherInformationSlice";
import { cleanRegisterState } from "../../features/cyfms/register/cyfmsRegisterSlice";
import { cleanSearchState } from "../../features/search/searchSlice";
import { uninitiate } from "../../features/initiatorSlice";
import { hideTabs } from "../../features/navBarSlice";
import { useAppDispatch, useAppSelector } from "../../library/hooks";
import { PopupContext } from "./CYFMS";
import { Box, Typography } from "@mui/material";
import React, { useContext, useEffect } from "react";
import type { cyfmsOtherInformationData } from "../../features/cyfms/otherInformation/cyfmsOtherInformationSlice";
import type { FormEvent, ReactElement } from "react";

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
  const otherInformationData = useAppSelector(
    (state: any) => state.cyfmsOtherInformation.otherInformationData
  );

  useEffect(() => {
    dispatch(doGetOtherInformation(participantId))
      .unwrap()
      .then((otherInformationDataFromAPI) => {
        console.log("otherInformation GET backend API was successful!");
      })
      .catch((err) => {
        console.log("otherInformation GET backend API didn't work!");
        console.log(err);
      });
  }, []);

  // Handles the form data submission and other
  // activities.
  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    const cyfmsOtherInformationForm: any = e.currentTarget;
    const cyfmsOtherInformationFormData: cyfmsOtherInformationData = {
      participantId: participantId,
      participantOtherInfoId: otherInformationData.participantOtherInfoId,
      strength: cyfmsOtherInformationForm.otherInformation_Strengths.value,
      weakness: cyfmsOtherInformationForm.otherInformation_Weaknesses.value,
      skills: cyfmsOtherInformationForm.otherInformation_Skills.value,
      experiences: cyfmsOtherInformationForm.otherInformation_Experiences.value,
      effectiveCopingSkills:
        cyfmsOtherInformationForm.otherInformation_EffectiveCopingSkills.value,
    };
    dispatch(doPostOtherInformation(cyfmsOtherInformationFormData))
      .then(() => {
        dispatch(cleanCodetableState());
        dispatch(cleanContactState(null));
        dispatch(cleanCriminalHistoryState(null));
        dispatch(cleanEducationAndEmploymentState());
        dispatch(cleanFamilyPhysiciansState(null));
        dispatch(cleanHouseholdMembersState(null));
        dispatch(cleanOtherInformationState(null));
        dispatch(cleanRegisterState());
        dispatch(cleanSearchState());
        dispatch(cleanCounselorsState(null));
        console.log("otherInformation POST backend API was successful!");
        popupContext.setOpen(false);
        dispatch(hideTabs(null));
        dispatch(uninitiate(null));
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
          id="otherInformation_Strengths"
          value="Strengths"
          autofill={otherInformationData.strength}
        />
        <CYFMSTextArea
          id="otherInformation_Weaknesses"
          value="Weaknesses"
          autofill={otherInformationData.weakness}
        />
        <CYFMSTextArea
          id="otherInformation_Skills"
          value="Skills"
          autofill={otherInformationData.skills}
        />
        <CYFMSTextArea
          id="otherInformation_Experiences"
          value="Experiences"
          autofill={otherInformationData.experiences}
        />
        <CYFMSTextArea
          id="otherInformation_EffectiveCopingSkills"
          value="Effective Coping Skills"
          autofill={otherInformationData.effectiveCopingSkills}
        />
        <Box sx={{ display: "flex", justifyContent: "right" }}>
          <CYFSWMSSaveButton />
        </Box>
      </Box>
    </CYFMSLayout>
  );
};

export default CYFMSOtherInformation;
