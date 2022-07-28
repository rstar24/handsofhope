import { CYFSWMSSaveButton } from "../../components/CYFSWMSButtons";
import CYFMSLayout from "../../components/cyfms/CYFMSLayout";
import CYFMSTextArea from "../../components/cyfms/CYFMSTextArea";
import { cleanState as cleanContactState } from "../../features/cyfms/contact/slice";
import { cleanState as cleanCounselorsState } from "../../features/cyfms/counselors/slice";
import { cleanState as cleanCriminalHistoryState } from "../../features/cyfms/criminalHistory/slice";
import { cleanState as cleanEducationAndEmploymentState } from "../../features/cyfms/educationAndEmployment/slice";
import { cleanState as cleanFamilyPhysiciansState } from "../../features/cyfms/familyPhysicians/slice";
import { cleanState as cleanHouseholdMembersState } from "../../features/cyfms/householdMembers/slice";
import {
  cleanState as cleanOtherInformationState,
  doGet,
  doPost,
} from "../../features/cyfms/otherInformation/slice";
import { cleanState as cleanRegisterState } from "../../features/cyfms/register/slice";
import { cleanSearchState } from "../../features/search/searchSlice";
import { uninitiate } from "../../features/initiatorSlice";
import { hideTabs } from "../../features/navBarSlice";
import { useAppDispatch, useAppSelector } from "../../library/hooks";
import { PopupContext } from "./CYFMS";
import { Box, Typography } from "@mui/material";
import React, { useContext, useEffect } from "react";
import type { Data } from "../../features/cyfms/otherInformation/slice";
import type { FormEvent, ReactElement } from "react";

/**
 * The CYFMSOtherInformation functional component.
 * @returns CYFMSOtherInformation component skeleton.
 */
const CYFMSOtherInformation = (): ReactElement => {
  const popupContext = useContext(PopupContext);
  const dispatch = useAppDispatch();
  const participantID = useAppSelector(
    (state) => state.cyfmsRegister.data.participantId
  );
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
        dispatch(cleanRegisterState(null));
        dispatch(cleanContactState(null));
        dispatch(cleanHouseholdMembersState(null));
        dispatch(cleanEducationAndEmploymentState(null));
        dispatch(cleanCriminalHistoryState(null));
        dispatch(cleanFamilyPhysiciansState(null));
        dispatch(cleanOtherInformationState(null));
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
          autofill={data.strength}
          id="strengths"
          value="Strengths"
        />
        <CYFMSTextArea
          autofill={data.weakness}
          id="weaknesses"
          value="Weaknesses"
        />
        <CYFMSTextArea autofill={data.skills} id="skills" value="Skills" />
        <CYFMSTextArea
          autofill={data.experiences}
          id="experiences"
          value="Experiences"
        />
        <CYFMSTextArea
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

export default CYFMSOtherInformation;
