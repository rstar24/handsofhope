import { CYFSWMSNextButton } from "../../../components/CYFSWMSButtons";
import Input from "../../../components/Input";
import Dropdown from "../../../components/Dropdown";
import CYFMSLayout from "../../../components/cyfms/CYFMSLayout";
import { onKeyDown } from "../../../library/app";
import { useAppDispatch, useAppSelector } from "../../../library/hooks";
import { handleEffect, handleSubmit } from "./contact_";
import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { FormEvent, ReactElement } from "react";

/**
 * The Contact functional component.
 * @returns Contact component skeleton.
 */
const Contact = (): ReactElement => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const participantID = useAppSelector(
    (state) => state.cyfmsRegister.data.participantId
  );
  const { province } = useAppSelector((state) => (state as any).codetable);
  const data = useAppSelector((state) => state.cyfmsContact.data);

  useEffect(() => handleEffect(dispatch, participantID), []);

  return (
    <CYFMSLayout>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem 0",
        }}
        onSubmit={(event: FormEvent<HTMLFormElement>) =>
          handleSubmit(event, navigate, dispatch, participantID, data)
        }
        onKeyDown={onKeyDown}
      >
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <Input
              autofill={data.addressLine1}
              id="addressLine1"
              value="Address Line 1"
            />
          </Box>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <Input
              autofill={data.addressLine2}
              id="addressLine2"
              value="Address Line 2"
            />
          </Box>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <Input
              autofill={data.city}
              id="city"
              validationPattern={`^[a-zA-Z ]*$`}
              validationTitle="Digits are not allowed!"
              value="City"
            />
          </Box>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <Dropdown
              autofill={data.province}
              id="province"
              value="Province"
              optionsList={Object.values(province).map(
                (province: any) => province.en
              )}
            />
          </Box>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <Input
              autofill={data.postalCode}
              id="postalCode"
              value="Postal Code"
            />
          </Box>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}></Box>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <Input
              autofill={data.homePhone}
              id="homePhone"
              validationPattern={`^[^a-zA-Z]*$`}
              validationTitle="Alphabets are not allowed!"
              value="Home Phone"
            />
          </Box>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <Input
              autofill={data.cellPhone}
              id="cellPhone"
              validationPattern={`^[^a-zA-Z]*$`}
              validationTitle="Alphabets are not allowed!"
              value="Cell Phone"
            />
          </Box>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <Input
              autofill={data.workPhone}
              id="workPhone"
              validationPattern={`^[^a-zA-Z]*$`}
              validationTitle="Alphabets are not allowed!"
              value="Work Phone"
            />
          </Box>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <Input
              autofill={data.emailAddress}
              id="emailAddress"
              value="Email Address"
              type="email"
            />
          </Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "right" }}>
          <CYFSWMSNextButton />
        </Box>
      </Box>
    </CYFMSLayout>
  );
};

export default Contact;
