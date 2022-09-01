import { useAppDispatch } from "../../../library/hooks";
import Input from "../../Input";
import CYFMSTextArea from "../CYFMSTextArea";
import { handleRemoveRecord } from "./record";
import CancelIcon from "@mui/icons-material/Cancel";
import { Box, IconButton, Typography } from "@mui/material";
import React from "react";
import type { Record as RecordT } from "../../../features/cyfms/familyPhysicians/slice";
import type { ReactElement } from "react";

/**
 * Record for family physician.
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
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
        <Typography color="primary" sx={{ flexGrow: 1 }}>
          Family Physician: {props.number}
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
              props.record.familyPhysicianId,
              props.number
            )
          }
        >
          <CancelIcon fontSize="medium" />
        </IconButton>
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem 0",
            flexGrow: 1,
          }}
        >
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
              <Input
                autofill={props.record.phone}
                id={`record_${props.number}_Phone`}
                validationPattern={`^[^a-zA-Z]*$`}
                validationTitle="Alphabets are not allowed!"
                value="Phone"
              />
            </Box>
          </Box>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
            <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
              <Input
                autofill={props.record.cell}
                id={`record_${props.number}_Cell`}
                validationPattern={`^[^a-zA-Z]*$`}
                validationTitle="Alphabets are not allowed!"
                value="Cell"
              />
            </Box>
            <Box sx={{ flexBasis: 0, flexGrow: 1 }}></Box>
          </Box>
          <Box sx={{ flexBasis: 0, flexGrow: 2 }}>
            <CYFMSTextArea
              formLabelFlex="1 1 0"
              outlinedInputFlex="5.05 1 0"
              autofill={props.record.listOfMedication}
              id={`record_${props.number}_ListOfMedication`}
              value="List of Medication"
            />
          </Box>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}></Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Record;
