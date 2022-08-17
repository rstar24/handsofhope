import { useAppSelector } from "../../../library/hooks";
import { EducationAndEmploymentLabels } from "../../../library/labels/cyfms";
import { styles } from "../../../pages/cyfms/View";
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

const EducationAndEmployment = (): ReactElement => {
  const data = useAppSelector(
    (state) => state.cyfmsEducationAndEmployment.data
  );

  return (
    <TableContainer
      sx={{ display: "flex", justifyContent: "center", p: "1rem" }}
    >
      <Table
        sx={{ maxWidth: 900 }}
        aria-label="education and employment data table"
      >
        <TableBody sx={{ "& > tr > td": { border: 0, p: 0 } }}>
          {Object.entries(data).map((t: any, k: any) => {
            if (
              t[1] !== "" &&
              t[1] !== 0 &&
              EducationAndEmploymentLabels[k] !== "ParticipantId" &&
              EducationAndEmploymentLabels[k] !== "EmploymentId" &&
              EducationAndEmploymentLabels[k] !== "EducationId"
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
                    {EducationAndEmploymentLabels[k]}
                  </TableCell>
                  <TableCell width="50%">
                    <Typography style={styles.values}>{t[1]}</Typography>
                  </TableCell>
                </TableRow>
              );
            }
            return <></>;
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EducationAndEmployment;
