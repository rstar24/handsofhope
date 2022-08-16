import { useAppSelector } from "../../../../library/hooks";
import { RegisterLabels } from "../../../../library/labels/cyfms";
import { styles } from "../../../../pages/cyfms/View";
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

const Register = (): ReactElement => {
  const data = useAppSelector((state) => state.cyfmsRegister.data);

  return (
    <TableContainer sx={{ p: "1rem" }}>
      <Table sx={{ minWidth: 650 }} aria-label="register data table">
        <TableBody sx={{ "& > tr > td": { border: 0, p: 0 } }}>
          {Object.entries(data).map((t: any, k: any) => {
            if (
              t[1] !== "" &&
              t[1] !== 0 &&
              RegisterLabels[k] !== "ParticipantId"
            ) {
              return (
                <TableRow key={Math.random() * 1000}>
                  <TableCell width="30%">
                    <Typography style={styles.keys}>
                      {RegisterLabels[k]}
                    </Typography>
                  </TableCell>
                  <TableCell width="70%">
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

export default Register;
