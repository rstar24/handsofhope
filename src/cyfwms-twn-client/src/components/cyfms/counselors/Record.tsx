import { useAppDispatch, useAppSelector } from "../../../library/hooks";
import Input from "../../Input";
import CYFMSDropdown from "../../Dropdown";
import TextArea from "../../TextArea";
import { handleRemoveRecord } from "./record_";
import CancelIcon from "@mui/icons-material/Cancel";
import { Box, IconButton, Typography } from "@mui/material";
import React from "react";
import type { Record as RecordT } from "../../../features/cyfms/counselors/slice";
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
  const role = useAppSelector((state) => state.codetable.role);

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
          Counselor / CFS Worker: {props.number}
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
              props.record.counselorCFSWorkerId,
              props.number
            )
          }
        >
          <CancelIcon fontSize="medium" />
        </IconButton>
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
        <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
          <CYFMSDropdown
            autofill={props.record.role}
            id={`record_${props.number}_Role`}
            value="Role"
            optionsList={Object.values(role).map((role: any) => role.en)}
          />
        </Box>
        <Box sx={{ flexBasis: 0, flexGrow: 1 }}></Box>
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
        <Box sx={{ flexBasis: 0, flexGrow: 1 }}></Box>
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
        <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
          <Input
            autofill={props.record.startDate}
            id={`record_${props.number}_StartDate`}
            maxDate={new Date().toISOString().substring(0, 10)}
            minDate="1900-01-01"
            value="Start Date"
            type="date"
          />
        </Box>
        <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
          <Input
            autofill={props.record.endDate}
            id={`record_${props.number}_EndDate`}
            maxDate={new Date().toISOString().substring(0, 10)}
            minDate="1900-01-01"
            value="End Date"
            type="date"
          />
        </Box>
      </Box>
      <TextArea
        formLabelFlex="1 1 0"
        outlinedInputFlex="5.3 1 0"
        autofill={props.record.contactInformation}
        id={`record_${props.number}_ContactInformation`}
        value="Contact Information"
      />
    </Box>
  );
};

export default Record;
