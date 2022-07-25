import { CYFSWMSSaveButton } from "../../components/CYFSWMSButtons";
import ICLayout from "../../components/initialContact/ICLayout";
import ICDropdown from "../../components/initialContact/ICDropdown";
import Inpatient from "../../components/initialContact/Inpatient";
import Outpatient from "../../components/initialContact/Outpatient";
import { cleanState as cleanFileDetailsState } from "../../features/initialContact/fileDetails/icFdSlice";
import { cleanState as cleanIncidentReportState } from "../../features/initialContact/incidentReport/icIrSlice";
import {
  cleanState as cleanPatientCareInformationState,
  doGet,
  doPost,
} from "../../features/initialContact/patientCareInformation/slice";
import { cleanState as cleanPresentConcernsState } from "../../features/initialContact/presentConcerns/slice";
import { cleanState as cleanReferralInformationState } from "../../features/initialContact/referralInformation/icRiSlice";
import { uninitiate } from "../../features/initiatorSlice";
import { hideTabs } from "../../features/navBarSlice";
import { useAppDispatch, useAppSelector } from "../../library/hooks";
import { PopupContext } from "./InitialContact";
import { Box } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import type { Data } from "../../features/initialContact/patientCareInformation/slice";
import type { FormEvent, ReactElement } from "react";

/**
 * The ICPatientCareInformation functional component.
 * @returns ICPatientCareInformation component skeleton.
 */
const ICPatientCareInformation = (): ReactElement => {
  const popupContext = useContext(PopupContext);
  const dispatch = useAppDispatch();
  const initialContactID = useAppSelector(
    (state) => state.icFileDetails.data.fileDetailsId
  );
  const data = useAppSelector((state) => state.icPatientCareInformation.data);

  const [typeOfPatient, setTypeOfPatient] = useState("Outpatient");

  useEffect(() => {
    dispatch(doGet(initialContactID))
      .unwrap()
      .then((data) => {
        console.log("PatientCareInformation GET backend API was successful!");
      })
      .catch((err) => {
        console.log("PatientCareInformation GET backend API didn't work!");
        console.log(err);
      });
  }, []);

  // Handles the form data submission and other
  // activities.
  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    const form: any = e.currentTarget;
    const formData: Data = {
      fileDetailsId: initialContactID,
      patientCareInfoId: data.patientCareInfoId,
      typeOfPatient: form.typeOfPatient.value,
      inpatient: {
        hospitalizationRecord: form.hospitalizationRecord
          ? form.hospitalizationRecord.value
          : data.inpatient.hospitalizationRecord,
        hospitalizationReasons: form.hospitalizationReasons
          ? form.hospitalizationReasons.value
          : data.inpatient.hospitalizationReasons,
      },
      outpatient: {
        therapyOrCounseling: form.therapyOrCounseling
          ? form.therapyOrCounseling.value
          : data.outpatient.therapyOrCounseling,
        therapyTimePeriod: form.therapyTimePeriod
          ? form.therapyTimePeriod.value
          : data.outpatient.therapyTimePeriod,
        therapyLocation: form.therapyLocation
          ? form.therapyLocation.value
          : data.outpatient.therapyLocation,
        reasonForTherapy: form.reasonForTherapy
          ? form.reasonForTherapy.value
          : data.outpatient.reasonForTherapy,
        selfHelpGroup: form.selfHelpGroup
          ? form.selfHelpGroup.value
          : data.outpatient.selfHelpGroup,
        selfHelpGroupPeriod: form.selfHelpGroupPeriod
          ? form.selfHelpGroupPeriod.value
          : data.outpatient.selfHelpGroupPeriod,
        selfHelpGroupLocation: form.selfHelpGroupLocation
          ? form.selfHelpGroupLocation.value
          : data.outpatient.selfHelpGroupLocation,
      },
    };
    dispatch(doPost(formData))
      .unwrap()
      .then(() => {
        dispatch(cleanFileDetailsState(null));
        dispatch(cleanReferralInformationState(null));
        dispatch(cleanIncidentReportState(null));
        dispatch(cleanPresentConcernsState(null));
        dispatch(cleanPatientCareInformationState(null));
        console.log("PatientCareInformation POST backend API was successful!");
        popupContext.setOpen(false);
        dispatch(hideTabs(null));
        dispatch(uninitiate(null));
      })
      .catch((err) => {
        console.log("PatientCareInformation POST backend API didn't work!");
        console.log(err);
      });
  };

  // Handles the form fields' value changes
  // and other activities.
  const changeHandler = (e: FormEvent) => {
    e.preventDefault();
    const form: any = e.currentTarget;
    form.typeOfPatient.value === "Inpatient"
      ? setTypeOfPatient("Inpatient")
      : setTypeOfPatient("Outpatient");
  };

  return (
    <ICLayout>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem 0",
        }}
        onSubmit={submitHandler}
        onChange={changeHandler}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem 0" }}>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
            <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
              <ICDropdown
                autofill={data.typeOfPatient}
                id="typeOfPatient"
                value="Type of Patient"
                optionsList={["Outpatient", "Inpatient"]}
              />
            </Box>
            <Box sx={{ flexBasis: 0, flexGrow: 1 }}></Box>
          </Box>
          {typeOfPatient === "Outpatient" ? <Outpatient /> : <Inpatient />}
        </Box>
        <Box sx={{ display: "flex", justifyContent: "right" }}>
          <CYFSWMSSaveButton />
        </Box>
      </Box>
    </ICLayout>
  );
};

export default ICPatientCareInformation;
