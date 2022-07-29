import { removeRecordNumber } from "../../../features/cyfms/criminalHistory/slice";
import { useAppDispatch } from "../../../library/hooks";
import CYFMSInput from "../CYFMSInput";
import CYFMSTextArea from "../CYFMSTextArea";
import CancelIcon from "@mui/icons-material/Cancel";
import { Box, IconButton, Typography } from "@mui/material";
import React from "react";
import type {
  ComponentPropsWithoutRef,
  ElementType,
  ReactElement,
} from "react";

/**
 * A custom props data type for the props passed
 * to the `CYFMSCriminalHistoryRecord` component.
 */
export interface CYFMSCriminalHistoryRecordProps
  extends ComponentPropsWithoutRef<ElementType> {
  /** Holds data within a record. */
  record: any;
  /** Uniquely identifies a record. */
  recordNumber: number;
}

/**
 * The CYFMSCriminalHistoryRecord functional component.
 * @param props Must contain the `recordNumber` prop.
 * @returns CYFMSHouseholdMembersRecord component skeleton.
 */
export const CYFMSCriminalHistoryRecord = (
  props: CYFMSCriminalHistoryRecordProps
): ReactElement => {
  const dispatch = useAppDispatch();

  const removeRecord = () => {
    dispatch(removeRecordNumber(props.recordNumber));
  };

  return (
    <Box
      key={`record_${props.recordNumber}`}
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
            Record {props.recordNumber}
          </Typography>
          <IconButton
            aria-label="delete record"
            size="medium"
            color="primary"
            sx={{ p: 0 }}
            onClick={() => removeRecord()}
          >
            <CancelIcon fontSize="medium" />
          </IconButton>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <CYFMSInput
              autofill={props.record.arrestDate}
              id={`record_${props.recordNumber}_ArrestDate`}
              value="Arrest Date"
              type="date"
            />
          </Box>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}></Box>
        </Box>
        <CYFMSTextArea
          autofill={props.record.charges}
          id={`record_${props.recordNumber}_Charges`}
          value="Charges"
        />
        <CYFMSTextArea
          autofill={props.record.conviction}
          id={`record_${props.recordNumber}_Conviction`}
          value="Conviction"
        />
        <CYFMSTextArea
          autofill={props.record.sentence}
          id={`record_${props.recordNumber}_Sentence`}
          value="Sentence"
        />
      </Box>
    </Box>
  );
};

const CYFMSCriminalHistoryRecordList = (recordList: any): ReactElement[] => {
  let res: ReactElement[] = new Array(recordList.length);
  for (let index = 0; index < recordList.length; ++index) {
    res.push(
      <CYFMSCriminalHistoryRecord
        record={recordList[index]}
        recordNumber={index + 1}
      />
    );
  }
  return res;
};

export default CYFMSCriminalHistoryRecordList;
