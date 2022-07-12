import { FormControl, FormLabel, OutlinedInput } from "@mui/material";
import React from "react";
import type {
  ElementType,
  ReactElement,
  ComponentPropsWithoutRef,
} from "react";

/**
 * The ICFullInput functional component.
 * @param props - HTML attributes.
 * @returns ICFullInput component skeleton.
 */
const ICFullInput = (
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
        sx={{ p: 1, flexBasis: 0, flexGrow: 0.191, color: "black" }}
      >
        {props.value}
      </FormLabel>
      <OutlinedInput
        id={props.id}
        name={props.name}
        sx={{ borderRadius: 0, flexBasis: 0, flexGrow: 1, ml: -1 }}
        inputProps={{ sx: { p: 1 } }}
        type={props.type}
        defaultValue={props.autofill}
        style={{ backgroundColor: "#dfdada" }}
      />
    </FormControl>
  );
};

export default ICFullInput;
