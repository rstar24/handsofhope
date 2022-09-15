import Input from "../../../components/Input";
import Popup from "../../../components/Popup";
import AuthLayout from "../../../components/auth/layout/AuthLayout";
import Router from "../../../components/nestedRouters/CPA";
import { onKeyDown } from "../../../library/app";
import { useAppDispatch, useAppSelector } from "../../../library/hooks";
import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import type { FormEvent, ReactElement } from "react";
import CPAHeader from "../../../components/cpa/CPAHeader";
import { handleSubmit } from "./search_";
import CPASearchResult from "../../../components/cpa/CPASearchResult";
import CPADropdown from "../../../components/cpa/CPADropdown";

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
          <CPADropdown
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

          <CPADropdown
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
              <Button variant="contained" type="reset" onClick={hide}>
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
