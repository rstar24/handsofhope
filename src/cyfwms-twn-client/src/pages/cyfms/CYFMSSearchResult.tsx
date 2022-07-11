import React, { ReactElement } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useAppSelector } from "../../library/hooks";
import { Box } from "@mui/material";

const CYFMSSearchResult = (): ReactElement => {
  const searchData = useAppSelector((state) => (state as any).search.readUser);
  return (
    <Box sx={{ my: 10, ml: -55 }}>
      <Table sx={{ minWidth: 800 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>First Name</TableCell>
            <TableCell>Middle Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Date of Birth</TableCell>
            <TableCell>City</TableCell>
            <TableCell>Phone Number</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {searchData.map((i: any) => (
            <TableRow
              key={i}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>{i.firstname}</TableCell>
              <TableCell>{i.middleName}</TableCell>
              <TableCell>{i.surname}</TableCell>
              <TableCell>{i.dateOfBirth}</TableCell>
              <TableCell>{i.city}</TableCell>
              <TableCell>{i.workPhone}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default CYFMSSearchResult;
