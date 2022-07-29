import { FormControl, FormLabel, OutlinedInput } from "@mui/material";
import React from "react";
import type { CYFMSInputProps } from "./CYFMSInput";
import type { ReactElement } from "react";

/**
 * The CYFMSInput functional component.
 * @param props - HTML attributes.
 * @returns CYFMSInput component skeleton.
 */
const CYFMSInput = (props: CYFMSInputProps): ReactElement => {
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
        name={props.name}
        type="date"
        sx={{ borderRadius: 0, flex: outlinedInputFlex }}
        inputProps={{
          max: new Date().toISOString().split("T")[0],
          min: "1900-01-01",
          sx: { p: 1 },
        }}
        defaultValue={props.autofill}
        style={{ backgroundColor: "#dfdada" }}
      />
    </FormControl>
  );
};

export default CYFMSInput;
