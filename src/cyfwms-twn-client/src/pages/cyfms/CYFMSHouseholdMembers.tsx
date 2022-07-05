import { Box, Button, Grid } from "@mui/material";
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
import { Link } from "react-router-dom";

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
        <Grid container sm={12} spacing={2}>
          <Grid item sm={5}>
            <CYFMSInput id="memberName" value="Name" />
          </Grid>
          <Grid item sm={5}>
            <CYFMSInput id="memberDOB" value="Date of Birth" type="date" />
          </Grid>
          <Grid item sm={5}>
            <CYFMSInput id="memberResiding" value="Residing" />
          </Grid>
          <Grid item sm={5}>
            <CYFMSDropdown id="gender" value="Member Gender" />
          </Grid>

          <Grid item sm={2.1}></Grid>
          <Grid item sm={9.9}>
            <Button variant="contained" type="submit">
              Add More
            </Button>
          </Grid>

          <Grid item sm={8.8}></Grid>
          <Grid item sm={3.2}>
            <Button
              variant="contained"
              type="submit"
              component={Link}
              to="/cyfms/education_and_employment"
            >
              Next
            </Button>
          </Grid>
        </Grid>
      </Box>
    </CYFMSLayout>
  );
};

export default CYFMSHouseholdMembers;
