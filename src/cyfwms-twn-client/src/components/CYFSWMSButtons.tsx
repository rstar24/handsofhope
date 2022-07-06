import AddIcon from "@mui/icons-material/Add";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import SaveIcon from "@mui/icons-material/Save";
import Button from "@mui/material/Button";
import React from "react";
import type {
  ComponentPropsWithoutRef,
  ElementType,
  ReactElement,
} from "react";

/**
 * The CYFSWMSAddButton functional component.
 * @returns CYFSWMSAddButton component skeleton.
 */
export const CYFSWMSAddButton = (
  props: ComponentPropsWithoutRef<ElementType>
): ReactElement => {
  return (
    <Button onClick={props.onClick} startIcon={<AddIcon />} variant="contained">
      Add More
    </Button>
  );
};

/**
 * The CYFSWMSNextButton functional component.
 * @returns CYFSWMSNextButton component skeleton.
 */
export const CYFSWMSNextButton = (): ReactElement => {
  return (
    <Button endIcon={<NavigateNextIcon />} type="submit" variant="contained">
      Next
    </Button>
  );
};

/**
 * The CYFSWMSSaveButton functional component.
 * @returns CYFSWMSSaveButton component skeleton.
 */
export const CYFSWMSSaveButton = (): ReactElement => {
  return (
    <Button startIcon={<SaveIcon />} type="submit" variant="contained">
      Save
    </Button>
  );
};
