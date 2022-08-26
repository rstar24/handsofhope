import {
  CYFSWMSNextButton,
  CYFSWMSSaveButton,
} from "../../components/CYFSWMSButtons";
import Input from "../../components/Input";
import CYFMSDropdown from "../../components/cyfms/CYFMSDropdown";
import CYFMSLayout from "../../components/cyfms/CYFMSLayout";
import { doGet, doPost } from "../../features/cyfms/register/slice";
import { initiate } from "../../features/initiatorSlice";
import { unhideTabs } from "../../features/navBarSlice";
import { onKeyDown } from "../../library/app";
import { useAppDispatch, useAppSelector } from "../../library/hooks";
import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { Data } from "../../features/cyfms/register/slice";
import type { FormEvent, ReactElement } from "react";

/**
 * The Register functional component.
 * @returns Register component skeleton.
 */
const Register = (): ReactElement => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { gender, maritalstatus } = useAppSelector(
    (state) => (state as any).codetable
  );
  const isInitiated = useAppSelector((state) => state.initiator.isInitiated);
  const state = useAppSelector((state) => state.cyfmsRegister);
  const edit = useAppSelector((state) => state.popup.edit);

  useEffect(() => {
    dispatch(doGet(state.data.participantId))
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
      referenceId: state.data.referenceId,
      participantId: state.data.participantId,
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
        if (edit) {
          nextClickHandler();
        }
      })
      .catch((err) => {
        console.log("Unable to register.");
        console.log(err);
      });
  };

  const nextClickHandler = () => {
    navigate("../contact");
  };

  return (
    <CYFMSLayout>
      <Box
        component="form"
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "1rem 0",
          "> div": { display: "flex", gap: "0 1rem" },
          "> div > div": { flex: "1 1 0" },
        }}
        onSubmit={submitHandler}
        onKeyDown={onKeyDown}
      >
        {state.data.referenceId !== 0 && (
          <Typography paddingLeft={1}>
            Reference ID : {state.data.referenceId}
          </Typography>
        )}
        <Box>
          <Box>
            <Input
              autofill={state.data.firstname}
              id="firstName"
              value="First Name"
              validationPattern={`^[a-zA-Z ]*$`}
              validationTitle="Digits are not allowed!"
              required
            />
          </Box>
          <Box>
            <Input
              autofill={state.data.middleName}
              id="middleName"
              value="Middle Name"
              validationPattern={`^[a-zA-Z ]*$`}
              validationTitle="Digits are not allowed!"
            />
          </Box>
        </Box>
        <Box>
          <Box>
            <Input
              autofill={state.data.surname}
              id="lastName"
              value="Last Name"
              validationPattern={`^[a-zA-Z ]*$`}
              validationTitle="Digits are not allowed!"
              required
            />
          </Box>
          <Box>
            <Input
              autofill={state.data.dateOfBirth}
              id="dateOfBirth"
              maxDate={new Date().toISOString().substring(0, 10)}
              minDate="1900-01-01"
              type="date"
              value="Date of Birth"
              required
            />
          </Box>
        </Box>
        <Box>
          <Box>
            <CYFMSDropdown
              autofill={state.data.gender}
              id="gender"
              optionsList={Object.values(gender).map(
                (gender: any) => gender.en
              )}
              value="Gender"
              required
            />
          </Box>
          <Box>
            <CYFMSDropdown
              autofill={state.data.maritalStatus}
              id="maritalStatus"
              optionsList={Object.values(maritalstatus).map(
                (status: any) => status.en
              )}
              value="Marital Status"
            />
          </Box>
        </Box>
        <Box sx={{ justifyContent: "right" }}>
          {isInitiated ? (
            <>
              {edit ? (
                <>
                  <CYFSWMSSaveButton />
                </>
              ) : (
                <>
                  <CYFSWMSNextButton onClick={nextClickHandler} />
                </>
              )}
            </>
          ) : (
            <CYFSWMSSaveButton />
          )}
        </Box>
      </Box>
    </CYFMSLayout>
  );
};

export default Register;
