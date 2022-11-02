import {
  Checkbox as MuiCheckbox,
  FormControlLabel,
} from "@mui/material";
import React, { useState } from "react";
import type { FC } from "react";

/**
 * `Checkbox` is used on forms.
 * @param props
 * @returns `ReactElement`
 */
const Checkbox: FC<any> = (props) => {
  const [checked, setChecked] = useState<boolean>(props.checked);
  return (
    <FormControlLabel
      disabled={props.disabled}
      control={
        <MuiCheckbox
          required={props.required}
          checked={checked}
          id={props.id}
          onChange={() => setChecked(!checked)}
          value={props.value}
        />
      }
      label={props.label}
    />
  );
};

export default Checkbox;
