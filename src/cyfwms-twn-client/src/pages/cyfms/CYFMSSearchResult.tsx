import { Typography, Box, TextField } from "@mui/material";
import React, { ReactElement } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

function createData(
  first: string,
  middle: string,
  last: string,
  phone: number,
  city: string
) {
  return { first, middle, last, phone, city };
}

const rows = [
  createData("Nazim", "nazim", " Khan", 123456, " indore"),
  createData("Sana", "sana", "khan", 3723, "indore"),
];

const CYFMSSearchResult = (): ReactElement => {
  return (
    <Box sx={{ my: 10, ml: -55 }}>
      <Table sx={{ minWidth: 800 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>First Name</TableCell>
            <TableCell>Middle Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>City</TableCell>
            <TableCell>Phone Number</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.first}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.first}
              </TableCell>
              <TableCell>{row.middle}</TableCell>
              <TableCell>{row.last}</TableCell>
              <TableCell>{row.city}</TableCell>
              <TableCell>{row.phone}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default CYFMSSearchResult;
