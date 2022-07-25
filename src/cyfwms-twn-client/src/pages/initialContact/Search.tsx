import AuthLayout from "../../components/auth/layout/AuthLayout";
import ICDropdown from "../../components/initialContact/ICDropdown";
import ICHeader from "../../components/initialContact/ICHeader";
import ICInput from "../../components/initialContact/ICInput";
import { Box, Button } from "@mui/material";
import React from "react";
import type { FormEvent, ReactElement } from "react";

/**
 * The Search functional component.
 * @returns Search component skeleton.
 */
const Search = (): ReactElement => {
  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
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
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button variant="contained" type="submit">
              Search
            </Button>
          </Box>
        </Box>
      </Box>
    </AuthLayout>
  );
};

export default Search;
