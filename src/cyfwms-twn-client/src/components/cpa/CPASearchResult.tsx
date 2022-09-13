import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

import type { ReactElement } from "react";
import { Record } from "../../features/cpa/search/slice";
import { useAppDispatch, useAppSelector } from "../../library/hooks";
import { doGet } from "../../features/cpa/culturalProgramActivity/slice";
import { setView } from "../../features/popupSlice";
import EditIcon from "./EditIcon";

const CPASearchResult = (): ReactElement => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.cpaSearch.data);

  const handleSearchView = (id: any) => {
    dispatch(setView(true));
    dispatch(doGet(id));
  };
  console.log("sss", data);
  return (
    <Box>
      <Typography fontSize={20} fontWeight={800} color="red" paddingLeft={2}>
        {/* Total Results - {data.lengt} */}
      </Typography>
      <Table sx={{ minWidth: 800 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Reference ID</TableCell>
            <TableCell> Name</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Caseworker</TableCell>
            <TableCell>Status</TableCell>

            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((participant: Record) => (
            <TableRow
              key={Math.random() * 1000}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>
                <Link
                  to={`/cyfms/view/${participant.referenceId}`}
                  onClick={() => {
                    console.log(participant);
                    handleSearchView(participant.referenceId);
                  }}
                >
                  {participant.referenceId}
                </Link>
              </TableCell>

              <TableCell>{participant.name}</TableCell>
              <TableCell>{participant.type}</TableCell>
              <TableCell>{participant.caseworker}</TableCell>
              <TableCell>{participant.status}</TableCell>

              <TableCell>
                <EditIcon
                  value={participant.referenceId}
                  referenceID={participant.referenceId || 0}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default CPASearchResult;
