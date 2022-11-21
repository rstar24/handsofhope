import { Box, FormControl, FormLabel, OutlinedInput } from "@mui/material";
import React from "react";
import type { ElementType, FC, ComponentPropsWithoutRef } from "react";

export interface TextAreaProps extends ComponentPropsWithoutRef<ElementType> {
  formLabelFlex?: string;
  outlinedInputFlex?: string;
}

/**
 * `TextArea` is the textarea field.
 * @param props - HTML attributes.
 */
const TextArea: FC<TextAreaProps> = (props) => {
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
      <Box
        sx={{
          flex: outlinedInputFlex,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <OutlinedInput
          defaultValue={props.autofill}
          id={props.id}
          maxRows={5}
          minRows={2}
          multiline={true}
          name={props.name}
          readOnly={props.readOnly}
          sx={{
            marginY: "auto",
            backgroundColor: "#dfdada",
            borderRadius: 0,
            p: 1,
          }}
        />
      </Box>
    </FormControl>
  );
};

export default TextArea;
