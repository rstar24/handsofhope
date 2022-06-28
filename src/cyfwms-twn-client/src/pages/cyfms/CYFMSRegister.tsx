import { Box, Button } from "@mui/material";
import { doPostRegister } from "../../features/register/registerSlice";
import { useAppDispatch } from "../../library/hooks";
import CYFMSDropdown from "../../components/cyfms/CYFMSDropdown";
import CYFMSInput from "../../components/cyfms/CYFMSInput";
import CYFMSLayout from "../../components/cyfms/CYFMSLayout";
import React, { useState } from "react";
import type { FormEvent, ReactElement } from "react";

/**
 * The CYFMSRegister functional component.
 * @returns CYFMSRegister component skeleton.
 */
const CYFMSRegister = (): ReactElement => {
  const dispatch = useAppDispatch();

  const [user, setUser] = useState({
    participantId: 0,
    firstname: "",
    middleName: "",
    surname: "",
    dateOfBirth: "",
    gender: "",
    maritalStatus: "",
  });

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    const data: any = e.currentTarget;
    const newUser = {
      participantId: 0,
      firstname: data.firstName.value,
      middleName: data.middleName.value,
      surname: data.lastName.value,
      dateOfBirth: data.dateOfBirth.value,
      gender: data.gender.value,
      maritalStatus: data.maritalStatus.value,
    };
    setUser(newUser);
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
        <CYFMSInput id="firstname" value="First Name" />
        <CYFMSInput id="middleName" value="Middle Name" />
        <CYFMSInput id="surname" value="Last Name" />
        <CYFMSInput id="dateOfBirth" value="Date of Birth" />
        <CYFMSDropdown id="gender" value="Gender" />
        <CYFMSDropdown id="maritalStatus" value="Marital Status" />
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </Box>
    </CYFMSLayout>
  );
};

export default CYFMSRegister;
