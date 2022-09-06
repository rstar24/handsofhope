import { CYFSWMSNextButton } from "../../../components/CYFSWMSButtons";
import ICDropdown from "../../../components/initialContact/ICDropdown";

import ICTextArea from "../../../components/initialContact/ICTextArea";

import { onKeyDown } from "../../../library/app";
import { useAppDispatch, useAppSelector } from "../../../library/hooks";
import EditIcon from "./EditIcon";
import { Box, FormLabel, OutlinedInput } from "@mui/material";
import React from "react";
import type { FormEvent } from "react";

import SearchIcon from "@mui/icons-material/Search";

const ParticipantForm = ({
  setAddNew,
  setDisabled,
  disabled,
  targetValue,
}: any) => {
  const { contactMethod } = useAppSelector((state) => state.codetable);
  const data = useAppSelector((state) => state.icContactNotes.data);

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
  };
  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem 0",
      }}
      onSubmit={submitHandler}
      onKeyDown={onKeyDown}
    >
      {disabled && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <EditIcon
            setDisabled={setDisabled}
            setAddNew={setAddNew}
            contactId={data.contactNotesId}
            targetValue={targetValue}
          />
        </Box>
      )}
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
        <Box sx={{ flexBasis: 0, flexGrow: 1 }}></Box>
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        <Box
          sx={{ paddingLeft: "8px", flexBasis: 0, flexGrow: 1, gap: "0 1rem" }}
        >
          <FormLabel sx={{ flexBasis: 0, flexGrow: 2, color: "black" }}>
            Participant
          </FormLabel>{" "}
        </Box>
        <Box sx={{ paddingLeft: "3px", flexBasis: 0, flexGrow: 4 }}>
          <OutlinedInput
            id="search"
            value=""
            placeholder="search..."
            size="small"
            sx={{
              borderRadius: 0,
              flexBasis: 0,
              flexGrow: 4,
              ml: -1,
              backgroundColor: "#dfdada",
            }}
            type="text"
            endAdornment={<SearchIcon />}
          />
        </Box>

        <Box sx={{ flexBasis: 0, flexGrow: 1 }}></Box>
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
        <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
          <ICDropdown
            id="role"
            value="Role"
            autofill={data.contactMethod}
            disabled={disabled}
            optionsList={Object.values(contactMethod).map(
              (status: any) => status.en
            )}
          />
        </Box>
        <Box sx={{ flexBasis: 0, flexGrow: 1 }}></Box>
      </Box>

      <ICTextArea
        id="notes"
        value="Notes"
        autofill={data.summary}
        readOnly={disabled}
      />
      <Box sx={{ display: "flex", justifyContent: "right" }}>
        <CYFSWMSNextButton disabled={disabled} />
      </Box>
    </Box>
  );
};

export default ParticipantForm;
