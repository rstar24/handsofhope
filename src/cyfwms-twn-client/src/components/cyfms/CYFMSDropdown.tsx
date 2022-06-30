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
  console.log("codetable=", codetable);
  return (
    <FormControl
      sx={{
        flexDirection: "row",
        flexWrap: "wrap",
        width: { xs: "100%", sm: "50%" },
      }}
    >
      <FormLabel htmlFor={props.id} sx={{ p: 1 }}>
        {props.value}
      </FormLabel>
      {props.id === "maritalStatus" && (
        <select name={props.id} id={props.id}>
          {Object.keys(codetable.maritalstatus).map((key: any, index) => {
            return <option>{key}</option>;
          })}
        </select>
      )}
      {props.id === "gender" && (
        <select name={props.id} id={props.id}>
          {Object.keys(codetable.gender).map((key: any, index) => {
            return <option>{key}</option>;
          })}
        </select>
      )}
      {props.id === "education" && (
        <select name={props.id} id={props.id}>
          {Object.keys(codetable.education).map((key: any, index) => {
            return <option>{key}</option>;
          })}
        </select>
      )}
      {props.id === "role" && (
        <select name={props.id} id={props.id}>
          {Object.keys(codetable.role).map((key: any, index) => {
            return <option>{key}</option>;
          })}
        </select>
      )}
      {props.id === "typeOfEmployee" && (
        <select name={props.id} id={props.id}>
          {Object.keys(codetable.typeOfEmployee).map((key: any, index) => {
            return <option>{key}</option>;
          })}
        </select>
      )}
    </FormControl>
  );
};

export default CYFMSDropdown;
