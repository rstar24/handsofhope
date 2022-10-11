import { doGet, doPost } from "../../../features/cyfms/otherInformation/slice";
import { uninitiate } from "../../../features/initiatorSlice";
import { hideTabs } from "../../../features/navBarSlice";
import { setOpen, setView } from "../../../features/popupSlice";
import type { Data } from "../../../features/cyfms/otherInformation/slice";
import type { AppDispatch } from "../../../library/store";
import type { NavigateFunction } from "react-router-dom";

/**
 * Callback of useEffect hook.
 * @param dispatch - Redux action(s) dispatcher
 * @param participantID - Participant ID
 */
export const handleEffect = (dispatch: AppDispatch, participantID: number) => {
  dispatch(doGet(participantID))
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
 * @param participantID - Participant ID
 * @param data - Redux store data
 * @param edit - Edit mode?
 */
export const handleSubmit: AppFormEventHandler<HTMLFormElement> = (
  event,
  navigate: NavigateFunction,
  dispatch: AppDispatch,
  participantID: number,
  data: Data,
  edit: boolean
) => {
  event.preventDefault();
  const formData: Data = {
    participantId: participantID,
    participantOtherInfoId: data.participantOtherInfoId,
    strength: event.currentTarget.strengths.value,
    weakness: event.currentTarget.weaknesses.value,
    skills: event.currentTarget.skills.value,
    experiences: event.currentTarget.experiences.value,
    effectiveCopingSkills: event.currentTarget.effectiveCopingSkills.value,
  };
  dispatch(doPost(formData))
    .then(() => {
      dispatch(setOpen(false));
      dispatch(hideTabs(null));
      dispatch(uninitiate(null));
      if (!edit) {
        dispatch(setView(true));
        navigate("/cyfms/view");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
