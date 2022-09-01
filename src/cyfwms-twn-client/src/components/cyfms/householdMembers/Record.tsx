import { useAppDispatch, useAppSelector } from "../../../library/hooks";
import Input from "../../Input";
import CYFMSDropdown from "../CYFMSDropdown";
import CYFMSTextArea from "../CYFMSTextArea";
import { handleRemoveRecord } from "./record";
import CancelIcon from "@mui/icons-material/Cancel";
import { Box, IconButton, Typography } from "@mui/material";
import React from "react";
import type { Record as RecordT } from "../../../features/cyfms/householdMembers/slice";
import type { ReactElement } from "react";

/**
 * Record for counselor.
 * @example
 * ```jsx
 * <Record record={} number={} />
 * ```
 */
const Record = (props: AppRecordProps<RecordT>): ReactElement => {
  const dispatch = useAppDispatch();
  const gender = useAppSelector((state) => state.codetable.gender);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem 0",
        p: "0.5rem",
        borderRadius: "1rem",
        boxShadow: `inset 2px 2px 3px rgba(191, 191, 191, .6),
                    inset -2px -2px 3px rgba(0, 0, 0, .6)`,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0 1rem",
        }}
      >
        <Typography color="primary" sx={{ flexGrow: 1 }}>
          Household Member: {props.number}
        </Typography>
        <IconButton
          aria-label="delete record"
          size="medium"
          color="primary"
          sx={{ p: 0 }}
          onClick={(event) =>
            handleRemoveRecord(
              event,
              dispatch,
              props.record.householdMemberId,
              props.number
            )
          }
        >
          <CancelIcon fontSize="medium" />
        </IconButton>
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
        <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
          <Input
            autofill={props.record.name}
            id={`record_${props.number}_Name`}
            validationPattern={`^[a-zA-Z ]*$`}
            validationTitle="Digits are not allowed!"
            value="Name"
          />
        </Box>
        <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
          <CYFMSDropdown
            autofill={props.record.gender}
            id={`record_${props.number}_Gender`}
            optionsList={Object.values(gender).map((gender: any) => gender.en)}
            value="Gender"
          />
        </Box>
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
        <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
          <Input
            autofill={props.record.dateOfBirth}
            id={`record_${props.number}_DateOfBirth`}
            maxDate={new Date().toISOString().substring(0, 10)}
            minDate="1900-01-01"
            value="Date of Birth"
            type="date"
          />
        </Box>
        <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
          <Input
            autofill={props.record.relationship}
            id={`record_${props.number}_Relationship`}
            value="Relationship"
          />
        </Box>
      </Box>
      <CYFMSTextArea
        formLabelFlex="1 1 0"
        outlinedInputFlex="5.05 1 0"
        autofill={props.record.residing}
        id={`record_${props.number}_Residing`}
        value="Residing"
      />
    </Box>
  );
};

export default Record;
