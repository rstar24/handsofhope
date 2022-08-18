import { useAppSelector } from "../../../library/hooks";
import { IncidentReportLabels } from "../../../library/labels/initialContact";
import { styles } from "../../../pages/initialContact/View";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import type { ReactElement } from "react";

const IncidentReport = (): ReactElement => {
  const data = useAppSelector((state) => state.icIncidentReport.data);

  return (
    <TableContainer
      sx={{ display: "flex", justifyContent: "center", p: "1rem" }}
    >
      <Table sx={{ maxWidth: 900 }} aria-label="register data table">
        <TableBody sx={{ "& > tr > td": { border: 0, p: 0 } }}>
          {Object.entries(data).map((t: any, k) => {
            if (
              t[1] !== "" &&
              t[1] !== "0001-01-01" &&
              t[1] !== "01:01:01" &&
              t[1] !== 0 &&
              IncidentReportLabels[k] !== "FileDetailsId" &&
              IncidentReportLabels[k] !== "IncidentReportId"
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
                    {IncidentReportLabels[k]}
                  </TableCell>
                  <TableCell width="50%">
                    <Typography variant="h6" style={styles.values}>
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
  );
};

export default IncidentReport;
