import {
  CYFSWMSAddButton,
  CYFSWMSNextButton,
} from "../../../components/CYFSWMSButtons";
import CYFMSLayout from "../../../components/cyfms/CYFMSLayout";
import RecordList from "../../../components/cyfms/householdMembers/RecordList";
import { onKeyDown } from "../../../library/app";
import { useAppDispatch, useAppSelector } from "../../../library/hooks";
import { handleEffect, handleAddMore, handleSubmit } from "./householdMembers";
import { Box } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import type { FormEvent, ReactElement, Ref } from "react";

/**
 * The HouseholdMembers functional component.
 * @returns HouseholdMembers component skeleton.
 */
const HouseholdMembers = (): ReactElement => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const participantID = useAppSelector(
    (state) => state.cyfmsRegister.data.participantId
  );
  const data = useAppSelector((state) => state.cyfmsHouseholdMembers.data);

  // Reference to the form
  const formRef: Ref<HTMLFormElement> = useRef(null);

  useEffect(() => handleEffect(dispatch, participantID), []);

  return (
    <CYFMSLayout>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem 0",
        }}
        onSubmit={(event: FormEvent<HTMLFormElement>) =>
          handleSubmit(event, navigate, dispatch, participantID, data)
        }
        ref={formRef}
        onKeyDown={onKeyDown}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem 0" }}>
          <RecordList list={data.recordsList} />
        </Box>
        <Box>
          <CYFSWMSAddButton
            onClick={(event: MouseEvent) =>
              handleAddMore(
                event,
                dispatch,
                formRef.current,
                participantID,
                data
              )
            }
          />
        </Box>
        <Box sx={{ display: "flex", gap: "0 1rem", justifyContent: "right" }}>
          <CYFSWMSNextButton />
        </Box>
      </Box>
    </CYFMSLayout>
  );
};

export default HouseholdMembers;
