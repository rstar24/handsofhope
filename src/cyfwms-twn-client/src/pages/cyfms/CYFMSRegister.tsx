import { Box, Button } from "@mui/material";
import {
  doGetRegister,
  doPostRegister,
} from "../../features/register/registerSlice";
import { useAppDispatch, useAppSelector } from "../../library/hooks";
import CYFMSDropdown from "../../components/cyfms/CYFMSDropdown";
import CYFMSInput from "../../components/cyfms/CYFMSInput";
import CYFMSLayout from "../../components/cyfms/CYFMSLayout";
import React, { useEffect } from "react";
import type { FormEvent, ReactElement } from "react";

/**
 * The CYFMSRegister functional component.
 * @returns CYFMSRegister component skeleton.
 */
const CYFMSRegister = (): ReactElement => {
  const dispatch = useAppDispatch();
  const userData = useAppSelector((state) => (state as any).registration.user);
  const readData = useAppSelector(
    (state) => (state as any).registration.readUser
  );

  useEffect(() => {
    dispatch(doGetRegister(userData.participantId));
  }, [userData]);
  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    const data: any = e.currentTarget;
    const newUser = {
      participantId: userData.participantId,
      firstname: data.firstName.value,
      middleName: data.middleName.value,
      surname: data.lastName.value,
      dateOfBirth: data.dateOfBirth.value,
      gender: data.gender.value,
      maritalStatus: data.maritalStatus.value,
    };

    dispatch(doPostRegister({ user: newUser }));
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
        <CYFMSInput
          id="firstName"
          value="First Name"
          autofill={readData.firstname}
        />
        <CYFMSInput
          id="middleName"
          value="Middle Name"
          autofill={readData.middleName}
        />
        <CYFMSInput
          id="lastName"
          value="Last Name"
          autofill={readData.surname}
        />
        <CYFMSInput
          id="dateOfBirth"
          value="Date of Birth"
          autofill={readData.dateOfBirth}
        />
        <CYFMSDropdown id="gender" value="Gender" autofill={readData.gender} />
        <CYFMSDropdown
          id="maritalStatus"
          value="Marital Status"
          autofill={readData.maritalStatus}
        />
        {userData.participantId ? (
          <Button variant="contained" type="submit">
            Next
          </Button>
        ) : (
          <Button variant="contained" type="submit">
            Save
          </Button>
        )}
      </Box>
    </CYFMSLayout>
  );
};

export default CYFMSRegister;
