import { CYFSWMSNextButton } from "../../../components/CYFSWMSButtons";
import ICTextArea from "../../../components/initialContact/ICTextArea";

import { onKeyDown } from "../../../library/app";
import { useAppDispatch, useAppSelector } from "../../../library/hooks";
import EditIcon from "./EditIcon";
import { Box, FormControl, FormLabel, OutlinedInput } from "@mui/material";
import React, { useState } from "react";
import type { FormEvent } from "react";

import SearchIcon from "@mui/icons-material/Search";
import SearchClientName from "../../../components/cyfms/searchClient/SearchClientName";
import { Data } from "../../../features/initialContact/participant/slice";
import { doPost } from "../../../features/initialContact/participant/slice";
import ICInput from "../../../components/initialContact/ICInput";
const ParticipantForm = ({ setAddNew, setDisabled, disabled }: any) => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.icParticipants.getData);
  const { fileDetailsId } = useAppSelector((state) => state.icFileDetails.getData);
  const state = useAppSelector((state) => state.icParticipants);
  const { id } = useAppSelector((state) => state.icParticipants);
  const [click, setClick] = useState(false);
  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    if (!click) {
      const form = e.currentTarget as HTMLFormElement;
      const formData: Data = {
        icParticipantId: data.icParticipantId || 0,
        fileDetailsId: fileDetailsId,
        participant: id,
        role: form.role.value,
        notes: form.notes.value,
      };
      dispatch(doPost(formData))
        .unwrap()
        .then(() => {
          console.log("Initial Contact Participant POST backend API was successful!");
          setAddNew(false);
        })
        .catch((err: any) => {
          console.log("Initial Contact Participant POST backend API didn't work!");
          console.log(err);
        });
    }
  };
  const handleSearch = () => {
    if (!disabled) {
      setClick(true);
    }
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
      //onKeyDown={onKeyDown}
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
            icParticipantId={state.data.icParticipantId}
          />
        </Box>
      )}
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
        <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
          <FormControl
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            <FormLabel sx={{ p: 1, flexBasis: 0, flexGrow: 1, color: "black" }}>
              Participant
            </FormLabel>
            <OutlinedInput
              sx={{
                borderRadius: 0,
                flexBasis: 0,
                flexGrow: 2,
              }}
              size="small"
              readOnly={disabled}
              value={data.participant}
              style={{ backgroundColor: "#dfdada" }}
              endAdornment={<SearchIcon onClick={handleSearch} />}
            />
          </FormControl>
        </Box>
        <Box sx={{ flexBasis: 0, flexGrow: 1 }}></Box>
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
        <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
          <ICInput
            autofill={data.role}
            id="role"
            value="Role"
            type="text"
            readOnly={disabled}
          />
        </Box>
        <Box sx={{ flexBasis: 0, flexGrow: 1 }}></Box>
      </Box>

      <ICTextArea
        id="notes"
        value="Notes"
        autofill={data.notes}
        readOnly={disabled}
      />
      <Box sx={{ display: "flex", justifyContent: "right" }}>
        <CYFSWMSNextButton disabled={disabled} />
      </Box>
      {click && (
        <SearchClientName
          click={click}
          setClick={setClick}
          moduleName="initialContact"
          searchId="icParticipant"
        />
      )}
    </Box>
  );
};

export default ParticipantForm;
