import { Box, FormControl, FormLabel } from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";
import type { ElementType, FC, ComponentPropsWithoutRef } from "react";

export interface DropdownProps extends ComponentPropsWithoutRef<ElementType> {
  formLabelFlex?: string;
  outlinedInputFlex?: string;
  optionsList: any[];
}

/**
 * `Dropdown is the select field.`
 * @param props - HTML attributes.
 */
const Dropdown: FC<DropdownProps> = (props) => {
  let formLabelFlex = props.formLabelFlex ? props.formLabelFlex : "1 1 0";
  let selectFlex = props.outlinedInputFlex ? props.outlinedInputFlex : "2 1 0";
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
      <Box
        sx={{
          flex: selectFlex,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <select
          disabled={props.disabled}
          name={props.id}
          id={props.id}
          defaultValue={props.autofill}
          style={{
            margin: "auto 0",
            fontSize: 15,
            height: "39px",
            backgroundColor: "#dfdada",
            borderColor: grey[400],
          }}
        >
          <option disabled></option>
          {props.optionsList.map((item: any) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </Box>
    </FormControl>
  );
};

export default Dropdown;
