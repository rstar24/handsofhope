import { useAppSelector } from "../../../library/hooks";
import {
  InpatientLabels,
  OutpatientLabels,
} from "../../../library/labels/initialContact";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import type { ReactElement } from "react";

const PatientCareInformation = (): ReactElement => {
  const data = useAppSelector((state) => state.icPatientCareInformation.data);
  const labels =
    data.typeOfPatient === "Inpatient" ? InpatientLabels : OutpatientLabels;
  const data_ =
    data.typeOfPatient === "Inpatient" ? data.inpatient : data.outpatient;

  return (
    <>
      <Typography sx={{ px: "1rem", fontWeight: "bold" }}>
        {data.typeOfPatient}
      </Typography>
      <TableContainer
        sx={{ display: "flex", justifyContent: "center", p: "0.5rem" }}
      >
        <Table
          sx={{ maxWidth: 900 }}
          aria-label="patient care information record data table"
        >
          <TableBody sx={{ "& > tr > td": { border: 0, p: 0 } }}>
            {Object.entries(data_).map((t: any, k: any) => {
              if (
                t[1] !== "" &&
                t[1] !== 0 &&
                labels[k] !== "InpatientId" &&
                labels[k] !== "OutpatientId" &&
                labels[k] !== "PatientCareInfoId" &&
                labels[k] !== "Creation Date" &&
                labels[k] !== "Last Written"
              ) {
                return (
                  <TableRow key={Math.random() * 1000}>
                    <TableCell
                      sx={{
                        display: "flex",
                        width: "50%",
                        alignContent: "start",
                        fontWeight: "bold",
                        fontSize: "1rem",
                      }}
                    >
                      {labels[k]}
                    </TableCell>
                    <TableCell width="50%">
                      <Typography component="p" sx={{ whiteSpace: "pre-wrap" }}>
                        {t[1]}
                      </Typography>
                    </TableCell>
                  </TableRow>
                );
              }
              return <></>;
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default PatientCareInformation;
