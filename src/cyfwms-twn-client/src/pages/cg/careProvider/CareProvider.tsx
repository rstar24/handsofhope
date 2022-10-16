import { CYFSWMSSaveButton } from "../../../components/CYFSWMSButtons";
import Input from "../../../components/Input";
import CYFMSDropdown from "../../../components/cyfms/CYFMSDropdown";
import CgLayout from "../../../components/cg/CgLayout";
import { onKeyDown } from "../../../library/app";
import { useAppDispatch, useAppSelector } from "../../../library/hooks";
import { handleEffect, handleSubmit } from "./careProvider_";
import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { FC, FormEvent } from "react";

/**
 * `CG` aka `Caregivers` module.
 * Sub page: `Care Provider`.
 * @returns `ReactElement`
 */
const CareProvider: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { gender, maritalstatus } = useAppSelector((state) => state.codetable);
  const state = useAppSelector((state) => state.cgCareProvider);
  const edit = useAppSelector((state) => state.popup.edit);

  useEffect(() => handleEffect(dispatch, state.data.id), []);

  return (
    <CgLayout>
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
          handleSubmit(event, navigate, dispatch, state.data, edit)
        }
        onKeyDown={onKeyDown}
      >
        {state.data.referenceId! >= 0 ? (
          <Typography paddingLeft={1}>
            Reference ID : {state.data.referenceId}
          </Typography>
        ) : (
          <></>
        )}
        <div>
          <div>
            <Input autofill={state.data.name} id="naam" value="Name" />
          </div>
          <div>
            <CYFMSDropdown
              autofill={state.data.status}
              id="status"
              optionsList={Object.values(gender).map(
                (gender: any) => gender.en
              )}
              value="Status"
            />
          </div>
        </div>
        <div>
          <div>
            <CYFMSDropdown
              autofill={state.data.type}
              id="type"
              optionsList={Object.values(maritalstatus).map(
                (status: any) => status.en
              )}
              value="Type"
            />
          </div>
          <div>
            <Input
              autofill={state.data.otherType}
              id="otherType"
              value="Please specify"
              disabled
            />
          </div>
        </div>
        <div>
          <div>
            <Input autofill={state.data.address} id="address" value="Address" />
          </div>
          <div>
            <Input autofill={state.data.city} id="city" value="City" />
          </div>
        </div>
        <div>
          <div>
            <Input
              autofill={state.data.postalCode}
              id="postalCode"
              value="Postal Code"
            />
          </div>
          <div>
            <Input
              autofill={state.data.province}
              id="province"
              value="Province"
            />
          </div>
        </div>
        <div>
          <div>
            <Input
              autofill={state.data.phoneNumber}
              id="phoneNumber"
              value="Phone Number"
            />
          </div>
          <div>
            <Input
              autofill={state.data.email}
              type="email"
              id="eMail"
              value="Email"
            />
          </div>
        </div>
        <div>
          <div>
            <Input
              autofill={state.data.primaryCaregiver}
              id="primaryCaregiver"
              value="Primary Caregiver"
            />
          </div>
          <div>
            <Input
              autofill={state.data.secondaryCaregiver}
              id="secondaryCaregiver"
              value="Secondary Caregiver"
            />
          </div>
        </div>
        <Box sx={{ justifyContent: "right" }}>
          <CYFSWMSSaveButton />
        </Box>
      </Box>
    </CgLayout>
  );
};

export default CareProvider;
