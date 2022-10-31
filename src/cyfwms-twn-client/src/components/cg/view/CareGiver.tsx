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
import type { ReactElement } from "react";

const CareGiver = (): ReactElement => {
  const data = useAppSelector((state) => state.cgCaregivers.data);

  return (
    <TableContainer
      sx={{ display: "flex", justifyContent: "center", p: "1rem" }}
    >
      <Table sx={{ maxWidth: 900 }} aria-label="register data table">
        <TableBody sx={{ "& > tr > td": { border: 0, p: 0 } }}>
          {true ? (
            <TableRow sx={{ backgroundColor: "#dbdbdb" }}>
              <TableCell
                sx={{
                  display: "flex",
                  width: "50%",
                  alignContent: "start",
                  fontWeight: "bold",
                  fontSize: "1rem",
                }}
              >
                Primary Caregiver
              </TableCell>
              <TableCell width="50%">
                <Typography component="p" sx={{ whiteSpace: "pre-wrap" }}>
                  {" "}
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            <></>
          )}
          {data.priBGCheckStatus !== "" ? (
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
                Background Check Status
              </TableCell>
              <TableCell width="50%">
                <Typography component="p" sx={{ whiteSpace: "pre-wrap" }}>
                  {data.priBGCheckStatus}
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            <></>
          )}
          {(data.priDate !== "0001-01-01" && data.priDate !== "") ? (
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
                Date
              </TableCell>
              <TableCell width="50%">
                <Typography component="p" sx={{ whiteSpace: "pre-wrap" }}>
                  {data.priDate}
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            <></>
          )}
          {data.priDetails !== "" ? (
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
                Details
              </TableCell>
              <TableCell width="50%">
                <Typography component="p" sx={{ whiteSpace: "pre-wrap" }}>
                  {data.priDetails}
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            <></>
          )}
          {data.priTrainingCompleted!== "" ? (
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
                Training(s) Completed
              </TableCell>
              <TableCell width="50%">
                <Typography component="p" sx={{ whiteSpace: "pre-wrap" }}>
                  {data.priTrainingCompleted}
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            <></>
          )}
          {true ? (
            <TableRow sx={{ backgroundColor: "#dbdbdb" }}>
              <TableCell
                sx={{
                  display: "flex",
                  width: "50%",
                  alignContent: "start",
                  fontWeight: "bold",
                  fontSize: "1rem",
                }}
              >
                Secondary Caregiver
              </TableCell>
              <TableCell width="50%">
                <Typography component="p" sx={{ whiteSpace: "pre-wrap" }}>
                  {" "}
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            <></>
          )}
          {data.secBGCheckStatus !== "" ? (
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
                Background Check Status
              </TableCell>
              <TableCell width="50%">
                <Typography component="p" sx={{ whiteSpace: "pre-wrap" }}>
                  {data.secBGCheckStatus}
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            <></>
          )}
          {(data.secDate !== "0001-01-01" && data.secDate !== "") ? (
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
                Date
              </TableCell>
              <TableCell width="50%">
                <Typography component="p" sx={{ whiteSpace: "pre-wrap" }}>
                  {data.secDate}
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            <></>
          )}
          {data.secDetails !== "" ? (
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
                Details
              </TableCell>
              <TableCell width="50%">
                <Typography component="p" sx={{ whiteSpace: "pre-wrap" }}>
                  {data.secDetails}
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            <></>
          )}
          {data.secTrainingCompleted !== "" ? (
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
                Training(s) Completed
              </TableCell>
              <TableCell width="50%">
                <Typography component="p" sx={{ whiteSpace: "pre-wrap" }}>
                  {data.secTrainingCompleted}
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

export default CareGiver;
