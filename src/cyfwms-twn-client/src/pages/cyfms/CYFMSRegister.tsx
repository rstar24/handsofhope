import { Box, Button } from "@mui/material";
import AuthLayout from "../../components/auth/layout/AuthLayout";
import CYFMSDropdown from "../../components/cyfms/CYFMSDropdown";
import CYFMSInput from "../../components/cyfms/CYFMSInput";
import CYFMSLayout from "../../components/cyfms/CYFMSLayout";
import React, { useState } from "react";
import type { FormEvent, ReactElement } from "react";
import { useAppDispatch, useAppSelector } from "../../library/hooks";
import {
  doPostRegister,
  RegisterPostData,
} from "../../features/register/registerSlice";

/**
 * The CYFMSRegister functional component.
 * @returns CYFMSRegister component skeleton.
 */
const CYFMSRegister = (): ReactElement => {
  // const participantId = useAppSelector(
  //   (state) => (state as any).register.participantId
  // );
  const dispatch = useAppDispatch();
  const [user, setUser] = useState({
    participantId: 0,
    firstname: "",
    middleName: "",
    surname: "",
    dateOfBirth: "",
    gender: "",
  });
  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    const data: any = e.currentTarget;
    const newUser = {
      participantId: 0,
      firstname: data.firstname.value,
      middleName: data.middleName.value,
      surname: data.surname.value,
      dateOfBirth: data.dateOfBirth.value,
      gender: data.gender.value,
    };
    console.log(newUser);
    setUser(newUser);
    dispatch(doPostRegister({ user: newUser }));
  };

  return (
    <AuthLayout>
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
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </Box>
      </CYFMSLayout>
    </AuthLayout>
  );
};

export default CYFMSRegister;
