import { FormControl, FormLabel } from "@mui/material";
import React from "react";
import type {
  ElementType,
  ReactElement,
  ComponentPropsWithoutRef,
} from "react";

export interface CPADropdownPropsType
  extends ComponentPropsWithoutRef<ElementType> {
  optionsList: any[];
}

/**
 * The CPADropdown functional component.
 * @param props - HTML attributes.
 * @returns CPADropdown component skeleton.
 */
const CPADropdownSearch = (props: CPADropdownPropsType): ReactElement => {
  return (
    <FormControl
      disabled={props.disabled}
      sx={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
      }}
      required={props.required}
    >
      <FormLabel
        htmlFor={props.id}
        sx={{ p: 1, flexBasis: 0, flexGrow: 1, color: "black" }}
      >
        {props.value}
      </FormLabel>
      <select
        disabled={props.disabled}
        name={props.id}
        id={props.id}
        defaultValue={props.autofill}
        style={{
          fontSize: 15,
          display: "block",
          flexBasis: 0,
          flexGrow: 2,
          height: "40px",
          backgroundColor: "#dfdada",
        }}
      >
        <option disabled></option>
        {props.optionsList.map((item: any) => (
          <option key={item}>{item}</option>
        ))}
      </select>
    </FormControl>
  );
};

export default CPADropdownSearch;
