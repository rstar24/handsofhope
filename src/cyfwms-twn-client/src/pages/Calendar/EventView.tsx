import React, { ReactElement } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { Link } from "react-router-dom";
import { grey } from "@mui/material/colors";
function EventView(): ReactElement {
  return (
    <div>
      <Table sx={{ minWidth: 600 }} aria-label="simple table">
        <TableHead>
          <TableRow sx={{ backgroundColor: "#da0404", color: "white" }}>
            <TableCell
              sx={{ color: "white" }}
              align="center"
              size="small"
            ></TableCell>
            <TableCell sx={{ color: "white" }} align="center" size="small">
              Date
            </TableCell>
            <TableCell sx={{ color: "white" }} align="center" size="small">
              Subject
            </TableCell>
            <TableCell sx={{ color: "white" }} align="center" size="small">
              Status
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody
          sx={{
            "& > tr > td": {
              backgroundColor: grey["400"],
              p: "0.25rem",
            },
            "& > tr": { border: 0 },
          }}
        >
          {/* {data.map((val: any) => ( */}
          <TableRow
            sx={{
              "&:last-child td, &:last-child th": { border: 0 },
            }}
          >
            <TableCell sx={{ color: "black" }} align="center" size="small">
              <Link
                to="../demo"
                //onClick={() => handleSelected(val.contactNotesId)}
              >
                Select
              </Link>
            </TableCell>
            <TableCell sx={{ color: "black" }} align="center" size="small">
              {"12/10/2022"}
            </TableCell>
            <TableCell sx={{ color: "black" }} align="center" size="small">
              {"Medical Check-up"}
            </TableCell>
            <TableCell sx={{ color: "black" }} align="center" size="small">
              {"Scheduled"}
            </TableCell>
          </TableRow>
          {/* ))} */}
        </TableBody>
      </Table>
    </div>
  );
}

export default EventView;
