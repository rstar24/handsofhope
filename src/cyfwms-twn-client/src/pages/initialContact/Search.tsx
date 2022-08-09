import Input from "../../components/Input";
import Popup from "../../components/Popup";
import AuthLayout from "../../components/auth/layout/AuthLayout";
import CYFMSDropdown from "../../components/cyfms/CYFMSDropdown";
import ICHeader from "../../components/initialContact/ICHeader";
import Router from "../../components/nestedRouters/InitialContact";
import { doGetICStatus } from "../../features/codetable/codetableSlice";
import { doGet as doGetSearch } from "../../features/initialContact/search/slice";
import { useAppDispatch, useAppSelector } from "../../library/hooks";
import Results from "../../components/initialContact/search/Results";
import { Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import type { Record } from "../../features/initialContact/search/slice";
import type { FormEvent, ReactElement } from "react";

/**
 * The Search functional component.
 * @returns Search component skeleton.
 */
const Search = (): ReactElement => {
  const dispatch = useAppDispatch();
  const icstatus = useAppSelector(
    (state) => state.codetable.initialContactStatus
  );
  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    dispatch(doGetICStatus());
  }, []);

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    const form: any = e.currentTarget;
    console.log(form.clientName.value);
    const formData: Record = {
      fileDetailsId: null,
      referenceId: form.refreferenceId.value || null,
      clientName: form.clientName.value || null,
      fileNumber: form.fileNumber.value || null,
      caseworker: form.caseWorker.value || null,
      startingDate: form.startingDate.value || null,
      status: form.status.value || null,
    };
    dispatch(doGetSearch(formData))
      .unwrap()
      .then(() => {
        console.log("InitialContact Search POST backend API was successful!");
        setIsShown(true);
      })
      .catch((err) => {
        console.log("InitialContact Search POST backend API didn't work!");
        console.log(err);
      });
  };

  const hide = () => {
    setIsShown(false);
  };

  return (
    <AuthLayout>
      <ICHeader />
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
          onSubmit={submitHandler}
        >
          <Input
            id="refreferenceId"
            validationPattern={`^[^a-zA-Z]*$`}
            validationTitle="Alphabets are not allowed!"
            value="Reference ID"
          />
          <Input
            id="clientName"
            minChars={2}
            validationPattern={`^[a-zA-Z ]*$`}
            validationTitle="Digits are not allowed!"
            value="Client Name"
          />
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
          <CYFMSDropdown
            id="status"
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
      {isShown && <Results />}
      <Popup children={<Router />} />
    </AuthLayout>
  );
};

export default Search;
