import { Box, Button, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../library/hooks";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import type { FormEvent, ReactElement } from "react";
import ICLayout from "../../components/initialContact/ICLayout";
import ICDropdown from "../../components/initialContact/ICDropdown";
import ICInput from "../../components/initialContact/ICInput";
import ICTextArea from "../../components/initialContact/ICTextArea";
import ICTextAreaMax from "../../components/initialContact/ICTextAreaMax";
import ICHalfInput from "../../components/initialContact/ICHalfInput";
import ICFullInput from "../../components/initialContact/ICFullInput";

/**
 * The ICPatientCareInformation functional component.
 * @returns ICPatientCareInformation component skeleton.
 */
const ICPatientCareInformation = (): ReactElement => {
  const navigate = useNavigate();
  const [patient, setPatient] = useState("Outpatient");
  // Handles the form data submission and other
  // activities.
  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
  };

  // Handles the form fields' value changes
  // and other activities.
  const changeHandler = (e: FormEvent) => {};

  return (
    <ICLayout>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem 0",
        }}
        onSubmit={submitHandler}
        onChange={changeHandler}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem 0" }}>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
            <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
              <ICDropdown
                id="ic_referral"
                value="Type of Patient"
                optionsList={["Outpatient", "Inpatient"]}
              />
            </Box>
            <Box sx={{ flexBasis: 0, flexGrow: 1 }}></Box>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem 0" }}>
            <Typography
              sx={{
                paddingLeft: 1,
                color: "blue",
                fontWeight: "bold",
              }}
            >
              {patient}
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
              <Box
                sx={{
                  paddingLeft: 1,
                  flexBasis: 0,
                  flexDirection: "column",
                  flexGrow: 200,
                }}
              >
                <ICTextAreaMax
                  value="Have you seen a therapist or counselor for personal or family
              problems or alcohol/drug treatment?"
                />
              </Box>
              <Box sx={{ flexBasis: 0, flexGrow: 1 }}></Box>
            </Box>
            {patient === "Outpatient" && (
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "1rem 0" }}
              >
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
                  <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
                    <ICInput id="ic_status" value="When?" />
                  </Box>
                  <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
                    <ICInput id="ic_dateClosed" value="Where?" />
                  </Box>
                </Box>

                <Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "1rem 0",
                    }}
                  >
                    <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
                      <ICFullInput id="ic_reasons" value="Reasons" />
                    </Box>
                  </Box>
                </Box>

                <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
                  <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
                    <ICHalfInput
                      id="ic_dateClosed"
                      value="Any involvement in self helf groups such as NA, AA, etc.?"
                    />
                  </Box>
                </Box>

                <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
                  <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
                    <ICInput id="ic_status" value="When?" />
                  </Box>
                  <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
                    <ICInput id="ic_dateClosed" value="Where?" />
                  </Box>
                </Box>
              </Box>
            )}
            {patient === "Inpatient" && (
              <>
                <Box
                  sx={{
                    paddingLeft: 1,
                    flexBasis: 0,
                    flexDirection: "column",
                    flexGrow: 200,
                  }}
                >
                  <ICTextAreaMax value="Reasons?" />
                </Box>
              </>
            )}
          </Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "right" }}>
          <Button variant="contained">Next</Button>
        </Box>
      </Box>
    </ICLayout>
  );
};

export default ICPatientCareInformation;
