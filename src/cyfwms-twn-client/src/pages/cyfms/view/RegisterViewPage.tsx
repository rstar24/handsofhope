import { useAppSelector } from "../../../library/hooks";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import type { FC } from "react";

const RegisterViewPage: FC = () => {
  const data = useAppSelector((state) => state.cyfmsRegister.data);

  return (
    <TableContainer
      sx={{ display: "flex", justifyContent: "center", p: "1rem" }}
    >
      <Table sx={{ maxWidth: 900 }}>
        <TableBody sx={{ "& > tr > td": { border: 0, p: 0 } }}>
          {data.firstname !== "" ? (
            <TableRow>
              <TableCell
                sx={{
                  display: "flex",
                  width: "50%",
                  alignContent: "start",
                  fontWeight: "bold",
                  fontSize: "1rem",
                }}
              >
                First Name
              </TableCell>
              <TableCell width="50%">
                <Typography component="p" sx={{ whiteSpace: "pre-wrap" }}>
                  {data.firstname}
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            <></>
          )}
          {data.middleName !== "" ? (
            <TableRow>
              <TableCell
                sx={{
                  display: "flex",
                  width: "50%",
                  alignContent: "start",
                  fontWeight: "bold",
                  fontSize: "1rem",
                }}
              >
                Middle Name
              </TableCell>
              <TableCell width="50%">
                <Typography component="p" sx={{ whiteSpace: "pre-wrap" }}>
                  {data.middleName}
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            <></>
          )}
          {data.surname !== "" ? (
            <TableRow>
              <TableCell
                sx={{
                  display: "flex",
                  width: "50%",
                  alignContent: "start",
                  fontWeight: "bold",
                  fontSize: "1rem",
                }}
              >
                Last Name
              </TableCell>
              <TableCell width="50%">
                <Typography component="p" sx={{ whiteSpace: "pre-wrap" }}>
                  {data.surname}
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            <></>
          )}
          {data.dateOfBirth !== "" ? (
            <TableRow>
              <TableCell
                sx={{
                  display: "flex",
                  width: "50%",
                  alignContent: "start",
                  fontWeight: "bold",
                  fontSize: "1rem",
                }}
              >
                Date of Birth
              </TableCell>
              <TableCell width="50%">
                <Typography component="p" sx={{ whiteSpace: "pre-wrap" }}>
                  {data.dateOfBirth}
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            <></>
          )}
          {data.gender !== "" ? (
            <TableRow>
              <TableCell
                sx={{
                  display: "flex",
                  width: "50%",
                  alignContent: "start",
                  fontWeight: "bold",
                  fontSize: "1rem",
                }}
              >
                Gender
              </TableCell>
              <TableCell width="50%">
                <Typography component="p" sx={{ whiteSpace: "pre-wrap" }}>
                  {data.gender}
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            <></>
          )}
          {data.maritalStatus !== "" ? (
            <TableRow>
              <TableCell
                sx={{
                  display: "flex",
                  width: "50%",
                  alignContent: "start",
                  fontWeight: "bold",
                  fontSize: "1rem",
                }}
              >
                Marital Status
              </TableCell>
              <TableCell width="50%">
                <Typography component="p" sx={{ whiteSpace: "pre-wrap" }}>
                  {data.maritalStatus}
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            <></>
          )}
          {data.referenceId !== 0 ? (
            <TableRow>
              <TableCell
                sx={{
                  display: "flex",
                  width: "50%",
                  alignContent: "start",
                  fontWeight: "bold",
                  fontSize: "1rem",
                }}
              >
                Reference ID
              </TableCell>
              <TableCell width="50%">
                <Typography component="p" sx={{ whiteSpace: "pre-wrap" }}>
                  {data.referenceId}
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            <></>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RegisterViewPage;
