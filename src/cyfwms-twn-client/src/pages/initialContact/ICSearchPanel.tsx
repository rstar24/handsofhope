import AuthLayout from "../../components/auth/layout/AuthLayout";
import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import type { FormEvent, ReactElement } from "react";
import ICHeader from "../../components/initialContact/ICHeader";
import ICDropdown from "../../components/initialContact/ICDropdown";
import ICInput from "../../components/initialContact/ICInput";
/**
 * The ICSearchPanel functional component.
 * @returns ICSearchPanel component skeleton.
 */
const ICSearchPanel = (): ReactElement => {
  const [isShown, setIsShown] = useState(false);

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
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
          Search for an Initial Contact
        </Button>
      </Box>
      <Box
        component="form"
        sx={{
          ml: 65,
          mr: 15,
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
        <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
          <ICDropdown
            id="status"
            optionsList={["In Progress", "Closed"]}
            value="Status"
          />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button variant="contained" type="submit">
            Search
          </Button>
        </Box>
        {/* {isShown && <ICSearchResult />} */}
      </Box>
    </AuthLayout>
  );
};

export default ICSearchPanel;
