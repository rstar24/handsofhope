import CYFMSInput from "../../components/cyfms/CYFMSInput";
import CYFMSLayout from "../../components/cyfms/CYFMSLayout";
import { Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import type { FormEvent, ReactElement } from "react";
import { useAppDispatch, useAppSelector } from "../../library/hooks";
import {
  doGetContact,
  doPostContact,
} from "../../features/contact/contactSlice";

/**
 * The CYFMSContact functional component.
 * @returns CYFMSContact component skeleton.
 */
const CYFMSContact = (): ReactElement => {
  const dispatch = useAppDispatch();
  const participantId = useAppSelector(
    (state) => (state as any).registration.user.participantId
  );
  const readData = useAppSelector((state) => (state as any).contact.readUser);
  const contactData = useAppSelector((state) => (state as any).contact.user);

  useEffect(() => {
    dispatch(doGetContact(participantId));
  }, [contactData, dispatch, participantId]);

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    const data: any = e.currentTarget;
    const newContact = {
      participantId: participantId,
      participantContactId: contactData.participantContactId,
      addressLine1: data.addrLine1.value,
      addressLine2: data.addrLine2.value,
      city: data.city.value,
      province: data.province.value,
      postalCode: data.postalCode.value,
      homePhone: data.homePhone.value,
      workPhone: data.workPhone.value,
      cellPhone: data.cellPhone.value,
      emailAddress: data.emailAddr.value,
    };

    dispatch(doPostContact({ user: newContact }));
  };

  return (
    <CYFMSLayout>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "2rem 2rem",
          mb: "auto",
        }}
        onSubmit={submitHandler}
      >
        <CYFMSInput
          id="addrLine1"
          value="Address Line 1"
          autofill={readData.addressLine1}
        />
        <CYFMSInput
          id="addrLine2"
          value="Address Line 2"
          autofill={readData.addressLine2}
        />
        <CYFMSInput id="city" value="City" autofill={readData.city} />
        <CYFMSInput
          id="province"
          value="Province"
          autofill={readData.province}
        />
        <CYFMSInput
          id="postalCode"
          value="Postal Code"
          autofill={readData.postalCode}
        />
        <CYFMSInput
          id="homePhone"
          value="Home Phone"
          autofill={readData.homePhone}
        />
        <CYFMSInput
          id="cellPhone"
          value="Cell Phone"
          autofill={readData.cellPhone}
        />
        <CYFMSInput
          id="workPhone"
          value="Work Phone"
          autofill={readData.workPhone}
        />
        <CYFMSInput
          id="emailAddr"
          value="Email Address"
          autofill={readData.emailAddress}
        />
        <Button variant="contained" type="submit">
          Next
        </Button>
      </Box>
    </CYFMSLayout>
  );
};

export default CYFMSContact;
