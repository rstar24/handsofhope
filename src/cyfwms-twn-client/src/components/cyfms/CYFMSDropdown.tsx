import { FormControl, FormLabel } from "@mui/material";
import React from "react";
import type {
  ElementType,
  ReactElement,
  ComponentPropsWithoutRef,
} from "react";
import { useAppSelector } from "../../library/hooks";

export interface CYFMSDropdownPropsType
  extends ComponentPropsWithoutRef<ElementType> {
  optionsList?: any[];
}

/**
 * The CYFMSDropdown functional component.
 * @param props - HTML attributes.
 * @returns CYFMSDropdown component skeleton.
 */
const CYFMSDropdown = (props: CYFMSDropdownPropsType): ReactElement => {
  const codetable = useAppSelector((state) => (state as any).codetable);
  console.log(codetable);
  return (
    <FormControl
      required={props.required}
      disabled={props.disabled}
      sx={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
      }}
    >
      <FormLabel
        htmlFor={props.id}
        sx={{ p: 1, flexBasis: 0, flexGrow: 1, color: "black" }}
      >
        {props.value}
      </FormLabel>
      {props.optionsList && (
        <select
          disabled={props.disabled}
          name={props.id}
          id={props.id}
          style={{
            display: "block",
            flexBasis: 0,
            flexGrow: 1,
            height: "40px",
            backgroundColor: "#dfdada",
          }}
        >
          {props.optionsList.map((item: any) => (
            <option>{item}</option>
          ))}
        </select>
      )}
      {props.id === "maritalStatus" && (
        <select
          name={props.id}
          id={props.id}
          style={{
            display: "block",
            height: "40px",
            backgroundColor: "#dfdada",
            width: "200px",
          }}
        >
          {Object.keys(codetable.maritalstatus).map((key: any, index) => {
            return <option>{key}</option>;
          })}
        </select>
      )}

      {props.id.includes("gender") && (
        <select
          name={props.id}
          id={props.id}
          style={{ height: "40px", backgroundColor: "#dfdada", width: "200px" }}
        >
          {Object.keys(codetable.gender).map((key: any, index) => {
            return <option>{key}</option>;
          })}
        </select>
      )}

      {props.id === "education1" && (
        <select
          name={props.id}
          id={props.id}
          style={{ height: "40px", backgroundColor: "#dfdada", width: "200px" }}
        >
          {Object.keys(codetable.education).map((key: any, index) => {
            return <option>{key}</option>;
          })}
        </select>
      )}
      {props.id === "education2" && (
        <select
          name={props.id}
          id={props.id}
          style={{ height: "40px", backgroundColor: "#dfdada", width: "200px" }}
        >
          {Object.keys(codetable.education).map((key: any, index) => {
            return <option>{key}</option>;
          })}
        </select>
      )}
      {props.id === "role" && (
        <select
          name={props.id}
          id={props.id}
          style={{ height: "40px", backgroundColor: "#dfdada", width: "200px" }}
        >
          {Object.keys(codetable.role).map((key: any, index) => {
            return <option>{key}</option>;
          })}
        </select>
      )}
      {props.id === "typeOfEmployee" && (
        <select
          name={props.id}
          id={props.id}
          style={{ height: "40px", backgroundColor: "#dfdada" }}
        >
          {Object.keys(codetable.typeOfEmployee).map((key: any, index) => {
            return <option>{key}</option>;
          })}
        </select>
      )}
    </FormControl>
  );
};

export default CYFMSDropdown;
