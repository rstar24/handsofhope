import {
  doGet,
  addMoreRecord,
  doPost,
} from "../../../features/cyfms/criminalHistory/slice";
import type {
  Data,
  Record,
} from "../../../features/cyfms/criminalHistory/slice";
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
 * @param data - Redux store data
 */
export const handleAddMore: AppMouseEventHandler<HTMLButtonElement> = (
  event,
  dispatch: AppDispatch,
  form: HTMLFormElement,
  data: Data
) => {
  event.preventDefault();
  const len = data.criminalHistoryRecordList.length;
  /** Are all the records removed on the UI? */
  const flag = data.criminalHistoryRecordList.length > 0;
  dispatch(
    addMoreRecord({
      criminalHistoryRecordId: 0,
      criminalHistoryId: data.criminalHistoryId,
      arrestDate: flag ? form[`record_${len}_ArrestDate`].value : "",
      charges: flag ? form[`record_${len}_Charges`].value : "",
      conviction: flag ? form[`record_${len}_Conviction`].value : "",
      sentence: flag ? form[`record_${len}_Sentence`].value : "",
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
  const len = data.criminalHistoryRecordList.length;
  const formData: Data = {
    participantId: participantID,
    criminalHistoryId: data.criminalHistoryId,
    criminalHistoryRecordList: new Array<Record>(len),
    probation: data.probation,
    parole: data.parole,
    conditions: event.currentTarget.conditions.value,
    courtWorkerAndContactInfo:
      event.currentTarget.courtWorkersAndContactInformation.value,
  };
  for (let index = 0; index < len; ++index) {
    formData.criminalHistoryRecordList[index] = {
      criminalHistoryRecordId:
        data.criminalHistoryRecordList[index].criminalHistoryRecordId,
      arrestDate: event.currentTarget[`record_${index + 1}_ArrestDate`].value,
      charges: event.currentTarget[`record_${index + 1}_Charges`].value,
      conviction: event.currentTarget[`record_${index + 1}_Conviction`].value,
      sentence: event.currentTarget[`record_${index + 1}_Sentence`].value,
    };
    if (data.criminalHistoryId > 0) {
      formData.criminalHistoryRecordList[index].criminalHistoryId =
        data.criminalHistoryId;
    }
  }
  dispatch(doPost(formData))
    .unwrap()
    .then(() => {
      navigate("../family_physicians");
    })
    .catch((err) => {
      console.log(err);
    });
};
