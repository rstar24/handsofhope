import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import React from "react";
import type { FormEvent, ReactElement } from "react";
import ICLayout from "../../components/initialContact/ICLayout";
import ICDropdown from "../../components/initialContact/ICDropdown";
import ICTextArea from "../../components/initialContact/ICTextArea";

/**
 * The ICPresentConcerns functional component.
 * @returns ICPresentConcerns component skeleton.
 */
const ICPresentConcerns = (): ReactElement => {
  const navigate = useNavigate();

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
          <Box>
            <Box
              sx={{ display: "flex", flexDirection: "column", gap: "1rem 0" }}
            >
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
                <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
                  <ICDropdown
                    id="ic_referral"
                    value="Please Select Present Concerns"
                    optionsList={["Health", "Adictions", "Abuse"]}
                  />
                </Box>
                <Box sx={{ flexBasis: 0, flexGrow: 1 }}></Box>
              </Box>
              <ICTextArea
                id="ic_brieflyExplainSituation"
                value="Briefly Explain Situation"
              />
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
                <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
                  <ICDropdown
                    id="ic_referral"
                    value="Please Select Present Concerns"
                    optionsList={["Alcohol", "Drugs", "Narcotic"]}
                  />
                </Box>
                <Box sx={{ flexBasis: 0, flexGrow: 1 }}></Box>
              </Box>
              <ICTextArea
                id="ic_brieflyExplainSituation"
                value="Briefly Explain Situation"
              />
            </Box>
          </Box>
          <Box>
            <Box
              sx={{ display: "flex", flexDirection: "column", gap: "1rem 0" }}
            ></Box>
          </Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "right" }}>
          <Button variant="contained">Next</Button>
        </Box>
      </Box>
    </ICLayout>
  );
};

export default ICPresentConcerns;
