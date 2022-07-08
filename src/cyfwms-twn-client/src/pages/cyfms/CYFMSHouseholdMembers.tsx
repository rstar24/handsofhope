import {
  CYFSWMSAddButton,
  CYFSWMSNextButton,
} from "../../components/CYFSWMSButtons";
import CYFMSLayout from "../../components/cyfms/CYFMSLayout";
import CYFMSHouseholdAndMembersRecordList from "../../components/cyfms/records/CYFMSHouseholdAndMembersRecordList";
import {
  doGetHouseholdAndMembers,
  doPostHouseholdAndMembers,
} from "../../features/cyfms/householdAndMembers/householdAndMembersSlice";
import { useAppDispatch, useAppSelector } from "../../library/hooks";
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { FormEvent, ReactElement } from "react";

/**
 * The CYFMSHouseholdMembers functional component.
 * @returns CYFMSHouseholdMembers component skeleton.
 */
const CYFMSHouseholdMembers = (): ReactElement => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const participantId = useAppSelector(
    (state) => (state as any).cyfmsRegister.user.participantId
  );
  const data = useAppSelector(
    (state) => (state as any).householdAndMembers.user
  );

  useEffect(() => {
    dispatch(doGetHouseholdAndMembers(participantId));
  }, []);

  // State for the records list
  const [recordList, setRecordList] = useState([{}]);

  // Handles the form data submission and other
  // activities.
  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    dispatch(doPostHouseholdAndMembers({ user: data })).then(
      () => {
        console.log("EducationAndEmployment data has been posted!");
        navigate("/cyfms/education_and_employment");
      },
      (err) => {
        console.log("EducationAndEmployment data NOT posted!");
        console.log(err);
      }
    );
  };

  const addMoreHandler = (e: MouseEvent) => {
    e.preventDefault();
    setRecordList((previousRecordList) => [...previousRecordList, {}]);
  };

  // Enables/Re-enables the `Save` button whenever
  // any form field value changes.
  const changeHandler = (e: FormEvent) => {};

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
          <CYFSWMSNextButton />
        </Box>
      </Box>
    </CYFMSLayout>
  );
};

export default CYFMSHouseholdMembers;
