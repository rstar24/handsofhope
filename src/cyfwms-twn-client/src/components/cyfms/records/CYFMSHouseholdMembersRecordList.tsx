import { removeHouseholdMembersRecordNumber } from "../../../features/cyfms/householdMembers/cyfmsHouseholdMembersSlice";
import { useAppSelector, useAppDispatch } from "../../../library/hooks";
import CYFMSDateInput from "../CYFMSDateInput";
import CYFMSDropdown from "../CYFMSDropdown";
import CYFMSInput from "../CYFMSInput";
import CancelIcon from "@mui/icons-material/Cancel";
import { Box, IconButton, Typography } from "@mui/material";
import React from "react";
import type {
  ComponentPropsWithoutRef,
  ElementType,
  ReactElement,
} from "react";
import CYFMSValidationInput from "../CYFMValidationInput";

/**
 * A custom props data type for the props passed
 * to the `CYFMSHouseholdMembersRecord` component.
 */
export interface CYFMSHouseholdMembersRecordProps
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
export const CYFMSHouseholdMembersRecord = (
  props: CYFMSHouseholdMembersRecordProps
): ReactElement => {
  const dispatch = useAppDispatch();
  const gender = useAppSelector((state: any) => state.codetable.gender);

  const removeRecord = () => {
    dispatch(removeHouseholdMembersRecordNumber(props.recordNumber));
  };

  return (
    <Box
      key={`householdMembers_record_${props.recordNumber}`}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem 0",
        p: "0.5rem",
        borderRadius: "1rem",
        boxShadow:
          "inset 2px 2px 3px rgba(191, 191, 191, .6), inset -2px -2px 3px rgba(0, 0, 0, .6)",
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
          Member {props.recordNumber}
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
          <CYFMSValidationInput
            autofill={props.record.name}
            id={`householdMembers_record_${props.recordNumber}_Name`}
            value="Name"
          />
        </Box>
        <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
          <CYFMSDropdown
            autofill={props.record.gender}
            id={`householdMembers_record_${props.recordNumber}_Gender`}
            optionsList={Object.values(gender).map((gender: any) => gender.en)}
            value="Gender"
          />
        </Box>
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
        <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
          <CYFMSDateInput
            autofill={props.record.dateOfBirth}
            id={`householdMembers_record_${props.recordNumber}_DateOfBirth`}
            value="Date of Birth"
            type="date"
          />
        </Box>
        <Box sx={{ flexBasis: 0, flexGrow: 1 }}></Box>
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
        <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
          <CYFMSInput
            autofill={props.record.residing}
            id={`householdMembers_record_${props.recordNumber}_Residing`}
            value="Residing"
          />
        </Box>
        <Box sx={{ flexBasis: 0, flexGrow: 1 }}></Box>
      </Box>
    </Box>
  );
};

const CYFMSHouseholdMembersRecordList = (recordList: any): ReactElement[] => {
  let res: ReactElement[] = new Array(recordList.length);
  for (let index = 0; index < recordList.length; ++index) {
    res.push(
      <CYFMSHouseholdMembersRecord
        record={recordList[index]}
        recordNumber={index + 1}
      />
    );
  }
  return res;
};

export default CYFMSHouseholdMembersRecordList;
