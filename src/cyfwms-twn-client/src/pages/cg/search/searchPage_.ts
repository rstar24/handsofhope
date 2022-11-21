import { doGet } from "../../../features/cg/search/slice";
import type { Record } from "../../../features/cg/search/slice";
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
    cgProviderId: null,
    referenceId: form.referenceId.value || null,
    name: form.name.value || null,
    type: form.type.value || null,
    priCaregiver: form.primary_cg.value || null,
    secCaregiver: form.secondary_cg.value || null,
    status: form.status.value || null,
  };
  dispatch(doGet(formData))
    .unwrap()
    .then(() => {
      console.log("CgSearch POST backend API was successful!");
      setIsShown(true);
    })
    .catch((err) => {
      console.log("CgSearch POST backend API didn't work!");
      console.log(err);
    });
};
