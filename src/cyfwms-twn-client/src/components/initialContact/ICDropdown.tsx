import { FormControl, FormLabel } from "@mui/material";
import React from "react";
import type {
  ElementType,
  ReactElement,
  ComponentPropsWithoutRef,
} from "react";

export interface ICDropdownPropsType
  extends ComponentPropsWithoutRef<ElementType> {
  optionsList: any[];
}

/**
 * The ICDropdown functional component.
 * @param props - HTML attributes.
 * @returns ICDropdown component skeleton.
 */
const ICDropdown = (props: ICDropdownPropsType): ReactElement => {
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
        sx={{ p: 1, flexBasis: 0, flexGrow: 0.47, color: "black" }}
      >
        {props.value}
      </FormLabel>
      <select
        disabled={props.disabled}
        name={props.id}
        id={props.id}
        defaultValue={props.autofill}
        style={{
          display: "block",
          flexBasis: 0,
          flexGrow: 1,
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

export default ICDropdown;
