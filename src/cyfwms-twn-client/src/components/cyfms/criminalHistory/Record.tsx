import { useAppDispatch } from "../../../library/hooks";
import Input from "../../Input";
import TextArea from "../../TextArea";
import { handleRemoveRecord } from "./record_";
import CancelIcon from "@mui/icons-material/Cancel";
import { Box, IconButton, Typography } from "@mui/material";
import React from "react";
import type { Record as RecordT } from "../../../features/cyfms/criminalHistory/slice";
import type { ReactElement } from "react";

/**
 * Record for criminal history.
 * @example
 * ```jsx
 * <Record record={} number={} />
 * ```
 */
const Record = (props: AppRecordProps<RecordT>): ReactElement => {
  const dispatch = useAppDispatch();

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
      <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem 0" }}>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
          <Typography color="primary" sx={{ flexGrow: 1 }}>
            Record {props.number}
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
                props.record.criminalHistoryRecordId,
                props.number
              )
            }
          >
            <CancelIcon fontSize="medium" />
          </IconButton>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
          <Box sx={{ flexBasis: "0", flexGrow: 1 }}>
            <Input
              autofill={props.record.arrestDate}
              id={`record_${props.number}_ArrestDate`}
              maxDate={new Date().toISOString().substring(0, 10)}
              minDate="1900-01-01"
              value="Arrest Date"
              type="date"
            />
          </Box>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}></Box>
        </Box>
        <TextArea
          formLabelFlex="1 1 0"
          outlinedInputFlex="5.3 1 0"
          autofill={props.record.charges}
          id={`record_${props.number}_Charges`}
          value="Charges"
        />
        <TextArea
          formLabelFlex="1 1 0"
          outlinedInputFlex="5.3 1 0"
          autofill={props.record.conviction}
          id={`record_${props.number}_Conviction`}
          value="Conviction"
        />
        <TextArea
          formLabelFlex="1 1 0"
          outlinedInputFlex="5.3 1 0"
          autofill={props.record.sentence}
          id={`record_${props.number}_Sentence`}
          value="Sentence"
        />
      </Box>
    </Box>
  );
};

export default Record;
