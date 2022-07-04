import { FormControl, FormLabel } from "@mui/material";
import React, { useState } from "react";
import type {
  ElementType,
  ReactElement,
  ComponentPropsWithoutRef,
} from "react";
import { useAppSelector } from "../../library/hooks";

/**
 * The CYFMSDropdown functional component.
 * @param props - HTML attributes.
 * @returns CYFMSDropdown component skeleton.
 */
const CYFMSDropdown = (
  props: ComponentPropsWithoutRef<ElementType>
): ReactElement => {
  const codetable = useAppSelector((state) => (state as any).codetable);
  return (
    <FormControl
      sx={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
      }}
    >
      <FormLabel htmlFor={props.id} sx={{ p: 1, flexGrow: 1, color: "black" }}>
        {props.value}
      </FormLabel>
      {props.id === "maritalStatus" && (
        <select
          name={props.id}
          id={props.id}
          style={{
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
      {props.id === "gender" && (
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
      {props.id === "education" && (
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
