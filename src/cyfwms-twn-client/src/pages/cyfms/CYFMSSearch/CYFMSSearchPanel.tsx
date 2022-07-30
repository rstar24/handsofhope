import Input from "../../../components/Input";
import AuthLayout from "../../../components/auth/layout/AuthLayout";
import { Box, Button } from "@mui/material";

import React, { useEffect, useState } from "react";

import CYFMSHeader from "../../../components/cyfms/CYFMSHeader";
import type { FormEvent, ReactElement } from "react";
import CYFMSSearchResult from "./CYFMSSearchResult";
import { useAppDispatch, useAppSelector } from "../../../library/hooks";
import { doGetSearch } from "../../../features/search/searchSlice";
import CYFMSDropdown from "../../../components/cyfms/CYFMSDropdown";
import { doGetMaritalStatus } from "../../../features/codetable/codetableSlice";
/**
 * The CYFMSSearchPanel functional component.
 * @returns CYFMSSearchPanel component skeleton.
 */
const CYFMSSearchPanel = (): ReactElement => {
  const dispatch = useAppDispatch();
  const [isShown, setIsShown] = useState(false);
  const { maritalstatus } = useAppSelector((state) => (state as any).codetable);
  useEffect(() => {
    dispatch(doGetMaritalStatus());
  }, []);
  const submitHandler = (e: FormEvent) => {
    e.preventDefault();

    const data: any = e.currentTarget;
    const searchUser = {
      firstname: data.firstName.value || null,
      surname: data.lastName.value || null,
      middleName: data.middleName.value || null,
      dateOfBirth: data.dateOfBirth.value || null,
      maritalStatus: data.maritalStatus.value || null,
      city: data.city.value || null,
      phoneNumber: data.phoneNo.value || null,
    };
    dispatch(doGetSearch({ readUser: searchUser }))
      .unwrap()
      .then(() => {
        setIsShown(true);
      })
      .catch((err) => {});
  };

  const hide = () => {
    setIsShown(false);
  };

  return (
    <AuthLayout>
      <CYFMSHeader />
      <Box
        sx={{
          p: 2,
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
          ml: 60,
          mr: 20,
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem 0",
        }}
        onSubmit={submitHandler}
      >
        <Input
          id="firstName"
          minChars={2}
          validationPattern={`^[a-zA-Z ]*$`}
          validationTitle="Digits are not allowed!"
          value="First Name"
        />
        <Input
          id="middleName"
          minChars={2}
          validationPattern={`^[a-zA-Z ]*$`}
          validationTitle="Digits are not allowed!"
          value="Middle Name"
        />
        <Input
          id="lastName"
          minChars={2}
          validationPattern={`^[a-zA-Z ]*$`}
          validationTitle="Digits are not allowed!"
          value="Last Name"
        />
        <Input
          id="dateOfBirth"
          maxDate={new Date().toISOString().substring(0, 10)}
          minDate="1900-01-01"
          type="date"
          value="Date Of Birth"
        />
        <CYFMSDropdown
          id="maritalStatus"
          optionsList={Object.values(maritalstatus).map(
            (status: any) => status.en
          )}
          value="Marital Status"
        />
        <Input
          id="phoneNo"
          minChars={2}
          validationPattern={`^[^a-zA-Z]*$`}
          validationTitle="Alphabets are not allowed!"
          value="Phone No"
          name="phoneNo"
        />
        <Input
          id="city"
          minChars={2}
          validationPattern={`^[a-zA-Z ]*$`}
          validationTitle="Digits are not allowed!"
          value="City"
          name="city"
        />
        <Box sx={{ display: "flex", justifyContent: "center", width: 730 }}>
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
