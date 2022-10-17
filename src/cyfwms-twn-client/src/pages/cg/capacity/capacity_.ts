import { doGet, doPost } from "../../../features/cg/capacity/slice";
import type { Capacity } from "../../../features/cg/capacity/slice";
import type { AppDispatch } from "../../../library/store";
import type { SyntheticEvent } from "react";
import type { NavigateFunction } from "react-router-dom";

/**
 * Callback of useEffect hook.
 * @param dispatch - Redux action dispatcher
 * @param cgCareProviderId - `CG` Module Care Provider ID
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
 * Callback of onChange event.
 * @param event - React's synthetic form event object
 */
export const handleChange = (event: SyntheticEvent<HTMLFormElement>) => {
  event.currentTarget.availableCapacity.value =
    event.currentTarget.maximumCapacity.value -
    event.currentTarget.currentUtilization.value;
  event.currentTarget.currentUtilization.max =
    event.currentTarget.maximumCapacity.value;
};

/**
 * Callback of onSubmit event.
 * @param event - React's synthetic form event object
 * @param dispatch - Redux action(s) dispatcher
 * @param cgCareProviderId
 * @param data - Redux store data
 */
export const handleSubmit: AppFormEventHandler<HTMLFormElement> = (
  event,
  navigate: NavigateFunction,
  dispatch: AppDispatch,
  careProviderId: number,
  data: Capacity
) => {
  event.preventDefault();
  const formData: Capacity = {
    cgCapacityId: data.cgCapacityId,
    cgProviderId: careProviderId,
    maximumCap: Number(event.currentTarget.maximumCapacity.value),
    currUtil: Number(event.currentTarget.currentUtilization.value),
    currUtilDetails: event.currentTarget.currentUtilizationDetails.value,
    preferences: event.currentTarget.preferences.value,
  };
  dispatch(doPost(formData))
    .unwrap()
    .then(() => {
      navigate("../caregivers");
    })
    .catch((err) => {
      console.log(err);
    });
};
