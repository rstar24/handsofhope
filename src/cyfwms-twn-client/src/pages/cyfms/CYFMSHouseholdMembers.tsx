import {
  CYFSWMSAddButton,
  CYFSWMSNextButton,
} from "../../components/CYFSWMSButtons";
import CYFMSLayout from "../../components/cyfms/CYFMSLayout";
import CYFMSHouseholdMembersRecordList from "../../components/cyfms/records/CYFMSHouseholdMembersRecordList";
import {
  addMoreHouseholdMembersRecord,
  doGetHouseholdMembers,
  doPostHouseholdMembers,
} from "../../features/cyfms/householdMembers/cyfmsHouseholdMembersSlice";
import { useAppDispatch, useAppSelector } from "../../library/hooks";
import { Box } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import type {
  cyfmsHouseholdMembersData,
  cyfmsHouseholdMembersRecord,
} from "../../features/cyfms/householdMembers/cyfmsHouseholdMembersSlice";
import type { FormEvent, ReactElement, Ref } from "react";

/**
 * The CYFMSHouseholdMembers functional component.
 * @returns CYFMSHouseholdMembers component skeleton.
 */
const CYFMSHouseholdMembers = (): ReactElement => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const participantId = useAppSelector(
    (state: any) => state.cyfmsRegister.user.participantId
  );
  const recordsList = useAppSelector(
    (state: any) => state.cyfmsHouseholdMembers.householdMembersData.recordsList
  );

  // Reference to the form
  const cyfmsHouseholdMembersFormRef: Ref<HTMLFormElement> = useRef(null);

  useEffect(() => {
    dispatch(doGetHouseholdMembers(null))
      .unwrap()
      .then((recordListFromAPI) => {
        console.log("householdMembers GET backend API was successful!");
      })
      .catch((err) => {
        console.log("householdMembers GET backend API didn't work!");
        console.log(err);
      });
  }, []);

  // Handles the form data submission and other
  // activities.
  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    const cyfmsHouseholdMembersForm: any = e.currentTarget;
    const cyfmsHouseholdMembersFormData: cyfmsHouseholdMembersData = {
      recordsList: new Array<cyfmsHouseholdMembersRecord>(recordsList.length),
    };
    for (let index = 0; index < recordsList.length; ++index) {
      cyfmsHouseholdMembersFormData.recordsList[index] = {
        participantId: participantId,
        householdMemberId: recordsList[index].householdMemberId,
        name: cyfmsHouseholdMembersForm[
          `householdMembers_record_${index + 1}_Name`
        ].value,
        gender:
          cyfmsHouseholdMembersForm[
            `householdMembers_record_${index + 1}_Gender`
          ].value,
        dateOfBirth:
          cyfmsHouseholdMembersForm[
            `householdMembers_record_${index + 1}_DateOfBirth`
          ].value,
        residing:
          cyfmsHouseholdMembersForm[
            `householdMembers_record_${index + 1}_Residing`
          ].value,
      };
    }
    dispatch(doPostHouseholdMembers(cyfmsHouseholdMembersFormData.recordsList))
      .unwrap()
      .then(() => {
        console.log("householdMembers POST backend API was successful!");
        navigate("/cyfms/education_and_employment");
      })
      .catch((err) => {
        console.log("householdMembers POST backend API was successful!");
        console.log(err);
      });
  };

  const addMoreHandler = (e: MouseEvent) => {
    e.preventDefault();
    const cyfmsHouseholdMembersForm = cyfmsHouseholdMembersFormRef.current;
    dispatch(
      addMoreHouseholdMembersRecord({
        participantId: participantId,
        householdMemberId:
          recordsList[recordsList.length - 1].householdMemberId,
        name: (cyfmsHouseholdMembersForm as any)[
          `householdMembers_record_${recordsList.length}_Name`
        ].value,
        gender: (cyfmsHouseholdMembersForm as any)[
          `householdMembers_record_${recordsList.length}_Gender`
        ].value,
        dateOfBirth: (cyfmsHouseholdMembersForm as any)[
          `householdMembers_record_${recordsList.length}_DateOfBirth`
        ].value,
        residing: (cyfmsHouseholdMembersForm as any)[
          `householdMembers_record_${recordsList.length}_Residing`
        ].value,
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
        ref={cyfmsHouseholdMembersFormRef}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem 0" }}>
          {CYFMSHouseholdMembersRecordList(recordsList)}
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
