import { doGetMaritalStatus } from "../../../features/codetable/slice";
import { doGet } from "../../../features/cyfms/search/slice";
import type { Record } from "../../../features/cyfms/search/slice";
import type { AppDispatch } from "../../../library/store";
import type { Dispatch, SetStateAction } from "react";

/**
 * Callback of useEffect hook.
 * @param dispatch - Redux action(s) dispatcher
 */
export const handleEffect: AppEffectCallback = (dispatch: AppDispatch) => {
  dispatch(doGetMaritalStatus());
};

/**
 * Callback of onSubmit event.
 * @param event - form event object
 * @param dispatch - Redux action(s) dispatcher
 * @param setIsShown - TODO: ADD DESCRIPTION HERE
 */
export const handleSubmit: AppFormEventHandler<HTMLFormElement> = (
  event,
  dispatch: AppDispatch,
  setIsShown: Dispatch<SetStateAction<boolean>>
) => {
  event.preventDefault();
  const formData: Record = {
    participantId: null,
    referenceId: event.currentTarget.referenceId.value || null,
    firstname: event.currentTarget.firstName.value || null,
    surname: event.currentTarget.lastName.value || null,
    middleName: event.currentTarget.middleName.value || null,
    dateOfBirth: event.currentTarget.dateOfBirth.value || null,
    maritalStatus: event.currentTarget.maritalStatus.value || null,
    city: event.currentTarget.city.value || null,
    workPhone: event.currentTarget.phoneNo.value || null,
  };
  dispatch(doGet(formData))
    .unwrap()
    .then(() => {
      console.log("CYFMS Search POST backend API was successful!");
      setIsShown(true);
    })
    .catch((err) => {
      console.log("InitialContact Search POST backend API didn't work!");
      console.log(err);
    });
};
