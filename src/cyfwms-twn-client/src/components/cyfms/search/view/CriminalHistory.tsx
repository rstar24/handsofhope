import { useAppSelector } from "../../../../library/hooks";
import {
  CriminalHistoryLabels,
  CriminalHistoryRecordLabels,
} from "../../../../library/labels/cyfms";
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

const CriminalHistory = (): ReactElement => {
  const data = useAppSelector((state) => state.cyfmsCriminalHistory.data);

  return (
    <>
      {Object.entries(data.criminalHistoryRecordList).map(
        (t: any, index: number) => (
          <>
            <Typography sx={styles.header}>Record: {index + 1}</Typography>
            <TableContainer sx={{ p: "0.5rem" }}>
              <Table
                sx={{ minWidth: 650 }}
                aria-label="criminal history record data table"
              >
                <TableBody sx={{ "& > tr > td": { border: 0, p: 0 } }}>
                  {Object.entries(data.criminalHistoryRecordList[index]).map(
                    (t: any, k: any) => {
                      if (
                        t[1] !== "" &&
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
                            <TableCell width="30%">
                              <Typography style={styles.keys}>
                                {CriminalHistoryRecordLabels[k]}
                              </Typography>
                            </TableCell>
                            <TableCell width="70%">
                              <Typography style={styles.values}>
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
      <hr />
      <TableContainer sx={{ p: "1rem" }}>
        <Table sx={{ minWidth: 650 }} aria-label="criminal history data table">
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
                    <TableCell width="30%">
                      <Typography style={styles.keys}>
                        {CriminalHistoryLabels[k]}
                      </Typography>
                    </TableCell>
                    <TableCell width="70%">
                      <Typography style={styles.values}>
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
