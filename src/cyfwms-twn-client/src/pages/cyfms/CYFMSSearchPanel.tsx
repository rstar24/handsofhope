import AuthLayout from "../../components/auth/layout/AuthLayout";
import CYFMSInput from "../../components/cyfms/CYFMSInput";
import { Box, Button, Typography } from "@mui/material";

import React, { useState, useEffect } from "react";

import CYFMSHeader from "../../components/cyfms/CYFMSHeader";
import type { FormEvent, ReactElement } from "react";
import CYFMSSearchResult from "./CYFMSSearchResult";
/**
 * The CYFMSSearchPanel functional component.
 * @returns CYFMSSearchPanel component skeleton.
 */
const CYFMSSearchPanel = (): ReactElement => {
  const [isShown, setIsShown] = useState(false);
  const handleClick = () => {
    setIsShown((current) => !current);
  };

  return (
    <AuthLayout>
      <CYFMSHeader />
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
          Search for a Child, Youth, or Family Member
        </Button>
      </Box>
      <Box sx={{ ml: 60 }}>
        <CYFMSInput id="firstName" value="First Name" required />
        <CYFMSInput id="middleName" value="Middle Name" />
        <CYFMSInput id="lastName" value="last Name" />
        <CYFMSInput
          id="dateOfBirth"
          type="date"
          value="Date Of Birth"
          required
        />

        <CYFMSInput
          id="maritalStatus"
          value="MaritalStatus"
          name="maritalStatus"
        />
        <CYFMSInput id="phoneNo" value="Phone No" name="phoneNo" />
        <CYFMSInput id="city" value="City" name="city" />

        <div className="column">
          <Button variant="contained" type="submit" onClick={handleClick}>
            Search
          </Button>
          <Button variant="contained" type="reset" sx={{ ml: 2 }}>
            Reset
          </Button>
        </div>
        {isShown && <CYFMSSearchResult />}
      </Box>
    </AuthLayout>
  );
};

export default CYFMSSearchPanel;
