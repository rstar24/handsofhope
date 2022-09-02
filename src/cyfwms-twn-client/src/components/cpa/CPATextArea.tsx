import { FormControl, FormLabel, OutlinedInput } from "@mui/material";
import React from "react";
import type {
  ElementType,
  ReactElement,
  ComponentPropsWithoutRef,
} from "react";

/**
 * The CPATextArea functional component.
 * @param props - HTML attributes.
 * @returns CPATextArea component skeleton.
 */
const CPATextArea = (
  props: ComponentPropsWithoutRef<ElementType>
): ReactElement => {
  return (
    <FormControl
      disabled={props.disabled}
      required={props.required}
      sx={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
      }}
    >
      <FormLabel
        htmlFor={props.id}
        sx={{ p: 1, flexBasis: 0, flexGrow: 1, color: "black" }}
      >
        {props.value}
      </FormLabel>
      <OutlinedInput
        id={props.id}
        rows={props.row_no}
        multiline={true}
        name={props.name}
        readOnly={props.readOnly}
        sx={{
          backgroundColor: "#dfdada",
          borderRadius: 0,
          flexBasis: 0,
          flexGrow: 5.3,
        }}
        defaultValue={props.autofill}
      />
    </FormControl>
  );
};

export default CPATextArea;
