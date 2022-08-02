import {
  CYFSWMSNextButton,
  CYFSWMSSaveButton,
} from "../../components/CYFSWMSButtons";
import ICLayout from "../../components/initialContact/ICLayout";
import ICInput from "../../components/initialContact/ICInput";
import ICDropdown from "../../components/initialContact/ICDropdown";
import {
  disableClosingDate,
  enableClosingDate,
  doGet,
  doPost,
} from "../../features/initialContact/fileDetails/slice";
import { initiate } from "../../features/initiatorSlice";
import { unhideTabs } from "../../features/navBarSlice";
import { useAppDispatch, useAppSelector } from "../../library/hooks";
import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { Data } from "../../features/initialContact/fileDetails/slice";
import type { FormEvent, ReactElement } from "react";
import Input from "../../components/Input";

/**
 * The FileDetails functional component.
 * @returns FileDetails component skeleton.
 */
const FileDetails = (): ReactElement => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { initialContactStatus } = useAppSelector(
    (state: any) => state.codetable
  );
  const isInitiated = useAppSelector(
    (state: any) => state.initiator.isInitiated
  );
  const state = useAppSelector((state) => state.icFileDetails);

  useEffect(() => {
    dispatch(doGet(state.data.fileDetailsId))
      .unwrap()
      .then((data) => {
        console.log("FileDetails GET backend API was successful!");
      })
      .catch((err) => {
        console.log("FileDetails GET backend API didn't work!");
        console.log(err);
      });
  }, []);

  // Handles the form data submission and other
  // activities.
  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    const form: any = e.currentTarget;
    const formData: Data = {
      fileDetailsId: state.data.fileDetailsId,
      fileNumber: form.fileNumber.value,
      clientName: form.clientName.value,
      startingDate: form.startingDate.value,
      caseworker: form.caseWorker.value,
      status: form.status.value,
      dateClosed: form.closingDate.value,
    };
    dispatch(doPost(formData))
      .unwrap()
      .then(() => {
        console.log("FileDetails POST backend API was successful!");
        dispatch(unhideTabs(null));
        dispatch(initiate(null));
      })
      .catch((err) => {
        console.log("FileDetails POST backend API didn't work!");
        console.log(err);
      });
  };

  // Handles the form data submi and other
  // activities.
  const changeHandler = (e: FormEvent) => {
    e.preventDefault();
    const form: any = e.currentTarget;
    console.log(form.closingDate.value);
    if (form.status.value === "Closed") {
      dispatch(enableClosingDate(null));
    } else {
      form.closingDate.value = "";
      dispatch(disableClosingDate(null));
    }
  };

  const nextClickHandler = () => {
    navigate("/initial_contact/referral_information");
  };

  return (
    <ICLayout>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem 0",
        }}
        onSubmit={submitHandler}
        onChange={changeHandler}
      >
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <ICInput
              autofill={state.data.fileNumber}
              id="fileNumber"
              value="File No."
            />
          </Box>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <ICInput
              autofill={state.data.clientName}
              id="clientName"
              value="Client Name"
            />
          </Box>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <ICInput
              autofill={state.data.startingDate}
              id="startingDate"
              value="Date"
              type="date"
            />
          </Box>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <ICInput
              autofill={state.data.caseworker}
              id="caseWorker"
              value="Case Worker"
            />
          </Box>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <ICDropdown
              autofill={state.data.status}
              id="status"
              optionsList={Object.values(initialContactStatus).map(
                (status: any) => status.en
              )}
              value="Status"
            />
          </Box>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <Input
              autofill={state.data.dateClosed}
              disabled={state.disabledClosingDate}
              id="closingDate"
              value="Date Closed"
              type="date"
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
    </ICLayout>
  );
};

export default FileDetails;
