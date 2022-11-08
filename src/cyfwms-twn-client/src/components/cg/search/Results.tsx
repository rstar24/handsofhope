import { doGet as doGetCaregiverProvider } from "../../../features/cg/careProvider/slice";
import { doGet as doGetCGCapacity } from "../../../features/cg/capacity/slice";
import { doGet as doGetCGAttachment } from "../../../features/cg/attachments/slice";
import { doGet as doGetCareGivers } from "../../../features/cg/caregivers/slice";
import { doGet as doGetContactNotes } from "../../../features/cg/contactNotes/slice";
import{doSearch as doSearchCGAppointment}  from "../../../features/cg/appointment/slice";

import { setView } from "../../../features/popupSlice";
import { useAppDispatch, useAppSelector } from "../../../library/hooks";
import EditIcon from "../EditIcon";
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
import type { Record } from "../../../features/cg/search/slice";
import { ReactElement } from "react";
import { doGet, doSearch } from "../../../features/cg/contactNotes/slice";

const Results = (): ReactElement => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.cgSearch.data);

  const handleSearchView = (id: any) => {
    dispatch(setView(true));
    dispatch(doGetCaregiverProvider(id)).then((res: any) => {
      dispatch(doSearch({ id: id, data: "" }))
        .unwrap()
        .catch((err) => {});
    });
    dispatch(doGetCareGivers(id));
    dispatch(doGetContactNotes(id));
    dispatch(doGetCGCapacity(id));
    dispatch(doGetCGAttachment(id));
    dispatch(doSearchCGAppointment({id:id,data:""}));
  };

  return (
    <Box>
      <Typography fontSize={20} fontWeight={800} color="red" paddingLeft={2}>
        Total Results - {data.length}
      </Typography>
      <Table sx={{ minWidth: 800 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Reference Id</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((careGiver: Record) => (
            <TableRow
              key={Math.random() * 1000}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>
                <Link
                  to={`/cg/view/${careGiver.cgProviderId}`}
                  onClick={() => {
                    handleSearchView(careGiver.cgProviderId);
                  }}
                >
                  {careGiver.referenceId}
                </Link>
              </TableCell>
              <TableCell>{careGiver.name}</TableCell>
              <TableCell>{careGiver.type}</TableCell>
              <TableCell>{careGiver.status}</TableCell>
              <TableCell>
                <EditIcon
                  value={careGiver.referenceId}
                  cgProviderId={careGiver.cgProviderId || 0}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default Results;
