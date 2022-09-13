import Input from "../../../components/Input";
import Popup from "../../../components/Popup";
import AuthLayout from "../../../components/auth/layout/AuthLayout";
import CYFMSDropdown from "../../../components/cyfms/CYFMSDropdown";

import Results from "../../../components/cyfms/search/Results";
import Router from "../../../components/nestedRouters/CYFMS";
import { onKeyDown } from "../../../library/app";
import { useAppDispatch, useAppSelector } from "../../../library/hooks";
// import { handleEffect, handleSubmit } from "./search_";
import { Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import type { FormEvent, ReactElement } from "react";
import CPAHeader from "../../../components/cpa/CPAHeader";
import { Record, doGet } from "../../../features/cpa/search/slice";
import { handleEffect, handleSubmit } from "./search_";
import { doGetCPACulturalType } from "../../../features/codetable/slice";
import CPASearchResult from "../../../components/cpa/CPASearchResult";

/**
 * The Search functional component.
 * @returns Search component skeleton.
 */
const Search = (): ReactElement => {
  const dispatch = useAppDispatch();
  const { culturalType, culturalStatus } = useAppSelector(
    (state) => state.codetable
  );

  const [isShown, setIsShown] = useState(false);

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();

    const form: any = e.currentTarget;
    const formData: Record = {
      CulturalProgramId: null,
      referenceId: form.referenceId.value || null,
      name: form.name.value || null,
      caseworker: form.caseworker.value || null,
      type: form.type.value || null,
      startDate: form.startDate.value || null,
      status: form.status.value || null,
    };
    dispatch(doGet(formData))
      .unwrap()
      .then(() => {
        console.log("InitialContact Search POST backend API was successful!");
        setIsShown(true);
      })
      .catch((err) => {
        console.log("InitialContact Search POST backend API didn't work!");
        console.log(err);
      });
    console.log("submit ");
  };
  const hide = () => {
    setIsShown(false);
  };
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
            id="name"
            minChars={2}
            validationPattern={`^[a-zA-Z ]*$`}
            validationTitle="Digits are not allowed!"
            value="Name"
          />
          <CYFMSDropdown
            autofill={""}
            id="type"
            optionsList={Object.values(culturalType).map(
              (type: any) => type.en
            )}
            value="Type"
          />
          <Input
            id="caseworker"
            minChars={2}
            validationPattern={`^[a-zA-Z ]*$`}
            validationTitle="Digits are not allowed!"
            value="Caseworker"
          />
          <Input id="startDate" type="date" value="Date " />

          <CYFMSDropdown
            autofill={""}
            id="status"
            value="Status"
            optionsList={Object.values(culturalStatus).map(
              (type: any) => type.en
            )}
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
      {isShown && <CPASearchResult />}
      <Popup children={<Router />} />
    </AuthLayout>
  );
};

export default Search;
