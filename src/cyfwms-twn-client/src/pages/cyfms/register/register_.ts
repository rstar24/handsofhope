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
  const formData = new FormData();
  formData.append("referenceId", String(data.referenceId));
  formData.append("participantId", String(data.participantId));
  formData.append("firstName", event.currentTarget.firstName.value);
  formData.append("middleName", event.currentTarget.middleName.value);
  formData.append("lastName", event.currentTarget.lastName.value);
  formData.append("dateOfBirth", event.currentTarget.dateOfBirth.value);
  formData.append("gender", event.currentTarget.gender.value);
  formData.append("maritalStatus", event.currentTarget.maritalStatus.value);
  formData.append("participantImageId", String(data.participantImageId));
  formData.append("image", event.currentTarget.imageFile.files[0]);
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
