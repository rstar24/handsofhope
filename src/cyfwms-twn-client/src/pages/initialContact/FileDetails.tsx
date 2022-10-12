import {
  CYFSWMSNextButton,
  CYFSWMSSaveButton,
} from "../../components/CYFSWMSButtons";
import Input from "../../components/Input";
import CYFMSDropdown from "../../components/cyfms/CYFMSDropdown";
import SearchClientName from "../../components/cyfms/searchClient/SearchClientName";
import ICLayout from "../../components/initialContact/ICLayout";
import {
  disableClosingDate,
  enableClosingDate,
  doGet,
  doPost,
} from "../../features/initialContact/fileDetails/slice";
import { initiate } from "../../features/initiatorSlice";
import { unhideTabs } from "../../features/navBarSlice";
import { useAppDispatch, useAppSelector } from "../../library/hooks";
import { onKeyDown } from "../../library/app";
import SearchIcon from "@mui/icons-material/Search";
import { Box, FormControl, FormLabel, OutlinedInput } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Data } from "../../features/initialContact/fileDetails/slice";
import type { FormEvent, FC } from "react";

/**
 * `IC` aka `Initial Contact` module.
 * Sub page: `File Details`.
 * @returns `ReactElement`
 */
const FileDetails: FC = () => {
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
  const [click, setClick] = useState(false);

  useEffect(() => {
    dispatch(doGet(state.getData.fileDetailsId))
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
      fileDetailsId: state.getData.fileDetailsId,
      fileNumber: state.getData.fileNumber || 0,
      clientName: state.getData.participantId,
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
          "> div": { display: "flex", gap: "0 1rem" },
          "> div > div": { flex: "1 1 0" },
        }}
        onSubmit={submitHandler}
        onChange={changeHandler}
        onKeyDown={onKeyDown}
      >
        <div>
          <div>
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
                sx={{ borderRadius: 0, flexBasis: 0, flexGrow: 2 }}
                defaultValue={state.data.fileNumber}
                value={state.getData.fileNumber}
                style={{ backgroundColor: "#dfdada" }}
              />
            </Box>
          </div>
          <div>
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
                  flexGrow: 1.9,
                }}
                size="small"
                value={state.getData.clientName}
                style={{ backgroundColor: "#dfdada" }}
                endAdornment={<SearchIcon onClick={handleSearch} />}
              />
            </FormControl>
          </div>
        </div>
        <div>
          <div>
            <Input
              autofill={state.getData.startingDate}
              id="startingDate"
              value="Date"
              maxDate={new Date().toISOString().substring(0, 10)}
              minDate="1900-01-01"
              type="date"
              required
            />
          </div>
          <div>
            <Input
              autofill={state.getData.caseworker}
              id="caseWorker"
              value="Case Worker"
              required
            />
          </div>
        </div>
        <div>
          <div>
            <CYFMSDropdown
              autofill={state.getData.status}
              id="status"
              optionsList={Object.values(initialContactStatus).map(
                (status: any) => status.en
              )}
              value="Status"
            />
          </div>
          <div>
            <Input
              autofill={state.getData.dateClosed}
              disabled={state.disabledClosingDate}
              id="closingDate"
              maxDate={new Date().toISOString().substring(0, 10)}
              minDate="1900-01-01"
              value="Date Closed"
              type="date"
            />
          </div>
        </div>
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
      {click && (
        <SearchClientName
          click={click}
          setClick={setClick}
          moduleName="initialContact"
        />
      )}
    </ICLayout>
  );
};

export default FileDetails;
