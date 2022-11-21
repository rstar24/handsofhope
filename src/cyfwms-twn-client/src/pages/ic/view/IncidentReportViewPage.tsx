import { useAppSelector } from "../../../library/hooks";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import type { FC } from "react";

const IncidentReportViewPage: FC = () => {
  const data = useAppSelector((state) => state.icIncidentReport.data);

  return (
    <TableContainer
      sx={{ display: "flex", justifyContent: "center", p: "1rem" }}
    >
      <Table sx={{ maxWidth: 900 }} aria-label="register data table">
        <TableBody sx={{ "& > tr > td": { border: 0, p: 0 } }}>
          {Object.entries(data).map((t: any, k) => {
            if (
              k !== 0 &&
              k !== 1 &&
              t[1] !== "" &&
              t[1] !== "01:01:01" &&
              t[1] !== "0001-01-01"
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
                    {t[0]
                      //insert a space before all caps
                      .replace(/([A-Z])/g, " $1")
                      // uppercase the first character
                      .replace(/^./, function (str: String) {
                        return str.toUpperCase();
                      })}
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
  );
};

export default IncidentReportViewPage;
