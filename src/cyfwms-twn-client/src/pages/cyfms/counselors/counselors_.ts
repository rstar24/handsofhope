import {
  doGet,
  addMoreRecord,
  doPost,
} from "../../../features/cyfms/counselors/slice";
import type { Data, Record } from "../../../features/cyfms/counselors/slice";
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
 * Callback of "Add More" button.
 * @param event - Mouse event object
 * @param dispatch - Redux action(s) dispatcher
 * @param form - Form node
 * @param participantID - Participant ID
 * @param data - Redux store data
 */
export const handleAddMore: AppMouseEventHandler<HTMLButtonElement> = (
  event,
  dispatch: AppDispatch,
  form: HTMLFormElement,
  participantID: number,
  data: Data
) => {
  event.preventDefault();
  /** Are all the records removed on the UI? */
  const flag = data.recordsList.length > 0;
  dispatch(
    addMoreRecord({
      participantId: participantID,
      counselorCFSWorkerId: flag
        ? data.recordsList[data.recordsList.length - 1].counselorCFSWorkerId
        : 0,
      role: flag ? form[`record_${data.recordsList.length}_Role`].value : "",
      name: flag ? form[`record_${data.recordsList.length}_Name`].value : "",
      startDate: flag
        ? form[`record_${data.recordsList.length}_StartDate`].value
        : "",
      endDate: flag
        ? form[`record_${data.recordsList.length}_EndDate`].value
        : "",
      contactInformation: flag
        ? form[`record_${data.recordsList.length}_ContactInformation`].value
        : "",
    })
  );
};

/**
 * Callback of onSubmit event.
 * @param event - Form event object
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
    recordsList: new Array<Record>(data.recordsList.length),
  };
  for (let index = 0; index < data.recordsList.length; ++index) {
    formData.recordsList[index] = {
      participantId: participantID,
      counselorCFSWorkerId: data.recordsList[index].counselorCFSWorkerId,
      role: event.currentTarget[`record_${index + 1}_Role`].value,
      name: event.currentTarget[`record_${index + 1}_Name`].value,
      startDate: event.currentTarget[`record_${index + 1}_StartDate`].value,
      endDate: event.currentTarget[`record_${index + 1}_EndDate`].value,
      contactInformation:
        event.currentTarget[`record_${index + 1}_ContactInformation`].value,
    };
  }
  dispatch(doPost(formData))
    .unwrap()
    .then(() => {
      navigate("../other_information");
    })
    .catch((err) => {
      console.log(err);
    });
};
