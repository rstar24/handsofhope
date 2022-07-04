import SaveIcon from "@mui/icons-material/Save";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import React from "react";
import { Link as RouterLink, NavLinkProps } from "react-router-dom";
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
export const CYFSWMSNextButton = (props: NavLinkProps): ReactElement => {
  return (
    <Button
      component={RouterLink}
      endIcon={<NavigateNextIcon />}
      to={props.to}
      type="submit"
      variant="contained"
    >
      Next
    </Button>
  );
};

/**
 * The CYFSWMSSaveButton functional component.
 * @returns CYFSWMSSaveButton component skeleton.
 */
export const CYFSWMSSaveButton = (
  props: ComponentPropsWithoutRef<ElementType>
): ReactElement => {
  return (
    <Button
      variant="contained"
      disabled={props.disabled}
      startIcon={<SaveIcon />}
      type="submit"
    >
      Save
    </Button>
  );
};
