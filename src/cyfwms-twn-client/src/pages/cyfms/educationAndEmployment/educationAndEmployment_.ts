import {
  setDesiredProfessionDisabled,
  setSchoolFieldsDisabled,
  doGet,
  doPost,
} from "../../../features/cyfms/educationAndEmployment/slice";
import type { Data } from "../../../features/cyfms/educationAndEmployment/slice";
import type { AppDispatch } from "../../../library/store";
import type { NavigateFunction } from "react-router-dom";

/**
 * Callback of useEffect hook.
 * @param dispatch - Redux action(s) dispatcher
 * @param participantID - Participant ID
 */
export const handleEffect = (dispatch: AppDispatch, participantID: number) => {
  dispatch(doGet(participantID))
    .unwrap()
    .catch((err) => {
      console.log(err);
    });
};

/**
 * Callback of onChange event.
 * @param event - Form event object
 * @param dispatch - Redux action(s) dispatcher
 */
export const handleChange: AppFormEventHandler<HTMLFormElement> = (
  event,
  dispatch: AppDispatch
) => {
  if (event.currentTarget.attendingSchool.value === "Yes") {
    dispatch(setSchoolFieldsDisabled(false));
  } else {
    event.currentTarget.schoolName.value = "";
    event.currentTarget.schoolGrade.value = "";
    dispatch(setSchoolFieldsDisabled(true));
  }
  if (event.currentTarget.typeOfEmployment.value === "Job Search") {
    dispatch(setDesiredProfessionDisabled(false));
  } else {
    event.currentTarget.desiredProfession.value = "";
    dispatch(setDesiredProfessionDisabled(true));
  }
};

/**
 * Callback of onSubmit event.
 * @param event - Form event object
 * @param navigate - React Router navigator
 * @param dispatch - Redux action(s) dispatcher
 * @param participantID - Participant ID
 * @param data - Redux store data
 */
export const handleSubmit: AppFormEventHandler<HTMLFormElement> = (
  event,
  navigate: NavigateFunction,
  dispatch: AppDispatch,
  participantID: number,
  data: Data
) => {
  event.preventDefault();
  const formData = {
    participantId: participantID,
    educationId: data.educationId,
    employmentId: data.employmentId,
    attendingSchool: event.currentTarget.attendingSchool.value,
    school: event.currentTarget.schoolName.value,
    grade: event.currentTarget.schoolGrade.value,
    employed: event.currentTarget.employed.value,
    typeOfEmployment: event.currentTarget.typeOfEmployment.value,
    desiredProfession: event.currentTarget.desiredProfession.value,
  };
  dispatch(doPost(formData))
    .unwrap()
    .then(() => {
      navigate("../criminal_history");
    })
    .catch((err) => {
      console.log(err);
    });
};
