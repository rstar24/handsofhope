import { CYFSWMSNextButton } from "../../../components/CYFSWMSButtons";
import ICDropdown from "../../../components/initialContact/ICDropdown";
import ICInput from "../../../components/initialContact/ICInput";
import ICTextArea from "../../../components/initialContact/ICTextArea";
import {
  Data,
  doPost,
  doSearch,
} from "../../../features/initialContact/contactNotes/slice";
import { onKeyDown } from "../../../library/app";

import { Box, Button, FormLabel, OutlinedInput } from "@mui/material";
import React, { useState } from "react";
import type { FormEvent } from "react";
import CPAInputForm from "../../../components/cpa/CPAInputForm";
import EditIcon from "../Participants/EditIcon";

const AttachmentForm = ({
  setAddNew,
  setDisabled,
  disabled,
  targetValue,
}: any) => {
  const [fileName, setFileName] = useState("");

  const myFile = fileName.replace(/^.*[\\\/]/, "");
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
            targetValue={targetValue}
          />
        </Box>
      )}
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
          <CPAInputForm
            id="nod"
            value="Name of the Document"
            readOnly={disabled}
          />
        </Box>
        <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
          <CPAInputForm id="type" value="Type" readOnly={disabled} />
        </Box>
      </Box>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
        <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
          <Box sx={{ display: "flex", alignitems: "left" }}>
            <Button variant="contained" component="label">
              <input
                type="file"
                id="uploadFileId"
                hidden
                onChange={(e) => {
                  setFileName(e.currentTarget.value);
                }}
              />
              Upload File
            </Button>
          </Box>
        </Box>

        <Box sx={{ flexBasis: 0, flexGrow: 1 }}></Box>
      </Box>
      <h6>{myFile}</h6>
      <Box sx={{ display: "flex", justifyContent: "right" }}>
        <CYFSWMSNextButton disabled={disabled} />
      </Box>
    </Box>
  );
};

export default AttachmentForm;
