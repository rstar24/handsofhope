import { useAppSelector } from "../../../library/hooks";
import {
  CriminalHistoryLabels,
  CriminalHistoryRecordLabels,
} from "../../../library/labels/cyfms";
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

const CriminalHistory = (): ReactElement => {
  const data = useAppSelector((state) => state.cyfmsCriminalHistory.data);

  if (data.criminalHistoryRecordList.length > 0) {
    if (
      data.criminalHistoryRecordList[0].charges === "" &&
      data.criminalHistoryRecordList[0].conviction === "" &&
      data.criminalHistoryRecordList[0].arrestDate !== "0001-01-01" &&
      data.criminalHistoryRecordList[0].sentence === ""
    ) {
      return <></>;
    }
  }

  return (
    <>
      {Object.entries(data.criminalHistoryRecordList).map(
        (t: any, index: number) => (
          <>
            {
              <Typography sx={{ px: "1rem", fontWeight: "bold" }}>
                Record: {index + 1}
              </Typography>
            }

            <TableContainer
              sx={{ display: "flex", justifyContent: "center", p: "0.5rem" }}
            >
              <Table
                sx={{ maxWidth: 900 }}
                aria-label="criminal history record data table"
              >
                <TableBody sx={{ "& > tr > td": { border: 0, p: 0 } }}>
                  {Object.entries(data.criminalHistoryRecordList[index]).map(
                    (t: any, k: any) => {
                      if (
                        t[1] !== "" &&
                        t[1] !== null &&
                        t[1] !== 0 &&
                        CriminalHistoryRecordLabels[k] !== "Status" &&
                        CriminalHistoryRecordLabels[k] !== "Creation Date" &&
                        CriminalHistoryRecordLabels[k] !== "Last Written" &&
                        CriminalHistoryRecordLabels[k] !==
                          "CriminalHistoryId" &&
                        CriminalHistoryRecordLabels[k] !==
                          "CriminalHistoryRecordId"
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
                              {CriminalHistoryRecordLabels[k]}
                            </TableCell>
                            <TableCell width="50%">
                              <Typography
                                component="p"
                                sx={{ whiteSpace: "pre-wrap" }}
                              >
                                {t[1]}
                              </Typography>
                            </TableCell>
                          </TableRow>
                        );
                      }
                      return <></>;
                    }
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )
      )}
      <TableContainer
        sx={{ display: "flex", justifyContent: "center", p: "1rem" }}
      >
        <Table sx={{ maxWidth: 900 }} aria-label="criminal history data table">
          <TableBody sx={{ "& > tr > td": { border: 0, p: 0 } }}>
            {Object.entries(data).map((t: any, k: any) => {
              if (
                t[1] !== "" &&
                t[1] !== 0 &&
                t[1] !== false &&
                CriminalHistoryLabels[k] !== "ParticipantId" &&
                CriminalHistoryLabels[k] !== "CriminalHistoryId" &&
                CriminalHistoryLabels[k] !== "CriminalHistoryRecordList"
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
                      {CriminalHistoryLabels[k]}
                    </TableCell>
                    <TableCell width="50%">
                      <Typography component="p" sx={{ whiteSpace: "pre-wrap" }}>
                        {(typeof t[1]).toString() === "boolean"
                          ? t[1]
                            ? "Yes"
                            : "No"
                          : t[1]}
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

export default CriminalHistory;
