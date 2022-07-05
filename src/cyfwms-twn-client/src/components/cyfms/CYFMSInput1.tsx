import { FormControl, FormLabel, OutlinedInput } from "@mui/material";
import React from "react";
import type {
  ElementType,
  ReactElement,
  ComponentPropsWithoutRef,
} from "react";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

interface State {
  amount: string;
  password: string;
  weight: string;
  weightRange: string;
  showPassword: boolean;
}
/**
 * The CYFMSInput functional component.
 * @param props - HTML attributes.
 * @returns CYFMSInput component skeleton.
 */
const CYFMSInput = (
  props: ComponentPropsWithoutRef<ElementType>
): ReactElement => {
  const [values, setValues] = React.useState<State>({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });

  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <FormControl
      sx={{
        flexDirection: "row",
        flexWrap: "wrap",
      }}
      required={props.required}
    >
      <FormLabel htmlFor={props.id} sx={{ p: 1, color: "black" }}>
        {props.value}
      </FormLabel>
      <OutlinedInput
        id={props.id}
        name={props.name}
        type={values.showPassword ? "text" : "password"}
        value={values.password}
        sx={{ borderRadius: 0, width: "12.5rem", backgroundColor: "#e8f0fe" }}
        inputProps={{ sx: { p: 1 } }}
        onChange={handleChange("password")}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {values.showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
};

export default CYFMSInput;
