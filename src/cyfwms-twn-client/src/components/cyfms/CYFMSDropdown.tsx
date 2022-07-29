import { FormControl, FormLabel } from "@mui/material";
import React from "react";
import type {
  ElementType,
  ReactElement,
  ComponentPropsWithoutRef,
} from "react";

export interface CYFMSDropdownPropsType
  extends ComponentPropsWithoutRef<ElementType> {
  optionsList: any[];
}

/**
 * The CYFMSDropdown functional component.
 * @param props - HTML attributes.
 * @returns CYFMSDropdown component skeleton.
 */
const CYFMSDropdown = (props: CYFMSDropdownPropsType): ReactElement => {
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
        {props.optionsList.map((item: any) => (
          <option key={item}>{item}</option>
        ))}
      </select>
    </FormControl>
  );
};

export default CYFMSDropdown;
