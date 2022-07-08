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
export interface CYFMSCYFMSCounselorsRecordProps
  extends ComponentPropsWithoutRef<ElementType> {
  /** Uniquely identifies a record. */
  recordNumber: number;
}

/**
 * The CYFMSCounselorsRecord functional component.
 * @param props Must contain the `recordNumber` prop.
 * @returns CYFMSCounselorsRecord component skeleton.
 */
export const CYFMSCYFMSCounselorsRecord = (
  props: CYFMSCYFMSCounselorsRecordProps
): ReactElement => {
  return (
    <Box key={`cyfmsCounselors_record_${props.recordNumber}`}>
      <Typography variant="body1" color="primary">
        Counselor / CFS Worker: {props.recordNumber}
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem 0" }}>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
          <Box sx={{ flexBasis: 0, flexGrow: 1.08 }}>
            <CYFMSDropdown
              id={`cyfmsCounselors_record_${props.recordNumber}_Role`}
              value="Role"
              optionsList={["Counselor", "CFS Worker"]}
            />
          </Box>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}></Box>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
          <Box sx={{ flexBasis: 0, flexGrow: 1.3 }}>
            <CYFMSInput
              id={`cyfmsCounselors_record_${props.recordNumber}_Name`}
              value="Name"
            />
          </Box>
          <Box sx={{ flexBasis: 0, flexGrow: 1.22 }}></Box>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
          <Box sx={{ flexBasis: 0, flexGrow: 2.5 }}>
            <CYFMSTextArea
              id={`cyfmsCounselors_record_${props.recordNumber}_ContactInformation`}
              value="Contact Information"
            />
          </Box>
          <Box sx={{ flexBasis: 0, flexGrow: 1.22 }}></Box>
        </Box>
      </Box>
    </Box>
  );
};

const CYFMSCYFMSCounselorsRecordList = (recordList: any): ReactElement[] => {
  let res: ReactElement[] = new Array(recordList.length);
  for (let index = 0; index < recordList.length; ++index) {
    res.push(<CYFMSCYFMSCounselorsRecord recordNumber={index + 1} />);
  }
  return res;
};

export default CYFMSCYFMSCounselorsRecordList;
