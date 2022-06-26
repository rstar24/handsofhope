import {
  FormControl,
  FormLabel,
  OutlinedInput,
  InputBase,
} from "@mui/material";
import React from "react";
import type {
  ElementType,
  ReactElement,
  ComponentPropsWithoutRef,
} from "react";

/**
 * The CYFMSDropdown functional component.
 * @param props - HTML attributes.
 * @returns CYFMSDropdown component skeleton.
 */
const CYFMSDropdown = (
  props: ComponentPropsWithoutRef<ElementType>
): ReactElement => {
  return (
    <FormControl
      sx={{
        flexDirection: "row",
        flexWrap: "wrap",
        width: { xs: "100%", sm: "50%" },
      }}
    >
      <FormLabel htmlFor={props.id} sx={{ p: 1 }}>
        {props.value}
      </FormLabel>
      <select name="pets" id={props.id}>
        <option value="">Male</option>
        <option value="dog">Female</option>
        <option value="cat">LGBTQ</option>
      </select>
    </FormControl>
  );
};

export default CYFMSDropdown;
