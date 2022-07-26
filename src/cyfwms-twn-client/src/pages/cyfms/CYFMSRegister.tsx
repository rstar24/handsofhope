import CYFMSDropdown from "../../components/cyfms/CYFMSDropdown";
import CYFMSInput from "../../components/cyfms/CYFMSInput";
import CYFMSLayout from "../../components/cyfms/CYFMSLayout";
import CYFMSDateInput from "../../components/cyfms/CYFMSDateInput";
import {
  CYFSWMSNextButton,
  CYFSWMSSaveButton,
} from "../../components/CYFSWMSButtons";
import {
  doGetCYFMSRegister,
  doPostCYFMSRegister,
} from "../../features/cyfms/register/cyfmsRegisterSlice";
import { initiate } from "../../features/initiatorSlice";
import { unhideTabs } from "../../features/navBarSlice";
import { useAppDispatch, useAppSelector } from "../../library/hooks";
import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { FormEvent, ReactElement } from "react";
import CYFMSValidationInput from "../../components/cyfms/CYFMValidationInput";

/**
 * The CYFMSRegister functional component.
 * @returns CYFMSRegister component skeleton.
 */
const CYFMSRegister = (): ReactElement => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const participantId = useAppSelector(
    (state) => (state as any).cyfmsRegister.user.participantId
  );
  const { gender, maritalstatus } = useAppSelector(
    (state) => (state as any).codetable
  );

  const userData = useAppSelector((state) => (state as any).cyfmsRegister.user);
  const readData = useAppSelector(
    (state) => (state as any).cyfmsRegister.readUser
  );
  const isInitiated = useAppSelector(
    (state: any) => state.initiator.isInitiated
  );

  useEffect(() => {
    dispatch(
      doGetCYFMSRegister(
        readData.participantId ? readData.participantId : participantId
      )
    );
  }, []);

  // Handles the form data submission and other
  // activities.
  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    const data: any = e.currentTarget;
    const newUser = {
      participantId: readData.participantId
        ? readData.participantId
        : participantId,
      firstname: data.cyfmsRegister_FirstName.value,
      middleName: data.cyfmsRegister_MiddleName.value,
      surname: data.cyfmsRegister_LastName.value,
      dateOfBirth: data.cyfmsRegister_DateOfBirth.value,
      gender: data.cyfmsRegister_Gender.value,
      maritalStatus: data.cyfmsRegister_MaritalStatus.value,
    };
    dispatch(doPostCYFMSRegister({ user: newUser }))
      .unwrap()
      .then(() => {
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
            <CYFMSValidationInput
              id="cyfmsRegister_FirstName"
              value="First Name"
              autofill={readData.firstname}
              required
            />
          </Box>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <CYFMSValidationInput
              id="cyfmsRegister_MiddleName"
              value="Middle Name"
              autofill={readData.middleName}
            />
          </Box>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <CYFMSValidationInput
              id="cyfmsRegister_LastName"
              value="Last Name"
              autofill={readData.surname}
              required
            />
          </Box>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <CYFMSDateInput
              id="cyfmsRegister_DateOfBirth"
              type="date"
              value="Date of Birth"
              autofill={readData.dateOfBirth}
              required
            />
          </Box>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <CYFMSDropdown
              autofill={readData.gender}
              id="cyfmsRegister_Gender"
              optionsList={Object.values(gender).map(
                (gender: any) => gender.en
              )}
              value="Gender"
              required
            />
          </Box>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <CYFMSDropdown
              autofill={readData.maritalStatus}
              id="cyfmsRegister_MaritalStatus"
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
