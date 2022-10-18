import Input from "../../../components/Input";
import Popup from "../../../components/Popup";
import AuthLayout from "../../../components/auth/layout/AuthLayout";
import { Box, Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import type { FormEvent, ReactElement } from "react";
import { useAppDispatch, useAppSelector } from "../../../library/hooks";
import CYFMSDropdown from "../../../components/cyfms/CYFMSDropdown";
import { doGetCGStatus, doGetCGType } from "../../../features/codetable/slice";
import { doGet, Record } from "../../../features/cg/search/slice";
import Results from "../../../components/cg/search/Results";
import Router from "../../../components/nestedRouters/CG";
import Header from "../../../components/Header";

/**
 * The Search functional component.
 * @returns Search component skeleton.
 */
const Search = (): ReactElement => {
  const dispatch = useAppDispatch();
  const { cgStatus, cgType } = useAppSelector((state) => state.codetable);
  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    dispatch(doGetCGType());
    dispatch(doGetCGStatus());
  }, []);

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    const form: any = e.currentTarget;
    const formData: Record = {
      cgProviderId: null,
      referenceId: form.referenceId.value || null,
      name: form.name.value || null,
      type: form.type.value || null,
      priCaregiver: form.primary_cg.value || null,
      secCaregiver: form.secondary_cg.value || null,
      status: form.status.value || null,
    };
    dispatch(doGet(formData))
      .unwrap()
      .then(() => {
        console.log("CareGivers Search POST backend API was successful!");
        setIsShown(true);
      })
      .catch((err) => {
        console.log("CareGivers Search POST backend API didn't work!");
        console.log(err);
      });
  };
  const hide = () => {
    setIsShown(false);
  };
  return (
    <AuthLayout>
      <Header bannerTitle="Caregivers" />
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },

          justifyContent: "center",
          p: "1rem",
          gap: "1rem",
          "& div": { width: { xs: "100%", md: 350 } },
        }}
      >
        <Box sx={{ display: "flex" }}>
          <Button
            sx={{
              background: "lightgrey",
              color: "black",
              border: "1px solid black",
              maxWidth: 300,
              textTransform: "none",
              mx: "auto",
              mb: "auto",
            }}
          >
            Search for a Caregiver
          </Button>
        </Box>
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem 0",
          }}
          onSubmit={submitHandler}
        >
          <Input
            id="referenceId"
            validationPattern={`^[^a-zA-Z]*$`}
            validationTitle="Alphabets are not allowed!"
            value="Reference Id"
          />
          <Input
            id="name"
            minChars={2}
            validationPattern={`^[a-zA-Z ]*$`}
            validationTitle="Digits are not allowed!"
            value="Name"
          />

          <CYFMSDropdown
            id="type"
            autofill={""}
            optionsList={Object.values(cgType).map((status: any) => status.en)}
            value="Type"
          />
          <Input
            id="primary_cg"
            minChars={2}
            validationPattern={`^[a-zA-Z ]*$`}
            validationTitle="Digits are not allowed!"
            value="Primary Caregiver "
          />
          <Input
            id="secondary_cg"
            minChars={2}
            validationTitle="Digits are not allowed!"
            value="Secondary Caregiver"
          />
          <CYFMSDropdown
            id="status"
            autofill={""}
            optionsList={Object.values(cgStatus).map(
              (status: any) => status.en
            )}
            value="Status"
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            <Box sx={{ flex: "1.08 1 0" }}></Box>
            <Box
              sx={{
                flex: "2 1 0",
                display: "flex",
                justifyContent: "center",
                gap: "0 1rem",
              }}
            >
              <Button variant="contained" type="submit">
                Search
              </Button>
              <Button variant="contained" type="reset" onClick={hide}>
                Reset
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
      {isShown && <Results />}
      <Popup children={<Router />} />
    </AuthLayout>
  );
};

export default Search;
