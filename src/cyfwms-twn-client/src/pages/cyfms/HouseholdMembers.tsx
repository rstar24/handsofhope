import {
  CYFSWMSAddButton,
  CYFSWMSNextButton,
} from "../../components/CYFSWMSButtons";
import CYFMSLayout from "../../components/cyfms/CYFMSLayout";
import HouseholdMembersRecordList from "../../components/cyfms/records/HouseholdMembersRecordList";
import {
  addMoreRecord,
  doGet,
  doPost,
} from "../../features/cyfms/householdMembers/slice";
import { onKeyDown } from "../../library/app";
import { useAppDispatch, useAppSelector } from "../../library/hooks";
import { Box } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import type { Data, Record } from "../../features/cyfms/householdMembers/slice";
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
  const recordsList = useAppSelector(
    (state) => state.cyfmsHouseholdMembers.data.recordsList
  );

  // Reference to the form
  const formRef: Ref<HTMLFormElement> = useRef(null);

  useEffect(() => {
    dispatch(doGet(participantID))
      .unwrap()
      .then((data) => {
        console.log("HouseholdMembers GET backend API was successful!");
      })
      .catch((err) => {
        console.log("HouseholdMembers GET backend API didn't work!");
        console.log(err);
      });
  }, []);

  // Handles the form data submission and other
  // activities.
  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    const form: any = e.currentTarget;
    const formData: Data = {
      recordsList: new Array<Record>(recordsList.length),
    };
    for (let index = 0; index < recordsList.length; ++index) {
      formData.recordsList[index] = {
        participantId: participantID,
        householdMemberId: recordsList[index].householdMemberId,
        name: form[`record_${index + 1}_Name`].value,
        gender: form[`record_${index + 1}_Gender`].value,
        dateOfBirth: form[`record_${index + 1}_DateOfBirth`].value,
        relationship: form[`record_${index + 1}_Relationship`].value,
        residing: form[`record_${index + 1}_Residing`].value,
      };
    }
    dispatch(doPost(formData))
      .unwrap()
      .then(() => {
        console.log("HouseholdMembers POST backend API was successful!");
        navigate("../education_and_employment");
      })
      .catch((err) => {
        console.log("HouseholdMembers POST backend API was successful!");
        console.log(err);
      });
  };

  const addMoreHandler = (e: MouseEvent) => {
    e.preventDefault();
    const form: any = formRef.current;
    // Whenever all the records are removed on UI.
    const flag: boolean = recordsList.length > 0;
    dispatch(
      addMoreRecord({
        participantId: participantID,
        householdMemberId: flag
          ? recordsList[recordsList.length - 1].householdMemberId
          : 0,
        name: flag ? form[`record_${recordsList.length}_Name`].value : "",
        gender: flag ? form[`record_${recordsList.length}_Gender`].value : "",
        dateOfBirth: flag
          ? form[`record_${recordsList.length}_DateOfBirth`].value
          : "",
        relationship: flag
          ? form[`record_${recordsList.length}_Relationship`].value
          : "",
        residing: flag
          ? form[`record_${recordsList.length}_Residing`].value
          : "",
      })
    );
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
        onKeyDown={onKeyDown}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem 0" }}>
          {HouseholdMembersRecordList(recordsList)}
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

export default HouseholdMembers;
