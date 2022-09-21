import {
  CYFSWMSNextButton,
  CYFSWMSSaveButton,
} from "../../../components/CYFSWMSButtons";
import Input from "../../../components/Input";
import CYFMSDropdown from "../../../components/cyfms/CYFMSDropdown";
import CYFMSLayout from "../../../components/cyfms/CYFMSLayout";
import { onKeyDown } from "../../../library/app";
import { useAppDispatch, useAppSelector } from "../../../library/hooks";
import { handleEffect, handleSubmit } from "./register_";
import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { ChangeEventHandler, FormEvent, ReactElement } from "react";

/**
 * The Register functional component.
 * @returns Register component skeleton.
 */
const Register = (): ReactElement => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { gender, maritalstatus } = useAppSelector((state) => state.codetable);
  const isInitiated = useAppSelector((state) => state.initiator.isInitiated);
  const state = useAppSelector((state) => state.cyfmsRegister);
  const edit = useAppSelector((state) => state.popup.edit);

  const [fileName, setFileName] = useState<string>(
    state.data.participantImageName
  );

  useEffect(() => handleEffect(dispatch, state.data.participantId), []);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setFileName(e.currentTarget.value.replace(/^.*[\\/]/, ""));
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
        onSubmit={(event: FormEvent<HTMLFormElement>) =>
          handleSubmit(event, navigate, dispatch, state.data, edit, isInitiated)
        }
        onKeyDown={onKeyDown}
      >
        {state.data.referenceId !== 0 && (
          <Typography paddingLeft={1}>
            Reference ID : {state.data.referenceId}
          </Typography>
        )}
        <div>
          <div>
            <Input
              autofill={state.data.firstname}
              id="firstName"
              value="First Name"
              validationPattern={`^[a-zA-Z ]*$`}
              validationTitle="Digits are not allowed!"
              required
            />
          </div>
          <div>
            <Input
              autofill={state.data.middleName}
              id="middleName"
              value="Middle Name"
              validationPattern={`^[a-zA-Z ]*$`}
              validationTitle="Digits are not allowed!"
            />
          </div>
        </div>
        <div>
          <div>
            <Input
              autofill={state.data.surname}
              id="lastName"
              value="Last Name"
              validationPattern={`^[a-zA-Z ]*$`}
              validationTitle="Digits are not allowed!"
              required
            />
          </div>
          <div>
            <Input
              autofill={state.data.dateOfBirth}
              id="dateOfBirth"
              maxDate={new Date().toISOString().substring(0, 10)}
              minDate="1900-01-01"
              type="date"
              value="Date of Birth"
              required
            />
          </div>
        </div>
        <div>
          <div>
            <CYFMSDropdown
              autofill={state.data.gender}
              id="gender"
              optionsList={Object.values(gender).map(
                (gender: any) => gender.en
              )}
              value="Gender"
              required
            />
          </div>
          <div>
            <CYFMSDropdown
              autofill={state.data.maritalStatus}
              id="maritalStatus"
              optionsList={Object.values(maritalstatus).map(
                (status: any) => status.en
              )}
              value="Marital Status"
            />
          </div>
        </div>
        <div>
          <div>
            <Button
              variant="contained"
              component="label"
              sx={{ m: "0rem 1rem 0rem 0.5rem" }}
            >
              Upload
              <input
                accept="image/*"
                hidden
                name="imageFile"
                type="file"
                onChange={handleChange}
              />
            </Button>
            {fileName}
          </div>
          <div></div>
        </div>
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
