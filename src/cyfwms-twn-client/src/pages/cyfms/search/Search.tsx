import Input from "../../../components/Input";
import Popup from "../../../components/Popup";
import AuthLayout from "../../../components/auth/layout/AuthLayout";
import CYFMSDropdown from "../../../components/cyfms/CYFMSDropdown";
import CYFMSHeader from "../../../components/cyfms/CYFMSHeader";
import Results from "../../../components/cyfms/search/Results";
import Router from "../../../components/routers/CyfmsRouter";
import { onKeyDown } from "../../../library/app";
import { useAppDispatch, useAppSelector } from "../../../library/hooks";
import { handleEffect, handleSubmit } from "./search_";
import { Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import type { FormEvent, ReactElement } from "react";

/**
 * The Search functional component.
 * @returns Search component skeleton.
 */
const Search = (): ReactElement => {
  const dispatch = useAppDispatch();
  const maritalstatus = useAppSelector(
    (state) => state.codetable.maritalstatus
  );
  const [isShown, setIsShown] = useState<boolean>(false);

  useEffect(() => handleEffect(dispatch), []);

  const hide = () => {
    setIsShown(false);
  };

  return (
    <AuthLayout>
      <CYFMSHeader />
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "center",
          p: "1rem",
          gap: "1rem",
          "& div": { width: { xs: "100%", md: 350 } },
        }}
      >
        <Box sx={{ display: "flex" }}>
          <Button
            sx={{
              background: "lightgrey",
              color: "black",
              border: "1px solid black",
              maxWidth: 300,
              textTransform: "none",
              mx: "auto",
              mb: "auto",
            }}
          >
            Search for a Child, Youth, or Family Member
          </Button>
        </Box>
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem 0",
          }}
          onSubmit={(event: FormEvent<HTMLFormElement>) =>
            handleSubmit(event, dispatch, setIsShown)
          }
          onKeyDown={onKeyDown}
        >
          <Input
            id="referenceId"
            validationPattern={`^[^a-zA-Z]*$`}
            validationTitle="Alphabets are not allowed!"
            value="Reference Id"
          />
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
            autofill={""}
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
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            <Box sx={{ flex: "1.08 1 0" }}></Box>
            <Box
              sx={{
                flex: "2 1 0",
                display: "flex",
                justifyContent: "center",
                gap: "0 1rem",
              }}
            >
              <Button variant="contained" type="submit">
                Search
              </Button>
              <Button variant="contained" type="reset" onClick={hide}>
                Reset
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
      {isShown && <Results />}
      <Popup children={<Router />} />
    </AuthLayout>
  );
};

export default Search;
