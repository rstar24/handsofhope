import { removeRecordNumber } from "../../../features/cyfms/householdMembers/slice";
import { useAppSelector, useAppDispatch } from "../../../library/hooks";
import Input from "../../Input";
import CYFMSDropdown from "../CYFMSDropdown";
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
 * to the `HouseholdMembersRecord` component.
 */
export interface HouseholdMembersRecordProps
  extends ComponentPropsWithoutRef<ElementType> {
  /** Holds data within a record. */
  record: any;
  /** Uniquely identifies a record. */
  recordNumber: number;
}

/**
 * The HouseholdMembersRecord functional component.
 * @param props Must contain the `recordNumber` prop.
 * @returns HouseholdMembersRecord component skeleton.
 */
export const HouseholdMembersRecord = (
  props: HouseholdMembersRecordProps
): ReactElement => {
  const dispatch = useAppDispatch();
  const gender = useAppSelector((state: any) => state.codetable.gender);

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
          <Input
            autofill={props.record.name}
            id={`record_${props.recordNumber}_Name`}
            validationPattern={`^[a-zA-Z ]*$`}
            validationTitle="Digits are not allowed!"
            value="Name"
          />
        </Box>
        <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
          <CYFMSDropdown
            autofill={props.record.gender}
            id={`record_${props.recordNumber}_Gender`}
            optionsList={Object.values(gender).map((gender: any) => gender.en)}
            value="Gender"
          />
        </Box>
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
        <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
          <Input
            autofill={props.record.dateOfBirth}
            id={`record_${props.recordNumber}_DateOfBirth`}
            maxDate={new Date().toISOString().substring(0, 10)}
            minDate="1900-01-01"
            value="Date of Birth"
            type="date"
          />
        </Box>
        <Box sx={{ flexBasis: 0, flexGrow: 1 }}></Box>
      </Box>
      <CYFMSTextArea
        formLabelFlex="1 1 0"
        outlinedInputFlex="5.05 1 0"
        autofill={props.record.residing}
        id={`record_${props.recordNumber}_Residing`}
        value="Residing"
      />
    </Box>
  );
};

const HouseholdMembersRecordList = (recordList: any): ReactElement[] => {
  let res: ReactElement[] = new Array(recordList.length);
  for (let index = 0; index < recordList.length; ++index) {
    res.push(
      <HouseholdMembersRecord
        record={recordList[index]}
        recordNumber={index + 1}
      />
    );
  }
  return res;
};

export default HouseholdMembersRecordList;
