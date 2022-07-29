import { FormControl, FormLabel, OutlinedInput } from "@mui/material";
import React from "react";
import type {
  ElementType,
  ReactElement,
  ComponentPropsWithoutRef,
} from "react";

export interface CYFMSInputProps extends ComponentPropsWithoutRef<ElementType> {
  formLabelFlex?: string;
  outlinedInputFlex?: string;
}

/**
 * The CYFMSTextArea functional component.
 * @param props - HTML attributes.
 * @returns CYFMSTextArea component skeleton.
 */
const CYFMSTextArea = (props: CYFMSInputProps): ReactElement => {
  let formLabelFlex = props.formLabelFlex ? props.formLabelFlex : "1 1 0";
  let outlinedInputFlex = props.outlinedInputFlex
    ? props.outlinedInputFlex
    : "2 1 0";

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
        sx={{ p: 1, flex: formLabelFlex, color: "black" }}
      >
        {props.value}
      </FormLabel>
      <OutlinedInput
        id={props.id}
        maxRows={5}
        multiline={true}
        name={props.name}
        sx={{
          backgroundColor: "#dfdada",
          borderRadius: 0,
          flex: outlinedInputFlex,
        }}
        defaultValue={props.autofill}
      />
    </FormControl>
  );
};

export default CYFMSTextArea;
