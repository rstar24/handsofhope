import Popup from "../../components/Popup";
import AuthLayout from "../../components/auth/layout/AuthLayout";
import ICHeader from "../../components/initialContact/ICHeader";
import Router from "../../components/nestedRouters/InitialContact";
import {
  doGetICMentalHealthOrSubstanceAbuse,
  doGetICPresentConcerns,
  doGetICReferral,
  doGetICRisk,
  doGetICStatus,
  doGetICTypeOfPatient,
} from "../../features/codetable/slice";
import { setOpen as setOpenPopup } from "../../features/popupSlice";
import { useAppDispatch } from "../../library/hooks";
import { Box, Button } from "@mui/material";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import type { ReactElement } from "react";
import { cleanState as cleanContactState } from "../../features/cyfms/contact/slice";
import { cleanState as cleanCounselorsState } from "../../features/cyfms/counselors/slice";
import { cleanState as cleanCriminalHistoryState } from "../../features/cyfms/criminalHistory/slice";
import { cleanState as cleanEducationAndEmploymentState } from "../../features/cyfms/educationAndEmployment/slice";
import { cleanState as cleanFamilyPhysiciansState } from "../../features/cyfms/familyPhysicians/slice";
import { cleanState as cleanHouseholdMembersState } from "../../features/cyfms/householdMembers/slice";
import { cleanState as cleanOtherInformationState } from "../../features/cyfms/otherInformation/slice";
import { cleanState as cleanRegisterState } from "../../features/cyfms/register/slice";
import { cleanState as cleanFileDetailsState } from "../../features/initialContact/fileDetails/slice";
import { cleanState as cleanIncidentReportState } from "../../features/initialContact/incidentReport/slice";
import { cleanState as cleanPatientCareInformationState } from "../../features/initialContact/patientCareInformation/slice";
import { cleanState as cleanPresentConcernsState } from "../../features/initialContact/presentConcerns/slice";
import { cleanState as cleanReferralInformationState } from "../../features/initialContact/referralInformation/slice";
import { cleanState as cleanContactNotesState } from "../../features/initialContact/contactNotes/slice";
import { setCalendarView } from "../../features/calendar/slice";

/**
 * The InitialContact functional component.
 * @returns InitialContact component skeleton.
 */
const InitialContact = (): ReactElement => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Load all the code tables:
    dispatch(doGetICStatus());
    dispatch(doGetICReferral());
    dispatch(doGetICRisk());
    dispatch(doGetICTypeOfPatient());
    dispatch(doGetICMentalHealthOrSubstanceAbuse());
    dispatch(doGetICPresentConcerns());
  }, []);
  const cleanStore = () => {
    // CYFMS
    dispatch(cleanRegisterState(null));
    dispatch(cleanContactState(null));
    dispatch(cleanHouseholdMembersState(null));
    dispatch(cleanEducationAndEmploymentState(null));
    dispatch(cleanCriminalHistoryState(null));
    dispatch(cleanFamilyPhysiciansState(null));
    dispatch(cleanCounselorsState(null));
    dispatch(cleanOtherInformationState(null));
    // Initial Contact
    dispatch(cleanFileDetailsState(null));
    dispatch(cleanReferralInformationState(null));
    dispatch(cleanIncidentReportState(null));
    dispatch(cleanPresentConcernsState(null));
    dispatch(cleanPatientCareInformationState(null));
    dispatch(cleanContactNotesState(null));
  };

  return (
    <AuthLayout>
      <ICHeader />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          py: "3rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            maxWidth: 300,
            rowGap: "1rem",
          }}
        >
          <Button
            component={Link}
            to="/initial_contact/file_details"
            sx={{
              background: "lightgrey",
              color: "black",
              border: "1px solid black",
            }}
            onClick={() => {
              cleanStore();
              dispatch(setOpenPopup(true));
              dispatch(setCalendarView(false));
            }}
          >
            Add an Initial Contact File
          </Button>
          <Button
            component={Link}
            to="/initial_contact/search"
            sx={{
              background: "lightgrey",
              color: "black",
              border: "1px solid black",
            }}
          >
            Search for an Initial Contact File
          </Button>
        </Box>
      </Box>
      <Popup children={<Router />} />
    </AuthLayout>
  );
};

export default InitialContact;
