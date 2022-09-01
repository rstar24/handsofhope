import { doGet, doPost } from "../../../features/cyfms/contact/slice";
import type { Data } from "../../../features/cyfms/contact/slice";
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
  const formData: Data = {
    participantId: participantID,
    participantContactId: data.participantContactId,
    addressLine1: event.currentTarget.addressLine1.value,
    addressLine2: event.currentTarget.addressLine2.value,
    city: event.currentTarget.city.value,
    province: event.currentTarget.province.value,
    postalCode: event.currentTarget.postalCode.value,
    homePhone: event.currentTarget.homePhone.value,
    workPhone: event.currentTarget.workPhone.value,
    cellPhone: event.currentTarget.cellPhone.value,
    emailAddress: event.currentTarget.emailAddress.value,
  };
  dispatch(doPost(formData))
    .unwrap()
    .then(() => {
      navigate("../household_members");
    })
    .catch((err) => {
      console.log(err);
    });
};
