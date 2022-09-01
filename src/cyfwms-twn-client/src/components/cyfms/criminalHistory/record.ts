import {
  doDelete,
  removeRecordNumber,
} from "../../../features/cyfms/criminalHistory/slice";
import type { AppDispatch } from "../../../library/store";

/**
 * Callback of "Remove" button.
 * @param event - Mouse event object
 * @param dispatch - Redux action(s) dispatcher
 * @param recordID - Criminal History Record ID
 * @param index - Record index
 */
export const handleRemoveRecord: AppMouseEventHandler<HTMLButtonElement> = (
  event,
  dispatch: AppDispatch,
  recordID: number,
  index: number
) => {
  event.preventDefault();
  /** Call API ONLY when counselor ID is valid. */
  if (recordID > 0) {
    dispatch(doDelete(recordID))
      .unwrap()
      .catch((err) => {
        console.log(err);
      });
  }
  /** Remove record from UI. */
  dispatch(removeRecordNumber(index));
};
