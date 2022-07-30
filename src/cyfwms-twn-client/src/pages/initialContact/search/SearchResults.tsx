import { doGet as doGetFileDetails } from "../../../features/initialContact/fileDetails/slice";
import { doGet as doGetIncidentReport } from "../../../features/initialContact/fileDetails/slice";
import { doGet as doGetPatientCareInformation } from "../../../features/initialContact/patientCareInformation/slice";
import { doGet as doGetPresentConcerns } from "../../../features/initialContact/presentConcerns/slice";
import { doGet as doGetReferralInformation } from "../../../features/initialContact/referralInformation/slice";
import { useAppDispatch, useAppSelector } from "../../../library/hooks";
import EditIcon from "../EditIcon";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import type { Record } from "../../../features/initialContact/search/slice";
import type { ReactElement } from "react";

const SearchResults = (): ReactElement => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.icSearch.data);

  const handleSearchView = (initialContactID: number) => {
    /*dispatch(doGetFileDetails(initialContactID));
    dispatch(doGetReferralInformation(initialContactID));
    dispatch(doGetIncidentReport(initialContactID));
    dispatch(doGetPresentConcerns(initialContactID));
    dispatch(doGetPatientCareInformation(initialContactID));*/
  };

  return (
    <Box>
      <Table sx={{ minWidth: 800 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Client Name</TableCell>
            <TableCell>File Number</TableCell>
            <TableCell>Caseworker</TableCell>
            <TableCell>Start Date</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((initialContact: Record) => (
            <TableRow
              key={Math.random() * 1000}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>
                {/* <Link
                  to={`view/${initialContact.fileDetailsId}`}
                  onClick={() => handleSearchView(initialContact.fileDetailsId)}
                > */}
                {"nil"}
                {/* </Link> */}
              </TableCell>
              <TableCell>{initialContact.clientName}</TableCell>
              <TableCell>{initialContact.fileNumber}</TableCell>
              <TableCell>{initialContact.caseworker}</TableCell>
              <TableCell>{initialContact.startingDate}</TableCell>
              <TableCell>{initialContact.status}</TableCell>
              {/* <TableCell>
                <EditIcon value={i.participantId} />
              </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default SearchResults;
