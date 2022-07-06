import {
  CYFSWMSAddButton,
  CYFSWMSSaveButton,
  CYFSWMSNextButton,
} from "../../components/CYFSWMSButtons";
import CYFMSLayout from "../../components/cyfms/CYFMSLayout";
import {
  doGetHouseholdAndMembers,
  doPostHouseholdAndMembers,
} from "../../features/cyfms/householdAndMembers/householdAndMembersSlice";
import { useAppDispatch, useAppSelector } from "../../library/hooks";
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import type { FormEvent, ReactElement } from "react";
import CYFMSHouseholdAndMembersRecordList from "../../components/cyfms/records/CYFMSHouseholdAndMembersRecordList";

/**
 * The CYFMSHouseholdMembers functional component.
 * @returns CYFMSHouseholdMembers component skeleton.
 */
const CYFMSHouseholdMembers = (): ReactElement => {
  // const dispatch = useAppDispatch();
  // const participantId = useAppSelector(
  //   (state) => (state as any).registration.user.participantId
  // );
  // const data = useAppSelector((state) => (state as any).household.user);

  // useEffect(() => {
  //   dispatch(doGetHouseholdAndMembers(participantId));
  // }, []);

  // State for the records list
  const [recordList, setRecordList] = useState([{}]);

  // State for the save button
  const [saveButtonDisabled, setSaveButtonDisabled] = useState(true);

  // Handles the form data submission and other
  // activities.
  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    // dispatch(doPostHouseholdAndMembers()).then(() => {
    //   navigate("/cyfms/education_and_employment");
    // });
    /* Disable save button. */
    setSaveButtonDisabled(true);
  };

  const addMoreHandler = (e: MouseEvent) => {
    e.preventDefault();
    setRecordList((previousRecordList) => [...previousRecordList, {}]);
  };

  // Enables/Re-enables the `Save` button whenever
  // any form field value changes.
  const changeHandler = (e: FormEvent) => {
    setSaveButtonDisabled(false);
  };

  return (
    <CYFMSLayout>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem 0",
        }}
        onSubmit={submitHandler}
        onChange={changeHandler}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem 0" }}>
          {CYFMSHouseholdAndMembersRecordList(recordList)}
        </Box>
        <Box>
          <CYFSWMSAddButton onClick={addMoreHandler} />
        </Box>
        <Box sx={{ display: "flex", gap: "0 1rem", justifyContent: "right" }}>
          <CYFSWMSSaveButton disabled={saveButtonDisabled} />
          <CYFSWMSNextButton to="/cyfms/education_and_employment" />
        </Box>
      </Box>
    </CYFMSLayout>
  );
};

export default CYFMSHouseholdMembers;
