import { FormControl, FormLabel, OutlinedInput } from "@mui/material";
import React from "react";
import type {
  ElementType,
  ReactElement,
  ComponentPropsWithoutRef,
} from "react";

/**
 * The ICTextArea functional component.
 * @param props - HTML attributes.
 * @returns ICTextArea component skeleton.
 */
const ICTextAreaMax = (
  props: ComponentPropsWithoutRef<ElementType>
): ReactElement => {
  return (
    <FormControl
      disabled={props.disabled}
      required={props.required}
      sx={{
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
      }}
    >
      <FormLabel
        htmlFor={props.id}
        sx={{ paddingLeft: 0, flexBasis: 0, flexGrow: 1, color: "black" }}
      >
        {props.value}
      </FormLabel>
      <OutlinedInput
        id={props.id}
        name={props.name}
        sx={{
          backgroundColor: "#dfdada",
          borderRadius: 0,
          flexBasis: 0,
          flexGrow: 0,
        }}
        defaultValue={props.autofill}
      />
    </FormControl>
  );
};

export default ICTextAreaMax;
