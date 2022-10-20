import { doGet, doPost, GetCareProvider } from "../../../features/cg/careProvider/slice";
import { unhideTabs } from "../../../features/navBarSlice";
import type { CareProvider } from "../../../features/cg/careProvider/slice";
import type { AppDispatch } from "../../../library/store";
import type { NavigateFunction } from "react-router-dom";

/**
 * Callback of useEffect hook.
 * @param dispatch - Redux action(s) dispatcher
 * @param id - Care Provider Id
 */
export const handleEffect = (dispatch: AppDispatch, id: number) => {
  dispatch(doGet(id))
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
  data: GetCareProvider,
  edit: boolean
) => {
  event.preventDefault();
  const formData: CareProvider = {
    id: data.id,
    name: event.currentTarget.naam.value,
    status: event.currentTarget.status.value,
    type: event.currentTarget.type.value,
    otherType: event.currentTarget.otherType.value,
    address: event.currentTarget.address.value,
    city: event.currentTarget.city.value,
    postalCode: event.currentTarget.postalCode.value,
    province: event.currentTarget.province.value,
    phoneNumber: event.currentTarget.phoneNumber.value,
    email: event.currentTarget.eMail.value,
    primaryCaregiver: data.priParticipantId,
    secondaryCaregiver: data.secParticipantId,
  };
  dispatch(doPost(formData))
    .unwrap()
    .then(() => {
      dispatch(unhideTabs(null));
      navigate("../capacity");
    })
    .catch((err) => {
      console.log(err);
    });
};
