import {
  doDelete,
  removeRecordNumber,
} from "../../../features/cyfms/familyPhysicians/slice";
import type { AppDispatch } from "../../../library/store";

/**
 * Callback of "Remove" button.
 * @param event - Mouse event object
 * @param dispatch - Redux action(s) dispatcher
 * @param familyPhysicianID - Family Physician ID
 * @param index - Record index
 */
export const handleRemoveRecord: AppMouseEventHandler<HTMLButtonElement> = (
  event,
  dispatch: AppDispatch,
  familyPhysicianID: number,
  index: number
) => {
  event.preventDefault();
  /** Call API ONLY when household member ID is valid. */
  if (familyPhysicianID > 0) {
    dispatch(doDelete(familyPhysicianID))
      .unwrap()
      .catch((err) => {
        console.log(err);
      });
  }
  /** Remove record from UI. */
  dispatch(removeRecordNumber(index));
};
