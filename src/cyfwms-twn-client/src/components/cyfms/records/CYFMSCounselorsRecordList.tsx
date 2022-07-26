import { removeCounselorsRecordNumber } from "../../../features/cyfms/counselors/cyfmsCounselorsSlice";
import { useAppDispatch, useAppSelector } from "../../../library/hooks";
import CYFMSDropdown from "../CYFMSDropdown";
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
import CYFMSValidationInput from "../CYFMValidationInput";

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
  const dispatch = useAppDispatch();
  const role = useAppSelector((state: any) => state.codetable.role);

  const removeRecord = () => {
    dispatch(removeCounselorsRecordNumber(props.recordNumber));
  };

  return (
    <Box
      key={`counselors_record_${props.recordNumber}`}
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
          Counselor / CFS Worker: {props.recordNumber}
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
        <Box sx={{ flexBasis: 0, flexGrow: 1.08 }}>
          <CYFMSDropdown
            autofill={props.record.role}
            id={`counselors_record_${props.recordNumber}_Role`}
            value="Role"
            optionsList={Object.values(role).map((role: any) => role.en)}
          />
        </Box>
        <Box sx={{ flexBasis: 0, flexGrow: 1 }}></Box>
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
        <Box sx={{ flexBasis: 0, flexGrow: 1.3 }}>
          <CYFMSValidationInput
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
