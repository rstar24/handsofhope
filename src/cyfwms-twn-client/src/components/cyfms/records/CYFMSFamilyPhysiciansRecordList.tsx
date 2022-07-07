import CYFMSDropdown from "../CYFMSDropdown";
import CYFMSTextArea from "../CYFMSTextArea";
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
 * to the `CYFMSFamilyPhysiciansRecord` component.
 */
export interface CYFMSFamilyPhysiciansRecordProps
  extends ComponentPropsWithoutRef<ElementType> {
  /** Uniquely identifies a record. */
  recordNumber: number;
}

/**
 * The CYFMSFamilyPhysiciansRecord functional component.
 * @param props Must contain the `recordNumber` prop.
 * @returns CYFMSFamilyPhysiciansRecord component skeleton.
 */
export const CYFMSFamilyPhysiciansRecord = (
  props: CYFMSFamilyPhysiciansRecordProps
): ReactElement => {
  return (
    <Box key={`familyPhysicians-record-${props.recordNumber}`}>
      <Typography variant="body1" color="primary">
        Family Physician {props.recordNumber}
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
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
            <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
              <CYFMSInput
                id={`familyPhysicians_record_${props.recordNumber}_name`}
                value="Name"
              />
            </Box>
            <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
              <CYFMSInput
                id={`familyPhysicians_record_${props.recordNumber}_phone`}
                value="Date of Birth"
                type="date"
              />
            </Box>
          </Box>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
            <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
              <CYFMSInput
                id={`familyPhysicians_record_${props.recordNumber}_cell`}
                value="Residing"
              />
            </Box>
            <Box sx={{ flexBasis: 0, flexGrow: 1 }}></Box>
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <CYFMSTextArea
              id={`familyPhysicians_record_${props.recordNumber}_listOfMedication`}
              value="List of Medication"
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const CYFMSFamilyPhysiciansRecordList = (recordList: any): ReactElement[] => {
  let res: ReactElement[] = new Array(recordList.length);
  for (let index = 0; index < recordList.length; ++index) {
    res.push(<CYFMSFamilyPhysiciansRecord recordNumber={index + 1} />);
  }
  return res;
};

export default CYFMSFamilyPhysiciansRecordList;
