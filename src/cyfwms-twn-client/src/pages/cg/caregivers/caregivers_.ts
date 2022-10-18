import {
  Caregiver,
  doGet,
  doPost,
} from "../../../features/cg/caregivers/slice";
import type { AppDispatch } from "../../../library/store";
import type { NavigateFunction } from "react-router-dom";
import { hideTabs, unhideTabs } from "../../../features/navBarSlice";
import { initiate, uninitiate } from "../../../features/initiatorSlice";
import { setOpen, setView } from "../../../features/popupSlice";

/**
 * Callback of useEffect hook.
 * @param dispatch - Redux action(s) dispatcher
 * @param cgCareProviderId - Care Provider ID
 */
export const handleEffect = (
  dispatch: AppDispatch,
  cgCareProviderId: number
) => {
  dispatch(doGet(cgCareProviderId))
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
 * @param cgCareProviderId - Care Provider ID
 * @param data - Redux store data
 */
export const handleSubmit: AppFormEventHandler<HTMLFormElement> = (
  event,
  navigate: NavigateFunction,
  dispatch: AppDispatch,
  cgCareProviderId: number,
  data: Caregiver
) => {
  event.preventDefault();

  const formData: Caregiver = {
    cgProviderId: cgCareProviderId,
    cgBackGroundCheckId: data.cgBackGroundCheckId | 0,
    priBGCheckStatus: event.currentTarget.priBgCheckStatus.value,
    priDate: event.currentTarget.priDate.value,
    priDetails: event.currentTarget.priDetails.value,
    priTrainingCompleted: event.currentTarget.priTrainingsCompleted.value,
    secBGCheckStatus: event.currentTarget.secBgCheckStatus.value,
    secDate: event.currentTarget.secDate.value,
    secDetails: event.currentTarget.secDetails.value,
    secTrainingCompleted: event.currentTarget.secTrainingsCompleted.value,
  };
  dispatch(doPost(formData))
    .unwrap()
    .then(() => {
      dispatch(unhideTabs(null));
      dispatch(initiate(null));
      dispatch(setOpen(false));
      dispatch(hideTabs(null));
      dispatch(uninitiate(null));
      dispatch(setView(true));
      navigate("/cg/view");
    })
    .catch((err) => {
      console.log(err);
    });
};
