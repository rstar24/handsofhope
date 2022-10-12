import { doGet, doPost } from "../../../features/cg/caregivers/slice";
import type { CaregiversDetails } from "../../../features/cg/caregivers/slice";
import type { AppDispatch } from "../../../library/store";
import type { NavigateFunction } from "react-router-dom";

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
  data: CaregiversDetails
) => {
  event.preventDefault();
  const formData: CaregiversDetails = {
    id: data.id,
    cgCareProviderId: cgCareProviderId,
    priCaregiver: {
      id: data.priCaregiver.id,
      cgCaregiverId: data.id,
      bgCheckStatus: event.currentTarget.priBgCheckStatus.value,
      date: event.currentTarget.priDate.value,
      details: event.currentTarget.priDetails.value,
      trainingsCompleted: event.currentTarget.priTrainingsCompleted.value,
    },
    secCaregiver: {
      id: data.secCaregiver.id,
      cgCaregiverId: data.id,
      bgCheckStatus: event.currentTarget.secBgCheckStatus.value,
      date: event.currentTarget.secDate.value,
      details: event.currentTarget.secDetails.value,
      trainingsCompleted: event.currentTarget.secTrainingsCompleted.value,
    },
  };
  dispatch(doPost(formData))
    .unwrap()
    .then(() => {
      navigate("../contact_notes");
    })
    .catch((err) => {
      console.log(err);
    });
};
