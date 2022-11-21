import Dropdown from "../../../components/Dropdown";
import Header from "../../../components/Header";
import Input from "../../../components/Input";
import Popup from "../../../components/Popup";
import AuthLayout from "../../../components/auth/layout/AuthLayout";
import Results from "../../../components/cpa/CPASearchResult";
import Router from "../../../components/routers/CpaRouter";
import { onKeyDown } from "../../../library/app";
import { useAppDispatch, useAppSelector } from "../../../library/hooks";
import { handleSubmit } from "./searchPage_";
import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import type { FC, FormEvent } from "react";

/**
 * *CPA* aka *Cultural Programs and Activities* module. \
 * `SearchPage` is *CPA* modules' search page.
 */
const SearchPage: FC = () => {
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
      <Header bannerTitle="Cultural Programs and Activities" />
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "center",
          p: "1rem",
          gap: "0 1rem",
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
            Search for a Cultural Program or Activity
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
          <Dropdown
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
          <Dropdown
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
      {isShown && <Results />}
      <Popup children={<Router />} />
    </AuthLayout>
  );
};

export default SearchPage;
