import { doGet, doPost } from "../../../features/cg/capacity/slice";
import type { Data } from "../../../features/cg/capacity/slice";
import type { AppDispatch } from "../../../library/store";
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
  cgCareProviderId: number,
  data: Data
) => {
  event.preventDefault();
  const formData: Data = {
    id: data.id,
    cgCareProviderId: cgCareProviderId,
    maxCap: event.currentTarget.maxCap.value,
    currUtil: event.currentTarget.currUtil.value,
    currUtilDetails: event.currentTarget.currUtilDetails.value,
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
