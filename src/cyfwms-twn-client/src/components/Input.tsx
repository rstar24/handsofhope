import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  FormControl,
  FormLabel,
  IconButton,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import React from "react";
import type {
  ElementType,
  ReactElement,
  ComponentPropsWithoutRef,
} from "react";

export interface InputProps extends ComponentPropsWithoutRef<ElementType> {
  /* Customizes width of label and input */
  formLabelFlex?: string;
  outlinedInputFlex?: string;
  /* Validation */
  validationTitle?: string;
  validationPattern?: string;
  /* Date */
  maxDate?: string;
  minDate?: string;
  /* Length */
  minChars?: number;
}

/**
 * The Input functional component.
 * @param props HTML attributes.
 * @returns Input component skeleton.
 */
const Input = (props: InputProps): ReactElement => {
  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  const handleClickShowPassword = () => {
    setShowPassword((showPassword) => {
      return !showPassword ? true : false;
    });
  };

  // type="password"
  const EndAdornment: ReactElement = (
    <InputAdornment position="end">
      <IconButton
        aria-label="toggle password visibility"
        onClick={handleClickShowPassword}
        edge="end"
      >
        {showPassword ? <Visibility /> : <VisibilityOff />}
      </IconButton>
    </InputAdornment>
  );

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
        sx={{ p: 1, flex: props.formLabelFlex || "1 1 0", color: "black" }}
      >
        {props.value}
      </FormLabel>
      <OutlinedInput
        defaultValue={props.autofill}
        endAdornment={props.type !== "password" ? undefined : EndAdornment}
        id={props.id}
        name={props.name}
        readOnly={props.readOnly}
        inputProps={{
          min: props.minDate,
          max: props.maxDate,
          minLength: props.minChars,
          title: props.validationTitle,
          pattern: props.validationPattern,
          sx: { p: 1 },
        }}
        type={
          props.type !== "password"
            ? props.type
            : showPassword
            ? "text"
            : "password"
        }
        sx={{
          backgroundColor: "#dfdada",
          borderRadius: 0,
          flex: props.outlinedInputFlex || "2 1 0",
        }}
      />
    </FormControl>
  );
};

export default Input;
