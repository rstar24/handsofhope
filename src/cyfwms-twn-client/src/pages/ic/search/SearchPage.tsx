import Dropdown from "../../../components/Dropdown";
import Header from "../../../components/Header";
import Input from "../../../components/Input";
import Popup from "../../../components/Popup";
import AuthLayout from "../../../components/auth/layout/AuthLayout";
import SearchResults from "../../../components/initialContact/search/SearchResults";
import Router from "../../../components/routers/IcRouter";
import { onKeyDown } from "../../../library/app";
import { useAppDispatch, useAppSelector } from "../../../library/hooks";
import { handleSubmit } from "./searchPage_";
import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import type { FC, FormEvent } from "react";

/**
 * *IC* aka *Initial Contact* module. \
 * `SearchPage` is *IC* modules' search page.
 */
const SearchPage: FC = () => {
  const dispatch = useAppDispatch();
  const icstatus = useAppSelector(
    (state) => state.codetable.initialContactStatus
  );

  const [isShown, setIsShown] = useState(false);

  const hide = () => {
    setIsShown(false);
  };

  return (
    <AuthLayout>
      <Header bannerTitle="Initial Contact" />
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
            Search for Initial Contact(s)
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
          <Input id="clientName" value="Client Name" />
          <Input
            id="fileNumber"
            minChars={1}
            validationPattern={`^[^a-zA-Z]*$`}
            validationTitle="Alphabets are not allowed!"
            value="File No."
          />
          <Input
            id="caseWorker"
            minChars={2}
            validationPattern={`^[a-zA-Z ]*$`}
            validationTitle="Digits are not allowed!"
            value="Caseworker"
          />
          <Input
            id="startingDate"
            maxDate={new Date().toISOString().substring(0, 10)}
            minDate="1900-01-01"
            type="date"
            value="Start Date"
          />
          <Dropdown
            id="status"
            autofill={""}
            optionsList={Object.values(icstatus).map(
              (status: any) => status.en
            )}
            value="Status"
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
      {isShown && <SearchResults />}
      <Popup children={<Router />} />
    </AuthLayout>
  );
};

export default SearchPage;
