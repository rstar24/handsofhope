import { CYFSWMSNextButton } from "../../components/CYFSWMSButtons";
import CYFMSInput from "../../components/cyfms/CYFMSInput";
import CYFMSLayout from "../../components/cyfms/CYFMSLayout";
import {
  doGetContact,
  doPostContact,
} from "../../features/cyfms/contact/cyfmsContactSlice";
import { useAppDispatch, useAppSelector } from "../../library/hooks";
import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { FormEvent, ReactElement } from "react";

/**
 * The CYFMSContact functional component.
 * @returns CYFMSContact component skeleton.
 */
const CYFMSContact = (): ReactElement => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const participantId = useAppSelector(
    (state) => state.cyfmsRegister.user.participantId
  );
  const contactData = useAppSelector((state) => state.cyfmsContact.contactData);

  useEffect(() => {
    dispatch(doGetContact(participantId))
      .unwrap()
      .then((data) => {
        console.log("cyfmsContact GET backend API worked successfully");
        console.log(data);
      })
      .catch((err) => {
        console.log("cyfmsContact GET backend API didn't work");
        console.log(err);
      });
  }, []);

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    const cyfmsContactForm: any = e.currentTarget;
    const cyfmsContactFormData = {
      participantId: participantId,
      participantContactId: contactData.participantContactId,
      addressLine1: cyfmsContactForm.cyfmsContactAddressLine1.value,
      addressLine2: cyfmsContactForm.cyfmsContactAddressLine2.value,
      city: cyfmsContactForm.cyfmsContactCity.value,
      province: cyfmsContactForm.cyfmsContactProvince.value,
      postalCode: cyfmsContactForm.cyfmsContactPostalCode.value,
      homePhone: cyfmsContactForm.cyfmsContactHomePhone.value,
      workPhone: cyfmsContactForm.cyfmsContactWorkPhone.value,
      cellPhone: cyfmsContactForm.cyfmsContactCellPhone.value,
      emailAddress: cyfmsContactForm.cyfmsContactEmailAddress.value,
    };
    dispatch(doPostContact(cyfmsContactFormData))
      .unwrap()
      .then(() => {
        navigate("/cyfms/household_members");
      })
      .catch((err) => {
        console.log("Unable to save Contact.");
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
            <CYFMSInput
              id="cyfmsContactAddressLine1"
              value="Address Line 1"
              autofill={contactData.addressLine1}
            />
          </Box>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <CYFMSInput
              id="cyfmsContactAddressLine2"
              value="Address Line 2"
              autofill={contactData.addressLine2}
            />
          </Box>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <CYFMSInput
              id="cyfmsContactCity"
              value="City"
              autofill={contactData.city}
            />
          </Box>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <CYFMSInput
              id="cyfmsContactProvince"
              value="Province"
              autofill={contactData.province}
            />
          </Box>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <CYFMSInput
              id="cyfmsContactPostalCode"
              value="Postal Code"
              autofill={contactData.postalCode}
            />
          </Box>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}></Box>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <CYFMSInput
              id="cyfmsContactHomePhone"
              value="Home Phone"
              autofill={contactData.homePhone}
            />
          </Box>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <CYFMSInput
              id="cyfmsContactCellPhone"
              value="Cell Phone"
              autofill={contactData.cellPhone}
            />
          </Box>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <CYFMSInput
              id="cyfmsContactWorkPhone"
              value="Work Phone"
              autofill={contactData.workPhone}
            />
          </Box>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <CYFMSInput
              id="cyfmsContactEmailAddress"
              value="Email Address"
              autofill={contactData.emailAddress}
              type="gmail"
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

export default CYFMSContact;
