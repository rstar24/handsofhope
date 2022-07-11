import CYFMSInput from "../CYFMSInput";
import CYFMSTextArea from "../CYFMSTextArea";
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
  /** Holds data within a record. */
  record: any;
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
    <Box key={`familyPhysicians_record_${props.recordNumber}`}>
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
                autofill={props.record.name}
                id={`familyPhysicians_record_${props.recordNumber}_Name`}
                value="Name"
              />
            </Box>
            <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
              <CYFMSInput
                autofill={props.record.phone}
                id={`familyPhysicians_record_${props.recordNumber}_Phone`}
                value="Phone"
              />
            </Box>
          </Box>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
            <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
              <CYFMSInput
                autofill={props.record.cell}
                id={`familyPhysicians_record_${props.recordNumber}_Cell`}
                value="Cell"
              />
            </Box>
            <Box sx={{ flexBasis: 0, flexGrow: 1 }}></Box>
          </Box>
          <Box sx={{ flexBasis: 0, flexGrow: 2 }}>
            <CYFMSTextArea
              autofill={props.record.listOfMedication}
              id={`familyPhysicians_record_${props.recordNumber}_ListOfMedication`}
              value="List of Medication"
            />
          </Box>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}></Box>
        </Box>
      </Box>
    </Box>
  );
};

const CYFMSFamilyPhysiciansRecordList = (recordList: any): ReactElement[] => {
  let res: ReactElement[] = new Array(recordList.length);
  for (let index = 0; index < recordList.length; ++index) {
    res.unshift(
      <CYFMSFamilyPhysiciansRecord
        record={recordList[index]}
        recordNumber={index + 1}
      />
    );
  }
  return res;
};

export default CYFMSFamilyPhysiciansRecordList;
