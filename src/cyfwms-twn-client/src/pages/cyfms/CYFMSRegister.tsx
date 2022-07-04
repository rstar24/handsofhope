import { unhideTabs } from "../../features/cyfms/cyfmsSideNavSlice";
import {
  doGetRegister,
  doPostRegister,
} from "../../features/register/registerSlice";
import { useAppDispatch, useAppSelector } from "../../library/hooks";
import CYFMSDropdown from "../../components/cyfms/CYFMSDropdown";
import CYFMSInput from "../../components/cyfms/CYFMSInput";
import CYFMSLayout from "../../components/cyfms/CYFMSLayout";
import { Box, Button, Grid } from "@mui/material";
import React, { useEffect } from "react";
import type { FormEvent, ReactElement } from "react";
import { Link } from "react-router-dom";

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
    dispatch(doPostRegister({ user: newUser })).then(() => {
      dispatch(unhideTabs());
    });
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
          <Grid item xs={1} sm={5} md={5}>
            <CYFMSInput
              id="firstName"
              value="First Name"
              autofill={readData.firstname}
              required
            />
          </Grid>
          <Grid item xs={1} sm={5} md={5}>
            <CYFMSInput
              id="middleName"
              value="Middle Name"
              autofill={readData.middleName}
            />
          </Grid>
          <Grid item xs={1} sm={5} md={5}>
            <CYFMSInput
              id="lastName"
              value="Last Name"
              autofill={readData.surname}
              required
            />
          </Grid>
          <Grid item xs={1} sm={5} md={5}>
            <CYFMSInput
              id="dateOfBirth"
              value="Date of Birth"
              autofill={readData.dateOfBirth}
              required
            />
          </Grid>
          <Grid item xs={1} sm={5} md={5}>
            <CYFMSDropdown
              id="gender"
              value="Gender"
              autofill={readData.gender}
              required
            />
          </Grid>
          <Grid item xs={1} sm={5} md={5}>
            <CYFMSDropdown
              id="maritalStatus"
              value="Marital Status"
              autofill={readData.maritalStatus}
            />
          </Grid>
          <Grid item sm={8.8}></Grid>
          <Grid item sm={0}>
            {userData.participantId ? (
              <Button
                variant="contained"
                type="submit"
                component={Link}
                to="/cyfms/contact"
              >
                Next
              </Button>
            ) : (
              <Button variant="contained" type="submit">
                Save
              </Button>
            )}
          </Grid>{" "}
        </Grid>
      </Box>
    </CYFMSLayout>
  );
};

export default CYFMSRegister;
