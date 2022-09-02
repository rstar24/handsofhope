import {
  doDelete,
  removeRecordNumber,
} from "../../../features/cyfms/counselors/slice";
import type { AppDispatch } from "../../../library/store";

/**
 * Callback of "Remove" button.
 * @param event - Mouse event object
 * @param dispatch - Redux action(s) dispatcher
 * @param counselorID - Counselor ID
 * @param index - Record index
 */
export const handleRemoveRecord: AppMouseEventHandler<HTMLButtonElement> = (
  event,
  dispatch: AppDispatch,
  counselorID: number,
  index: number
) => {
  event.preventDefault();
  /** Call API ONLY when counselor ID is valid. */
  if (counselorID > 0) {
    dispatch(doDelete(counselorID))
      .unwrap()
      .catch((err) => {
        console.log(err);
      });
  }
  /** Remove record from UI. */
  dispatch(removeRecordNumber(index));
};
