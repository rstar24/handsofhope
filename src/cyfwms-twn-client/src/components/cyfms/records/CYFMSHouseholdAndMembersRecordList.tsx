import CYFMSDropdown from "../CYFMSDropdown";
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
 * to the `CYFMSHouseholdMembersRecord` component.
 */
export interface CYFMSHouseholdAndMembersRecordProps
  extends ComponentPropsWithoutRef<ElementType> {
  /** Holds data within a record. */
  record: any;
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
    <Box key={`householdAndMembers_record_${props.recordNumber}`}>
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
            autofill={props.record.name}
            id={`householdAndMembers_record_${props.recordNumber}_Name`}
            value="Name"
          />
          <CYFMSInput
            autofill={props.record.date}
            id={`householdAndMembers_record_${props.recordNumber}_DateOfBirth`}
            value="Date of Birth"
            type="date"
          />
          <CYFMSInput
            autofill={props.record.residing}
            id={`householdAndMembers_record_${props.recordNumber}_Residing`}
            value="Residing"
          />
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <CYFMSDropdown
            autofill={props.record.gender}
            id={`householdAndMembers_record_${props.recordNumber}_Gender`}
            optionsList={["Male", "Female", "LGBTQ"]}
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
    res.unshift(
      <CYFMSHouseholdAndMembersRecord
        record={recordList[index]}
        recordNumber={index + 1}
      />
    );
  }
  return res;
};

export default CYFMSHouseholdAndMembersRecordList;
