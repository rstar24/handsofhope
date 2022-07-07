import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { FormControl, FormLabel, OutlinedInput } from "@mui/material";
import React from "react";
import type {
  ElementType,
  ReactElement,
  ComponentPropsWithoutRef,
} from "react";

/**
 * The CYFMSPasswordInput functional component.
 * @param props - HTML attributes.
 * @returns CYFMSPasswordInput component skeleton.
 */
const CYFMSPasswordInput = (
  props: ComponentPropsWithoutRef<ElementType>
): ReactElement => {
  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  const handleClickShowPassword = () => {
    setShowPassword((showPassword) => {
      return !showPassword ? true : false;
    });
  };

  return (
    <FormControl
      required={props.required}
      sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
    >
      <FormLabel
        htmlFor={props.id}
        sx={{ p: 1, flexBasis: 0, flexGrow: 1.1, color: "black" }}
      >
        {props.value}
      </FormLabel>
      <OutlinedInput
        id={props.id}
        name={props.name}
        type={showPassword ? "text" : "password"}
        sx={{
          borderRadius: 0,
          flexBasis: 0,
          flexGrow: 1,
          backgroundColor: "#dfdada",
        }}
        inputProps={{ sx: { p: 1 } }}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              edge="end"
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
};

export default CYFMSPasswordInput;
