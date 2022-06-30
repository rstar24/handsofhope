import { FormControl, FormLabel, OutlinedInput } from "@mui/material";
import React from "react";
import type {
  ElementType,
  ReactElement,
  ComponentPropsWithoutRef,
} from "react";

/**
 * The CYFMSInput functional component.
 * @param props - HTML attributes.
 * @returns CYFMSInput component skeleton.
 */
const CYFMSInput = (
  props: ComponentPropsWithoutRef<ElementType>
): ReactElement => {
  return (
    <FormControl
      sx={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
      }}
      required={props.required}
    >
      <FormLabel htmlFor={props.id} sx={{ p: 1, flexGrow: 1 }}>
        {props.value}
      </FormLabel>
      <OutlinedInput
        id={props.id}
        name={props.name}
        sx={{ borderRadius: 0, flexGrow: 1 }}
        inputProps={{ sx: { p: 1 } }}
        type={props.type}
        defaultValue={props.autofill}
      />
    </FormControl>
  );
};

export default CYFMSInput;
