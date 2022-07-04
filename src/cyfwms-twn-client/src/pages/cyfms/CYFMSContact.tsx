import CYFMSInput from "../../components/cyfms/CYFMSInput";
import CYFMSLayout from "../../components/cyfms/CYFMSLayout";
import { Box, Button, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import type { FormEvent, ReactElement } from "react";
import { useAppDispatch, useAppSelector } from "../../library/hooks";
import {
  doGetContact,
  doPostContact,
} from "../../features/contact/contactSlice";
import { Link } from "react-router-dom";

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
          mb: "auto",
        }}
        onSubmit={submitHandler}
      >
        <Grid container sm={12} spacing={2}>
          <Grid item sm={5}>
            <CYFMSInput
              id="addrLine1"
              value="Address Line 1"
              autofill={readData.addressLine1}
            />
          </Grid>
          <Grid item sm={5}>
            <CYFMSInput
              id="addrLine2"
              value="Address Line 2"
              autofill={readData.addressLine2}
            />
          </Grid>
          <Grid item sm={5}>
            <CYFMSInput id="city" value="City" autofill={readData.city} />
          </Grid>
          <Grid item sm={5}>
            <CYFMSInput
              id="province"
              value="Province"
              autofill={readData.province}
            />
          </Grid>
          <Grid item sm={5}>
            <CYFMSInput
              id="postalCode"
              value="Postal Code"
              autofill={readData.postalCode}
            />
          </Grid>
          <Grid item sm={5}>
            <CYFMSInput
              id="homePhone"
              value="Home Phone"
              autofill={readData.homePhone}
            />
          </Grid>
          <Grid item sm={5}>
            <CYFMSInput
              id="cellPhone"
              value="Cell Phone"
              autofill={readData.cellPhone}
            />
          </Grid>
          <Grid item sm={5}>
            <CYFMSInput
              id="workPhone"
              value="Work Phone"
              autofill={readData.workPhone}
            />
          </Grid>
          <Grid item sm={5}>
            <CYFMSInput
              id="emailAddr"
              value="Email Address"
              autofill={readData.emailAddress}
            />
          </Grid>
          <Grid item sm={5}></Grid>
          <Grid item sm={8.8}></Grid>
          <Grid item sm={2}>
            <Button
              variant="contained"
              type="submit"
              component={Link}
              to="/cyfms/household_members"
            >
              Next
            </Button>
          </Grid>
        </Grid>
      </Box>
    </CYFMSLayout>
  );
};

export default CYFMSContact;
