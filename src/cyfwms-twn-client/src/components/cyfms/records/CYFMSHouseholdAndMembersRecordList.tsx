import CYFMSDropdown from "../CYFMSDropdown";
import CYFMSInput from "../CYFMSInput";
import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import type {
  ComponentPropsWithoutRef,
  ElementType,
  ReactElement,
} from "react";

/**
 * A custom props data type for the props passed
 * to the `CYFMSHouseholdMembersRecord` component.
 */
export interface CYFMSHouseholdAndMembersRecordProps
  extends ComponentPropsWithoutRef<ElementType> {
  /** Uniquely identifies a record. */
  recordNumber: number;
}

/**
 * The CYFMSHouseholdMembersRecord functional component.
 * @param props Must contain the `recordNumber` prop.
 * @returns CYFMSHouseholdMembersRecord component skeleton.
 */
export const CYFMSHouseholdAndMembersRecord = (
  props: CYFMSHouseholdAndMembersRecordProps
): ReactElement => {
  return (
    <Box key={`householdAndMembers-record-${props.recordNumber}`}>
      <Typography variant="body1" color="primary">
        Member {props.recordNumber}
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem 0",
            flexGrow: 1,
          }}
        >
          <CYFMSInput
            id={`householdAndMembers-record-${props.recordNumber}-name`}
            value="Name"
          />
          <CYFMSInput
            id={`householdAndMembers-record-${props.recordNumber}-dateOfBirth`}
            value="Date of Birth"
            type="date"
          />
          <CYFMSInput
            id={`householdAndMembers-record-${props.recordNumber}-residing`}
            value="Residing"
          />
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <CYFMSDropdown
            id={`householdAndMembers-record-${props.recordNumber}-gender`}
            value="Gender"
          />
        </Box>
      </Box>
    </Box>
  );
};

const CYFMSHouseholdAndMembersRecordList = (
  recordList: any
): ReactElement[] => {
  let res: ReactElement[] = new Array(recordList.length);
  for (let index = 0; index < recordList.length; ++index) {
    res.push(<CYFMSHouseholdAndMembersRecord recordNumber={index + 1} />);
  }
  return res;
};

export default CYFMSHouseholdAndMembersRecordList;
