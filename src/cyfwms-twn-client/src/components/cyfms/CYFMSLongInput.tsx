import { FormControl, FormLabel, Grid, OutlinedInput } from "@mui/material";
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
const CYFMSLongInput = (
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
      <Grid container sm={12} spacing={2}>
        <Grid item sm={3}>
          <FormLabel htmlFor={props.id} sx={{ p: 1, color: "black" }}>
            {props.value}
          </FormLabel>
        </Grid>
        <Grid item sm={9}>
          <OutlinedInput
            fullWidth
            id={props.id}
            name={props.name}
            sx={{ borderRadius: 0 }}
            inputProps={{ sx: { p: 1 } }}
            type={props.type}
            defaultValue={props.autofill}
            multiline={props.multiline}
            style={{ backgroundColor: "#dfdada" }}
          />
        </Grid>
      </Grid>
    </FormControl>
  );
};

export default CYFMSLongInput;
