import { useAppSelector } from "../../../library/hooks";
import { ReferralInformationLabels } from "../../../library/labels/initialContact";
import { styles } from "../../../pages/initialContact/View";
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

const ReferralInformation = (): ReactElement => {
  const data = useAppSelector((state) => state.icReferralInformation.data);

  return (
    <TableContainer
      sx={{ display: "flex", justifyContent: "center", p: "1rem" }}
    >
      <Table sx={{ maxWidth: 900 }} aria-label="register data table">
        <TableBody sx={{ "& > tr > td": { border: 0, p: 0 } }}>
          {Object.entries(data).map((t: any, k: any) => {
            if (
              t[1] !== "" &&
              t[1] !== 0 &&
              t[1] !== false &&
              ReferralInformationLabels[k] !== "FileDetailsId" &&
              ReferralInformationLabels[k] !== "ReferralInfoId"
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
                    {ReferralInformationLabels[k]}
                  </TableCell>
                  <TableCell width="50%">
                    <Typography variant="h6" style={styles.values}>
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
  );
};

export default ReferralInformation;
