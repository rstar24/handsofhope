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
  const data = useAppSelector((state) => (state as any).contact.user);
  useEffect(() => {
    dispatch(doGetContact(participantId));
  }, []);

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    const data: any = e.currentTarget;
    const newContact = {
      participantId: participantId,
      participantContactId: 0,
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
        <CYFMSInput id="addrLine1" value="Address Line 1" />
        <CYFMSInput id="addrLine2" value="Address Line 2" />
        <CYFMSInput id="city" value="City" />
        <CYFMSInput id="province" value="Province" />
        <CYFMSInput id="postalCode" value="Postal Code" />
        <CYFMSInput id="homePhone" value="Home Phone" />
        <CYFMSInput id="cellPhone" value="Cell Phone" />
        <CYFMSInput id="workPhone" value="Work Phone" />
        <CYFMSInput id="emailAddr" value="Email Address" />
        <Button variant="contained" type="submit">
          Next
        </Button>
      </Box>
    </CYFMSLayout>
  );
};

export default CYFMSContact;
