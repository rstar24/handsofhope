import { useAppSelector } from "../../../library/hooks";
import {
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import { Link as L } from "react-router-dom";
import { FC } from "react";

const Reminders: FC = () => {
  const recordsList = useAppSelector((state) => state.cgReminder.record2);

  if (recordsList.length === 0) {
    if (true) {
      return <></>;
    }
  }

  return (
    <>
      {Object.entries(recordsList).map((t: any, index: number) => (
        <>
          <Typography sx={{ px: "1rem", fontWeight: "bold" }}>
            Record : {index + 1}
          </Typography>
          <TableContainer
            sx={{ display: "flex", justifyContent: "center", p: "1rem" }}
          >
            <Table sx={{ maxWidth: 900 }} aria-label="Participant">
              <TableBody
                sx={{ "& > tr > td": { border: 0, p: 0, paddingLeft: 5 } }}
              >
                {recordsList[index].assignedTo!== "" ? (
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
                     AssignTo
                    </TableCell>
                    <TableCell width="50%">
                      <Typography component="p" sx={{ whiteSpace: "pre-wrap" }}>
                        {recordsList[index].assignedTo}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  <></>
                )}
                {recordsList[index].description !== "" ? (
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
                      Description
                    </TableCell>
                    <TableCell width="50%">
                      <Typography component="p" sx={{ whiteSpace: "pre-wrap" }}>
                        {recordsList[index].description}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  <></>
                )}
                {recordsList[index].regarding !== "" ? (
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
                      Regarding
                    </TableCell>
                    <TableCell width="50%">
                      <Typography component="p" sx={{ whiteSpace: "pre-wrap" }}>
                        <Link component={L} to="/demo">
                          {recordsList[index].regarding}
                        </Link>
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  <></>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ))}
    </>
  );
};

export default Reminders;
