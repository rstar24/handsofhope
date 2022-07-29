import React, {
  ComponentPropsWithoutRef,
  ElementType,
  ReactElement,
} from "react";
import { Theme, useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { FormLabel } from "@mui/material";
import { Box } from "@mui/system";

export interface ICDropdownPropsType
  extends ComponentPropsWithoutRef<ElementType> {
  optionsList: any[];
}

function getStyles(name: string, personName: string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const ICMultiSelectDropdown = (props: ICDropdownPropsType): ReactElement => {
  const theme = useTheme();
  const [alcoholName, setAlcoholName] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof alcoholName>) => {
    const {
      target: { value },
    } = event;
    setAlcoholName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <div>
      <Box sx={{ p: 1, display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
        <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
          <FormLabel htmlFor={props.id} sx={{ color: "black" }}>
            {props.value}
          </FormLabel>
        </Box>
        <Box sx={{ flexBasis: 0, flexGrow: 2 }}>
          <FormControl
            sx={{
              m: 1,
              width: 300,
              mt: 3,
              paddingLeft: 4.5,
            }}
          >
            <Select
              id={props.id}
              name={props.id}
              defaultValue={props.autofill}
              multiple
              displayEmpty
              value={alcoholName}
              onChange={handleChange}
              input={<OutlinedInput />}
              renderValue={(selected) => {
                return selected.join(", ");
              }}
              sx={{
                height: "40px",
                backgroundColor: "#dfdada",
                borderRadius: 0,
              }}
            >
              {props.optionsList.map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                  style={getStyles(name, alcoholName, theme)}
                >
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>
    </div>
  );
};
export default ICMultiSelectDropdown;
