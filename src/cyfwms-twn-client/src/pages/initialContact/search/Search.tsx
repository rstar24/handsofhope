import AuthLayout from "../../../components/auth/layout/AuthLayout";
import ICDropdown from "../../../components/initialContact/ICDropdown";
import ICHeader from "../../../components/initialContact/ICHeader";
import ICInput from "../../../components/initialContact/ICInput";
import { doGet } from "../../../features/initialContact/search/slice";
import { useAppDispatch, useAppSelector } from "../../../library/hooks";
import ICSearchResult from "./ICSearchResult";
import { Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import type { FormEvent, ReactElement } from "react";

/**
 * The Search functional component.
 * @returns Search component skeleton.
 */
const Search = (): ReactElement => {
  const dispatch = useAppDispatch();
  const [isShown, setIsShown] = useState(false);
  //const { status } = useAppSelector((state) => (state as any).codetable);

  useEffect(() => {
    // dispatch(doGetMaritalStatus());
  }, []);

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    const form: any = e.currentTarget;
    const formData = {
      clientName: form.clientName.value || null,
      fileNumber: form.fileNumber.value || null,
      caseworker: form.middleName.value || null,
      date: form.dateOfBirth.value || null,
      status: form.maritalStatus.value || null,
    };
    dispatch(doGet(formData))
      .unwrap()
      .then(() => {
        console.log("InitialContact Search POST backend API was successful!");
        setIsShown(true);
      })
      .catch(() => {
        console.log("InitialContact Search POST backend API didn't work!");
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
          <ICInput id="firstName" value="Client Name" />
          <ICInput id="middleName" value="File No." />
          <ICInput id="lastName" value="Caseworker" />
          <ICInput id="dateOfBirth" type="date" value="Date" />
          <ICDropdown
            id="status"
            optionsList={["In Progress", "Closed"]}
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
        {isShown && <ICSearchResult />}
      </Box>
    </AuthLayout>
  );
};

export default Search;
