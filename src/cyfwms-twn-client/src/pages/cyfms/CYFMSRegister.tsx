import {
  CYFSWMSNextButton,
  CYFSWMSSaveButton,
} from "../../components/CYFSWMSButtons";
import { doPostCYFMSRegister } from "../../features/cyfms/register/cyfmsRegisterSlice";
import { useAppDispatch, useAppSelector } from "../../library/hooks";
import CYFMSDropdown from "../../components/cyfms/CYFMSDropdown";
import CYFMSInput from "../../components/cyfms/CYFMSInput";
import CYFMSLayout from "../../components/cyfms/CYFMSLayout";
import { Box } from "@mui/material";
import React, { useContext, useState } from "react";
import type { FormEvent, ReactElement } from "react";
import { CYFMSSideNavContext } from "../../components/cyfms/CYFMSSideNav";
import { useNavigate } from "react-router-dom";

/**
 * The CYFMSRegister functional component.
 * @returns CYFMSRegister component skeleton.
 */
const CYFMSRegister = (): ReactElement => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userData = useAppSelector((state) => (state as any).cyfmsRegister.user);
  const readData = useAppSelector(
    (state) => (state as any).cyfmsRegister.readUser
  );
  const { setHideTabs } = useContext(CYFMSSideNavContext);
  const [isRegistered, setIsRegistered] = useState<boolean>(false);

  // Handles the form data submission and other
  // activities.
  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    const data: any = e.currentTarget;
    const newUser = {
      participantId: userData.participantId,
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
        setHideTabs(false);
        setIsRegistered(true);
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
              id="cyfmsRegister_FirstName"
              value="First Name"
              autofill={readData.firstname}
              required
            />
          </Box>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <CYFMSInput
              id="cyfmsRegister_MiddleName"
              value="Middle Name"
              autofill={readData.middleName}
            />
          </Box>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <CYFMSInput
              id="cyfmsRegister_LastName"
              value="Last Name"
              autofill={readData.surname}
              required
            />
          </Box>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <CYFMSInput
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
              optionsList={["Male", "Female", "LGBTQ"]}
              value="Gender"
              required
            />
          </Box>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <CYFMSDropdown
              autofill={readData.maritalStatus}
              id="cyfmsRegister_MaritalStatus"
              optionsList={["Single", "Married", "Divorced"]}
              value="Marital Status"
            />
          </Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "right" }}>
          {isRegistered ? (
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
