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
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import type { FormEvent, ReactElement } from "react";

/**
 * The CYFMSHouseholdAndMembers functional component.
 * @returns CYFMSHouseholdAndMembers component skeleton.
 */
const CYFMSHouseholdAndMembers = (): ReactElement => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const participantId = useAppSelector(
    (state) => (state as any).cyfmsRegister.user.participantId
  );
  const data = useAppSelector(
    (state) => (state as any).householdAndMembers.recordList
  );

  // State for the records list
  const [recordList, setRecordList] = useState([
    {
      participantId: participantId,
      householdMemberId: 0,
      name: "",
      gender: "",
      dateOfBirth: "",
      residing: "",
    },
  ]);

  // Reference to the form
  const formRef = useRef(null);

  useEffect(() => {
    dispatch(doGetHouseholdAndMembers(participantId))
      .unwrap()
      .then((recordListFromAPI) => {
        setRecordList(recordListFromAPI);
      })
      .catch((err) => {
        console.log("HouseholdAndMembers backend API didn't work");
        console.log(err);
      });
  }, []);

  // Handles the form data submission and other
  // activities.
  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    dispatch(doPostHouseholdAndMembers({ recordList: recordList }))
      .unwrap()
      .then(() => {
        console.log("HouseholdAndMembers data has been posted!");
        navigate("/cyfms/education_and_employment");
      })
      .catch((err) => {
        console.log("HouseholdAndMembers data NOT posted!");
        console.log(err);
      });
  };

  const addMoreHandler = (e: MouseEvent) => {
    e.preventDefault();
    if (recordList.length >= 1) {
      setRecordList((previousList: any) => [
        ...previousList,
        {
          participantId: participantId,
          householdMemberId: 0,
          name: (formRef.current as any)[`householdAndMembers_record_${1}_Name`]
            .value,
          gender: (formRef.current as any)[
            `householdAndMembers_record_${1}_Gender`
          ].value,
          dateOfBirth: (formRef.current as any)[
            `householdAndMembers_record_${1}_DateOfBirth`
          ].value,
          residing: (formRef.current as any)[
            `householdAndMembers_record_${1}_Residing`
          ].value,
        },
      ]);
    } else {
      setRecordList((previousRecordList) => [
        ...previousRecordList,
        {
          participantId: participantId,
          householdMemberId: 0,
          name: "",
          gender: "",
          dateOfBirth: "",
          residing: "",
        },
      ]);
    }
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
        ref={formRef}
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

export default CYFMSHouseholdAndMembers;
