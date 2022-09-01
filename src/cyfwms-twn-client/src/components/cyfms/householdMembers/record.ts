import {
  doDelete,
  removeRecordNumber,
} from "../../../features/cyfms/householdMembers/slice";
import type { AppDispatch } from "../../../library/store";

/**
 * Callback of "Remove" button.
 * @param event - Mouse event object
 * @param dispatch - Redux action(s) dispatcher
 * @param householdMemberID - Household Member ID
 * @param index - Record index
 */
export const handleRemoveRecord: AppMouseEventHandler<HTMLButtonElement> = (
  event,
  dispatch: AppDispatch,
  householdMemberID: number,
  index: number
) => {
  event.preventDefault();
  /** Call API ONLY when household member ID is valid. */
  if (householdMemberID > 0) {
    dispatch(doDelete(householdMemberID))
      .unwrap()
      .catch((err) => {
        console.log(err);
      });
  }
  /** Remove record from UI. */
  dispatch(removeRecordNumber(index));
};
