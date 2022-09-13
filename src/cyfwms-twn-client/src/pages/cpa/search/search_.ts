import { doGetMaritalStatus } from "../../../features/codetable/slice";
import { doGet } from "../../../features/cpa/search/slice";
import type { Record } from "../../../features/cpa/search/slice";
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
    CulturalProgramId: null,
    referenceId: event.currentTarget.referenceId.value || null,
    name: event.currentTarget.name.value || null,
    caseworker: event.currentTarget.caseworker.value || null,
    startDate: event.currentTarget.startDate.value || null,
    type: event.currentTarget.type.value || null,
    status: event.currentTarget.status.value || null,
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
