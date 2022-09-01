import { doGet, doPost } from "../../../features/cyfms/register/slice";
import { initiate } from "../../../features/initiatorSlice";
import { unhideTabs } from "../../../features/navBarSlice";
import type { Data } from "../../../features/cyfms/register/slice";
import type { AppDispatch } from "../../../library/store";
import type { NavigateFunction } from "react-router-dom";

/**
 * Callback of useEffect hook.
 * @param dispatch - Redux action(s) dispatcher
 * @param participantID - Participant ID
 */
export const handleEffect: AppEffectCallback = (
  dispatch: AppDispatch,
  participantID: number
) => {
  dispatch(doGet(participantID))
    .unwrap()
    .catch((err) => {
      console.log(err);
    });
};

/**
 * Callback of onSubmit event.
 * @param event - form event object
 * @param navigate - React Router navigator
 * @param dispatch - Redux action(s) dispatcher
 * @param data - Redux store data
 * @param edit - Edit mode?
 */
export const handleSubmit: AppFormEventHandler<HTMLFormElement> = (
  event,
  navigate: NavigateFunction,
  dispatch: AppDispatch,
  data: Data,
  edit: boolean
) => {
  event.preventDefault();
  const formData: Data = {
    referenceId: data.referenceId,
    participantId: data.participantId,
    firstname: event.currentTarget.firstName.value,
    middleName: event.currentTarget.middleName.value,
    surname: event.currentTarget.lastName.value,
    dateOfBirth: event.currentTarget.dateOfBirth.value,
    gender: event.currentTarget.gender.value,
    maritalStatus: event.currentTarget.maritalStatus.value,
  };
  dispatch(doPost(formData))
    .unwrap()
    .then(() => {
      dispatch(unhideTabs(null));
      dispatch(initiate(null));
      if (edit) {
        navigate("../contact");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
