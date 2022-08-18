import { doGet as doGetFileDetails } from "../../../features/initialContact/fileDetails/slice";
import { doGet as doGetIncidentReport } from "../../../features/initialContact/incidentReport/slice";
import { doGet as doGetPatientCareInformation } from "../../../features/initialContact/patientCareInformation/slice";
import { doGet as doGetPresentConcerns } from "../../../features/initialContact/presentConcerns/slice";
import { doGet as doGetReferralInformation } from "../../../features/initialContact/referralInformation/slice";
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
import type { Record } from "../../../features/initialContact/search/slice";
import type { ReactElement } from "react";

const Results = (): ReactElement => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.icSearch.data);

  const handleSearchView = (initialContactID: any) => {
    dispatch(setView(true));
    dispatch(doGetFileDetails(initialContactID));
    dispatch(doGetReferralInformation(initialContactID));
    dispatch(doGetIncidentReport(initialContactID));
    dispatch(doGetPresentConcerns(initialContactID));
    dispatch(doGetPatientCareInformation(initialContactID));
  };

  return (
    <Box>
      <Typography fontSize={20} fontWeight={800} color="red" paddingLeft={2}>
        Total Results - {data.length}
      </Typography>
      <Table sx={{ minWidth: 800 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>File Number</TableCell>
            <TableCell>Client Name</TableCell>
            <TableCell>Caseworker</TableCell>
            <TableCell>Start Date</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((initialContact: Record) => (
            <TableRow
              key={Math.random() * 1000}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>
                <Link
                  to={`/initial_contact/view/${initialContact.fileDetailsId}`}
                  onClick={() => handleSearchView(initialContact.fileDetailsId)}
                >
                  {initialContact.fileNumber}
                </Link>
              </TableCell>
              <TableCell>{initialContact.clientName}</TableCell>
              <TableCell>{initialContact.caseworker}</TableCell>
              <TableCell>{initialContact.startingDate}</TableCell>
              <TableCell>{initialContact.status}</TableCell>
              <TableCell>
                <EditIcon value={initialContact.fileDetailsId} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default Results;
