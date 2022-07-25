import {
  CYFSWMSNextButton,
  CYFSWMSSaveButton,
} from "../../components/CYFSWMSButtons";
import ICLayout from "../../components/initialContact/ICLayout";
import ICInput from "../../components/initialContact/ICInput";
import ICDropdown from "../../components/initialContact/ICDropdown";
import {
  doGetIcFD,
  doPostIcFD,
} from "../../features/initialContact/fileDetails/icFdSlice";
import { initiate } from "../../features/initiatorSlice";
import { unhideTabs } from "../../features/navBarSlice";
import { useAppDispatch, useAppSelector } from "../../library/hooks";
import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { icFdData } from "../../features/initialContact/fileDetails/icFdSlice";
import type { FormEvent, ReactElement } from "react";

/**
 * The ICFileDetails functional component.
 * @returns ICFileDetails component skeleton.
 */
const ICFileDetails = (): ReactElement => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const data = useAppSelector((state: any) => state.icFileDetails.data);
  const isInitiated = useAppSelector(
    (state: any) => state.initiator.isInitiated
  );

  useEffect(() => {
    dispatch(doGetIcFD(data.fileDetailsId))
      .unwrap()
      .then((fileDetailsDataFromAPI) => {
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
    const formData: icFdData = {
      fileDetailsId: data.fileDetailsId,
      fileNumber: form.fileDetails_FileNumber.value,
      clientName: form.fileDetails_ClientName.value,
      startingDate: form.fileDetails_StartingDate.value,
      caseworker: form.fileDetails_CaseWorker.value,
      status: form.fileDetails_Status.value,
      dateClosed: form.fileDetails_ClosingDate.value,
    };
    dispatch(doPostIcFD(formData))
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
      >
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <ICInput
              autofill={data.fileNumber}
              id="fileDetails_FileNumber"
              value="File No."
            />
          </Box>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <ICInput
              autofill={data.clientName}
              id="fileDetails_ClientName"
              value="Client Name"
            />
          </Box>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <ICInput
              autofill={data.startingDate}
              id="fileDetails_StartingDate"
              value="Date"
              type="date"
            />
          </Box>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <ICInput
              autofill={data.caseworker}
              id="fileDetails_CaseWorker"
              value="Case Worker"
            />
          </Box>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <ICDropdown
              autofill={data.status}
              id="fileDetails_Status"
              optionsList={["In Progress", "Closed"]}
              value="Status"
            />
          </Box>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <ICInput
              autofill={data.dateClosed}
              id="fileDetails_ClosingDate"
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

export default ICFileDetails;
