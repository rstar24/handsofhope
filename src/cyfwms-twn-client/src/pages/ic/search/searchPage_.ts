import { doGet } from "../../../features/initialContact/search/slice";
import type { Record } from "../../../features/initialContact/search/slice";
import type { AppDispatch } from "../../../library/store";
import type { Dispatch, SetStateAction } from "react";

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
  const form: any = event.currentTarget;
  const formData: Record = {
    fileDetailsId: null,
    clientName: form.clientName.value || null,
    fileNumber: form.fileNumber.value || null,
    caseworker: form.caseWorker.value || null,
    startingDate: form.startingDate.value || null,
    status: form.status.value || null,
  };
  dispatch(doGet(formData))
    .unwrap()
    .then(() => {
      console.log("IcSearch POST backend API was successful!");
      setIsShown(true);
    })
    .catch((err) => {
      console.log("IcSearch POST backend API didn't work!");
      console.log(err);
    });
};
