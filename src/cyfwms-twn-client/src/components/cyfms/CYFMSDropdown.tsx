import { FormControl, FormLabel } from "@mui/material";
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
      <select name="gender" id={props.id}>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="LGBTQ">LGBTQ</option>
      </select>
    </FormControl>
  );
};

export default CYFMSDropdown;
