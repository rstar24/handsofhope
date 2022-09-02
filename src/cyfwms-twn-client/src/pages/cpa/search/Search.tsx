import Input from "../../../components/Input";
import Popup from "../../../components/Popup";
import AuthLayout from "../../../components/auth/layout/AuthLayout";
import CYFMSDropdown from "../../../components/cyfms/CYFMSDropdown";
import CYFMSHeader from "../../../components/cyfms/CYFMSHeader";
import Results from "../../../components/cyfms/search/Results";
import Router from "../../../components/nestedRouters/CYFMS";
import { onKeyDown } from "../../../library/app";
import { useAppDispatch, useAppSelector } from "../../../library/hooks";
// import { handleEffect, handleSubmit } from "./search_";
import { Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import type { FormEvent, ReactElement } from "react";
import CPAHeader from "../../../components/cpa/CPAHeader";

/**
 * The Search functional component.
 * @returns Search component skeleton.
 */
const Search = (): ReactElement => {
  return (
    <AuthLayout>
      <CPAHeader />
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
              maxWidth: 200,
              textTransform: "none",
              mx: "auto",
              mb: "auto",
            }}
          >
            Search for a Cultural Program or activity
          </Button>
        </Box>
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem 0",
          }}
          //   onSubmit={(event: FormEvent<HTMLFormElement>) =>
          //     handleSubmit(event, dispatch, setIsShown)
          //   }
          //   onKeyDown={onKeyDown}
          //
        >
          <Input
            id="referenceId"
            validationPattern={`^[^a-zA-Z]*$`}
            validationTitle="Alphabets are not allowed!"
            value="Reference Id"
          />
          <Input
            id="Name"
            minChars={2}
            validationPattern={`^[a-zA-Z ]*$`}
            validationTitle="Digits are not allowed!"
            value="Name"
          />
          <CYFMSDropdown
            id="Type"
            value="Type"
            optionsList={["Program", "Activity"]}
          />
          <Input
            id="Caseworker"
            minChars={2}
            validationPattern={`^[a-zA-Z ]*$`}
            validationTitle="Digits are not allowed!"
            value="Caseworker"
          />
          <Input id="dateOfBirth" type="date" value="Date " />

          <Input
            id="status"
            minChars={2}
            validationPattern={`^[^a-zA-Z]*$`}
            validationTitle="Alphabets are not allowed!"
            value="Status"
            name="status"
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
              <Button variant="contained" type="reset">
                Reset
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
      {/* {isShown && <Results />} */}
      <Popup children={<Router />} />
    </AuthLayout>
  );
};

export default Search;
