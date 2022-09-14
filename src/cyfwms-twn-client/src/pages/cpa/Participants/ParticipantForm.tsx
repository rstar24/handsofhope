import { CYFSWMSNextButton } from "../../../components/CYFSWMSButtons";
import ICDropdown from "../../../components/initialContact/ICDropdown";

import ICTextArea from "../../../components/initialContact/ICTextArea";

import { onKeyDown } from "../../../library/app";
import { useAppDispatch, useAppSelector } from "../../../library/hooks";
import EditIcon from "./EditIcon";
import { Box, FormControl, FormLabel, OutlinedInput } from "@mui/material";
import React, { useState } from "react";
import type { FormEvent } from "react";

import SearchIcon from "@mui/icons-material/Search";
import SearchClientName from "../../../components/cyfms/searchClient/SearchClientName";
import CPAInput from "../../../components/cpa/CPAInput";
import { Data } from "../../../features/cpa/participant/slice";
import { doPost } from "../../../features/cpa/participant/slice";
const ParticipantForm = ({ setAddNew, setDisabled, disabled }: any) => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.cpaParticipant.data);
  const { culturalProgramId } = useAppSelector((state) => state.cpa.data);
  const state = useAppSelector((state) => state.cpaParticipant);
  const { id } = useAppSelector((state) => state.cpaParticipant);
  const [click, setClick] = useState(false);
  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    if (!click) {
      const form = e.currentTarget as HTMLFormElement;
      const formData: Data = {
        participantCulturalProId: data.participantCulturalProId || 0,
        culturalProgramId: culturalProgramId,
        participant: id,
        role: form.role.value,
        notes: form.notes.value,
      };
      dispatch(doPost(formData))
        .unwrap()
        .then(() => {
          console.log("CPA Participant POST backend API was successful!");
          setAddNew(false);
        })
        .catch((err: any) => {
          console.log("CPA Participant POST backend API didn't work!");
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
            culturalProgramId={state.data.participantCulturalProId}
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
              value={state.clientName}
              style={{ backgroundColor: "#dfdada" }}
              endAdornment={<SearchIcon onClick={handleSearch} />}
            />
          </FormControl>
        </Box>
        <Box sx={{ flexBasis: 0, flexGrow: 1 }}></Box>
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
        <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
          <CPAInput
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
          moduleName="cpaParticipant"
        />
      )}
    </Box>
  );
};

export default ParticipantForm;
