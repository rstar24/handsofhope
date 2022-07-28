import {
  CYFSWMSNextButton,
  CYFSWMSSaveButton,
} from "../../components/CYFSWMSButtons";
import CYFMSDateInput from "../../components/cyfms/CYFMSDateInput";
import CYFMSDropdown from "../../components/cyfms/CYFMSDropdown";
import CYFMSInput from "../../components/cyfms/CYFMSInput";
import CYFMSLayout from "../../components/cyfms/CYFMSLayout";
import CYFMSValidationInput from "../../components/cyfms/CYFMValidationInput";
import { doGet, doPost } from "../../features/cyfms/register/slice";
import { initiate } from "../../features/initiatorSlice";
import { unhideTabs } from "../../features/navBarSlice";
import { useAppDispatch, useAppSelector } from "../../library/hooks";
import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { Data } from "../../features/cyfms/register/slice";
import type { FormEvent, ReactElement } from "react";

/**
 * The CYFMSRegister functional component.
 * @returns CYFMSRegister component skeleton.
 */
const CYFMSRegister = (): ReactElement => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { gender, maritalstatus } = useAppSelector(
    (state) => (state as any).codetable
  );
  const data = useAppSelector((state) => state.cyfmsRegister.data);
  const isInitiated = useAppSelector((state) => state.initiator.isInitiated);

  useEffect(() => {
    dispatch(doGet(data.participantId))
      .unwrap()
      .then((data) => {
        console.log("Register GET backend API was successful!");
      })
      .catch((err) => {
        console.log("Register GET backend API didn't work!");
        console.log(err);
      });
  }, []);

  // Handles the form data submission and other
  // activities.
  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    const form: any = e.currentTarget;
    const formData: Data = {
      participantId: data.participantId,
      firstname: form.firstName.value,
      middleName: form.middleName.value,
      surname: form.lastName.value,
      dateOfBirth: form.dateOfBirth.value,
      gender: form.gender.value,
      maritalStatus: form.maritalStatus.value,
    };
    dispatch(doPost(formData))
      .unwrap()
      .then(() => {
        console.log("Register POST backend API was successful!");
        dispatch(unhideTabs(null));
        dispatch(initiate(null));
      })
      .catch((err) => {
        console.log("Unable to register.");
        console.log(err);
      });
  };

  const nextClickHandler = () => {
    navigate("/cyfms/contact");
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
              autofill={data.firstname}
              id="firstName"
              value="First Name"
              required
            />
          </Box>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <CYFMSValidationInput
              autofill={data.middleName}
              id="middleName"
              value="Middle Name"
            />
          </Box>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <CYFMSValidationInput
              autofill={data.surname}
              id="lastName"
              value="Last Name"
              required
            />
          </Box>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <CYFMSDateInput
              autofill={data.dateOfBirth}
              id="dateOfBirth"
              type="date"
              value="Date of Birth"
              required
            />
          </Box>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <CYFMSDropdown
              autofill={data.gender}
              id="gender"
              optionsList={Object.values(gender).map(
                (gender: any) => gender.en
              )}
              value="Gender"
              required
            />
          </Box>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <CYFMSDropdown
              autofill={data.maritalStatus}
              id="maritalStatus"
              optionsList={Object.values(maritalstatus).map(
                (status: any) => status.en
              )}
              value="Marital Status"
            />
          </Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "right" }}>
          {isInitiated ? (
            <CYFSWMSNextButton onClick={nextClickHandler} />
          ) : (
            <CYFSWMSSaveButton />
          )}
        </Box>
      </Box>
    </CYFMSLayout>
  );
};

export default CYFMSRegister;
