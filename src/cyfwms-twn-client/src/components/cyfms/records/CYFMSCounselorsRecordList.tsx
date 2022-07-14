import CYFMSDropdown from "../CYFMSDropdown";
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
 * to the `CYFMSCounselorsRecord` component.
 */
export interface CYFMSCounselorsRecordProps
  extends ComponentPropsWithoutRef<ElementType> {
  /** Holds data within a record. */
  record: any;
  /** Uniquely identifies a record. */
  recordNumber: number;
}

/**
 * The CYFMSCounselorsRecord functional component.
 * @param props Must contain the `recordNumber` prop.
 * @returns CYFMSCounselorsRecord component skeleton.
 */
export const CYFMSCYFMSCounselorsRecord = (
  props: CYFMSCounselorsRecordProps
): ReactElement => {
  return (
    <Box key={`counselors_record_${props.recordNumber}`}>
      <Typography variant="body1" color="primary">
        Counselor / CFS Worker: {props.recordNumber}
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem 0" }}>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
          <Box sx={{ flexBasis: 0, flexGrow: 1.08 }}>
            <CYFMSDropdown
              autofill={props.record.role}
              id={`counselors_record_${props.recordNumber}_Role`}
              value="Role"
              optionsList={["Counselor", "CFS Worker"]}
            />
          </Box>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}></Box>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
          <Box sx={{ flexBasis: 0, flexGrow: 1.3 }}>
            <CYFMSInput
              autofill={props.record.name}
              id={`counselors_record_${props.recordNumber}_Name`}
              value="Name"
            />
          </Box>
          <Box sx={{ flexBasis: 0, flexGrow: 1.22 }}></Box>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
          <Box sx={{ flexBasis: 0, flexGrow: 2.7 }}>
            <CYFMSTextArea
              autofill={props.record.contactInformation}
              id={`counselors_record_${props.recordNumber}_ContactInformation`}
              value="Contact Information"
            />
          </Box>
          <Box sx={{ flexBasis: 0, flexGrow: 1.22 }}></Box>
        </Box>
      </Box>
    </Box>
  );
};

const CYFMSCounselorsRecordList = (recordList: any): ReactElement[] => {
  let res: ReactElement[] = new Array(recordList.length);
  for (let index = 0; index < recordList.length; ++index) {
    res.push(
      <CYFMSCYFMSCounselorsRecord
        record={recordList[index]}
        recordNumber={index + 1}
      />
    );
  }
  return res;
};

export default CYFMSCounselorsRecordList;
