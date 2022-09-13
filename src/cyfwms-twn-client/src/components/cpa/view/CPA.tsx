import { useAppSelector } from "../../../library/hooks";
import { ContactLabels } from "../../../library/labels/cyfms";
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

const CPA = (): ReactElement => {
  const data = useAppSelector((state) => state.cyfmsContact.data);

  return (
    <TableContainer
      sx={{ display: "flex", justifyContent: "center", p: "1rem" }}
    >
      <Table sx={{ maxWidth: 900 }} aria-label="contact data table">
        <TableBody sx={{ "& > tr > td": { border: 0, p: 0 } }}>
          {/* {Object.entries(data).map((t: any, k: any) => {
            if (
              t[1] !== "" &&
              t[1] !== 0 &&
              ContactLabels[k] !== "ParticipantId" &&
              ContactLabels[k] !== "ParticipantContactId"
            ) { */}
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
              {/* {ContactLabels[k]} */}
              123
            </TableCell>
            <TableCell width="50%">
              <Typography component="p" sx={{ whiteSpace: "pre-wrap" }}>
                {/* {t[1]} */}
                abc
              </Typography>
            </TableCell>
          </TableRow>
          );
          {/* }
            return <></>;
          })} */}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CPA;
