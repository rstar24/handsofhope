import CYFMSInput from "../CYFMSInput";
import { Box, Typography } from "@mui/material";
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
  return (
    <Box key={`criminalHistory_record_${props.recordNumber}`}>
      <Typography variant="body1" color="primary">
        Record {props.recordNumber}
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem 0" }}>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <CYFMSInput
              id={`criminalHistory_record_${props.recordNumber}_ArrestDate`}
              value="Arrest Date"
              type="date"
            />
          </Box>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <CYFMSInput
              sx={{ flexGrow: 1 }}
              id={`criminalHistory_record_${props.recordNumber}_Charges`}
              value="Charges"
            />
          </Box>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <CYFMSInput
              id={`criminalHistory_record_${props.recordNumber}_Conviction`}
              value="Conviction"
            />
          </Box>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <CYFMSInput
              id={`criminalHistory_record_${props.recordNumber}_Sentence`}
              value="Sentence"
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const CYFMSCriminalHistoryRecordList = (recordList: any): ReactElement[] => {
  let res: ReactElement[] = new Array(recordList.length);
  for (let index = 0; index < recordList.length; ++index) {
    res.unshift(
      <CYFMSCriminalHistoryRecord
        record={recordList[index]}
        recordNumber={index + 1}
      />
    );
  }
  return res;
};

export default CYFMSCriminalHistoryRecordList;
