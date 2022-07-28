import { removeRecordNumber } from "../../../features/cyfms/familyPhysicians/slice";
import { useAppDispatch } from "../../../library/hooks";
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
  const dispatch = useAppDispatch();

  const removeRecord = () => {
    dispatch(removeRecordNumber(props.recordNumber));
  };

  return (
    <Box
      id="familyPhysiciansRecord"
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
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
        <Typography color="primary" sx={{ flexGrow: 1 }}>
          Family Physician: {props.recordNumber}
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
                id={`record_${props.recordNumber}_Name`}
                value="Name"
              />
            </Box>
            <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
              <CYFMSInput
                autofill={props.record.phone}
                id={`record_${props.recordNumber}_Phone`}
                value="Phone"
              />
            </Box>
          </Box>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
            <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
              <CYFMSInput
                autofill={props.record.cell}
                id={`record_${props.recordNumber}_Cell`}
                value="Cell"
              />
            </Box>
            <Box sx={{ flexBasis: 0, flexGrow: 1 }}></Box>
          </Box>
          <Box sx={{ flexBasis: 0, flexGrow: 2 }}>
            <CYFMSTextArea
              autofill={props.record.listOfMedication}
              id={`record_${props.recordNumber}_ListOfMedication`}
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
    res.push(
      <CYFMSFamilyPhysiciansRecord
        record={recordList[index]}
        recordNumber={index + 1}
      />
    );
  }
  return res;
};

export default CYFMSFamilyPhysiciansRecordList;
