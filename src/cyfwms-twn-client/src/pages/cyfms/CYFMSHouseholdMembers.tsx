import { Box, Button } from "@mui/material";
import CYFMSInput from "../../components/cyfms/CYFMSInput";
import CYFMSLayout from "../../components/cyfms/CYFMSLayout";
import React, { useEffect, useState } from "react";
import type { FormEvent, ReactElement } from "react";
import CYFMSDropdown from "../../components/cyfms/CYFMSDropdown";
import { useAppDispatch, useAppSelector } from "../../library/hooks";
import {
  doGetHouseHold,
  doPostHouseHold,
} from "../../features/householdMember/householdSlice";

/**
 * The CYFMSHouseholdMembers functional component.
 * @returns CYFMSHouseholdMembers component skeleton.
 */
const CYFMSHouseholdMembers = (): ReactElement => {
  const dispatch = useAppDispatch();
  const participantId = useAppSelector(
    (state) => (state as any).registration.user.participantId
  );
  const data = useAppSelector((state) => (state as any).household.user);

  const [formField, setFormField] = useState([
    {
      memberName: "",
      memberDOB: "",
      memberResiding: "",
      gender: "",
    },
  ]);
  useEffect(() => {
    dispatch(doGetHouseHold(participantId));
  }, []);

  const [contact, setContact] = useState([
    {
      participantId: data.participantId,
      householdMemberId: data.participantContactId,
      name: data.name,
      gender: data.gender,
      dateOfBirth: data.dateOfBirth,
      residing: data.residing,
    },
  ]);
  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    const data: any = e.currentTarget;
    const newContact = [
      {
        participantId: participantId,
        householdMemberId: 0,
        name: data.memberName.value,
        gender: data.gender.value,
        dateOfBirth: data.memberDOB.value,
        residing: data.memberResiding.value,
      },
    ];
    setContact(newContact);
    dispatch(doPostHouseHold({ user: newContact }));
  };

  return (
    <CYFMSLayout>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "2rem 2rem",
          mb: "auto",
        }}
        onSubmit={submitHandler}
      >
        <CYFMSInput id="memberName" value="Name" />
        <CYFMSInput id="memberDOB" value="Date of Birth" />
        <CYFMSInput id="memberResiding" value="Residing" />
        <CYFMSDropdown id="gender" value="Member Gender" />
        <Button variant="contained" type="submit">
          Add More
        </Button>
        <Button variant="contained" type="submit">
          Next
        </Button>
      </Box>
    </CYFMSLayout>
  );
};

export default CYFMSHouseholdMembers;
