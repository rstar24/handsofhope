import AuthLayout from "../../components/auth/layout/AuthLayout";
import CYFMSInput from "../../components/cyfms/CYFMSInput";
import { Box, Button } from "@mui/material";

import React, { useState } from "react";

import CYFMSHeader from "../../components/cyfms/CYFMSHeader";
import type { FormEvent, ReactElement } from "react";
import CYFMSSearchResult from "./CYFMSSearchResult";
import { useAppDispatch, useAppSelector } from "../../library/hooks";
import { doGetSearch } from "../../features/search/searchSlice";
import { current } from "@reduxjs/toolkit";
/**
 * The CYFMSSearchPanel functional component.
 * @returns CYFMSSearchPanel component skeleton.
 */
const CYFMSSearchPanel = (): ReactElement => {
  const dispatch = useAppDispatch();
  const [isShown, setIsShown] = useState(false);

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();

    const data: any = e.currentTarget;
    const searchUser = {
      firstname: data.firstName.value,
      surname: data.lastName.value,
      middleName: data.middleName.value,
      dateOfBirth: data.dateOfBirth.value,
      maritalStatus: data.maritalStatus.value,
      city: data.city.value,
      phoneNumber: data.phoneNo.value,
    };
    dispatch(doGetSearch({ readUser: searchUser })).then(() => {
      setIsShown((current) => !current);
    });
  };

  const hide = () => {
    setIsShown(false);
  };

  return (
    <AuthLayout>
      <CYFMSHeader />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          py: "1rem",
        }}
      >
        <Button
          sx={{
            background: "lightgrey",
            color: "black",
            border: "1px solid black",
            maxWidth: 300,
          }}
        >
          Search for a Child, Youth, or Family Member
        </Button>
      </Box>
      <Box
        component="form"
        sx={{
          ml: 65,
          mr: 15,
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem 0",
        }}
        onSubmit={submitHandler}
      >
        <CYFMSInput id="firstName" value="First Name" required />
        <CYFMSInput id="middleName" value="Middle Name" />
        <CYFMSInput id="lastName" value="last Name" required />
        <CYFMSInput
          id="dateOfBirth"
          type="date"
          value="Date Of Birth"
          required
        />

        <CYFMSInput
          id="maritalStatus"
          value="MaritalStatus"
          name="maritalStatus"
        />
        <CYFMSInput id="phoneNo" value="Phone No" name="phoneNo" />
        <CYFMSInput id="city" value="City" name="city" />

        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button variant="contained" type="submit">
            Search
          </Button>
          <Button
            variant="contained"
            sx={{ ml: 2 }}
            type="reset"
            onClick={hide}
          >
            Reset
          </Button>
        </Box>
        {isShown && <CYFMSSearchResult />}
      </Box>
    </AuthLayout>
  );
};

export default CYFMSSearchPanel;
