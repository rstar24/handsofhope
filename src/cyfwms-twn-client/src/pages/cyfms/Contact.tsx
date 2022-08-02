import { CYFSWMSNextButton } from "../../components/CYFSWMSButtons";
import CYFMSLayout from "../../components/cyfms/CYFMSLayout";
import Input from "../../components/Input";
import { doGet, doPost } from "../../features/cyfms/contact/slice";
import { useAppDispatch, useAppSelector } from "../../library/hooks";
import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { Data } from "../../features/cyfms/contact/slice";
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
  const data = useAppSelector((state) => state.cyfmsContact.data);

  useEffect(() => {
    dispatch(doGet(participantID))
      .unwrap()
      .then((data) => {
        console.log("Contact GET backend API worked successfully");
      })
      .catch((err) => {
        console.log("Contact GET backend API didn't work");
        console.log(err);
      });
  }, []);

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    const form: any = e.currentTarget;
    const formData: Data = {
      participantId: participantID,
      participantContactId: data.participantContactId,
      addressLine1: form.addressLine1.value,
      addressLine2: form.addressLine2.value,
      city: form.city.value,
      province: form.province.value,
      postalCode: form.postalCode.value,
      homePhone: form.homePhone.value,
      workPhone: form.workPhone.value,
      cellPhone: form.cellPhone.value,
      emailAddress: form.emailAddress.value,
    };
    dispatch(doPost(formData))
      .unwrap()
      .then(() => {
        console.log("Contact POST backend API was successful!");
        navigate("/cyfms/household_members");
      })
      .catch((err) => {
        console.log("Contact POST backend API didn't work!");
        console.log(err);
      });
  };

  return (
    <CYFMSLayout>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem 0",
        }}
        onSubmit={submitHandler}
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
            <Input
              autofill={data.province}
              id="province"
              validationPattern={`^[a-zA-Z ]*$`}
              validationTitle="Digits are not allowed!"
              value="Province"
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
