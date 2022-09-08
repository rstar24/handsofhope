import {
  CYFSWMSNextButton,
  CYFSWMSSaveButton,
} from "../../components/CYFSWMSButtons";
import Input from "../../components/Input";
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
import { onKeyDown } from "../../library/app";
import { useAppDispatch, useAppSelector } from "../../library/hooks";
import { Box, FormControl, FormLabel, OutlinedInput } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Data } from "../../features/initialContact/fileDetails/slice";
import type { FormEvent, ReactElement } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { handleAddMore } from "../cyfms/familyPhysicians/familyPhysicians_";
import SearchClientName from "../../components/cyfms/searchClient/SearchClientName";
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
  const edit = useAppSelector((state) => state.popup.edit);
  const { clientName } = useAppSelector((state) => state.icFileDetails.data);
  const [click, setClick] = useState(false);
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
      fileNumber: state.data.fileDetailsId | 0,
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
        if (edit) {
          nextClickHandler();
        }
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
    navigate("../referral_information");
  };

  const handleSearch = () => {
    console.log("click search");
    setClick(true);
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
        onKeyDown={onKeyDown}
      >
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
              }}
            >
              <Box sx={{ p: 1, flexBasis: 0, flexGrow: 1, color: "black" }}>
                File No.
              </Box>
              <OutlinedInput
                size="small"
                readOnly={true}
                sx={{ borderRadius: 0, flexBasis: 0, flexGrow: 2, ml: -1 }}
                defaultValue={state.data.fileNumber}
                value={state.data.fileNumber}
                style={{ backgroundColor: "#dfdada" }}
              />
            </Box>
          </Box>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <FormControl
              sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
              }}
            >
              <FormLabel
                sx={{ p: 1, flexBasis: 0, flexGrow: 1, color: "black" }}
              >
                Client Name
              </FormLabel>
              <OutlinedInput
                sx={{
                  borderRadius: 0,
                  flexBasis: 0,
                  flexGrow: 2,
                }}
                size="small"
                value={clientName}
                style={{ backgroundColor: "#dfdada" }}
                endAdornment={<SearchIcon onClick={handleSearch} />}
              />
            </FormControl>
          </Box>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <ICInput
              autofill={state.data.startingDate}
              id="startingDate"
              value="Date"
              maxDate={new Date().toISOString().substring(0, 10)}
              minDate="1900-01-01"
              type="date"
              required
            />
          </Box>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <ICInput
              autofill={state.data.caseworker}
              id="caseWorker"
              value="Case Worker"
              required
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
              maxDate={new Date().toISOString().substring(0, 10)}
              minDate="1900-01-01"
              value="Date Closed"
              type="date"
            />
          </Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "right" }}>
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
      {click && <SearchClientName click={click} setClick={setClick} />}
    </ICLayout>
  );
};

export default FileDetails;
