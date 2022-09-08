import { doGet as doGetRegister } from "../../../features/cyfms/register/slice";
import { doGet as doGetContact } from "../../../features/cyfms/contact/slice";
import { doGet as doGetCounselors } from "../../../features/cyfms/counselors/slice";
import { doGet as doGetCriminalHistory } from "../../../features/cyfms/criminalHistory/slice";
import { doGet as doGetEducationAndEmployment } from "../../../features/cyfms/educationAndEmployment/slice";
import { doGet as doGetFamilyPhysicians } from "../../../features/cyfms/familyPhysicians/slice";
import { doGet as doGetHouseholdMembers } from "../../../features/cyfms/householdMembers/slice";
import { doGet as doGetOtherInformation } from "../../../features/cyfms/otherInformation/slice";
import { setView } from "../../../features/popupSlice";

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
import React, { useState } from "react";
import { Link } from "react-router-dom";
import type { Record } from "../../../features/cyfms/search/slice";
import type { ReactElement } from "react";
import { useAppDispatch, useAppSelector } from "../../../library/hooks";
import { setName } from "../../../features/initialContact/fileDetails/slice";

const ClientResults = ({ setClick }: any): ReactElement => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.cyfmsSearch.data);
  const { clientName } = useAppSelector((state) => state.icFileDetails.data);

  const handleSearchView = (id: any) => {
    dispatch(setView(true));
    dispatch(doGetRegister(id));
    dispatch(doGetContact(id));
    dispatch(doGetEducationAndEmployment(id));
    dispatch(doGetOtherInformation(id));
    dispatch(doGetCriminalHistory(id));
    dispatch(doGetHouseholdMembers(id));
    dispatch(doGetFamilyPhysicians(id));
    dispatch(doGetCounselors(id));
  };
  const handleCellClick = (e: any) => {
    console.log(e.target.textContent);
    dispatch(setName(`${"Neeraj"} ${" "}${"Sharma"}`));
    setClick(false);
  };
  return (
    <Box>
      <Typography fontSize={20} fontWeight={800} color="red" paddingLeft={2}>
        Total Results - {data.length}
      </Typography>
      <Table sx={{ minWidth: 800 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Reference ID</TableCell>
            <TableCell>First Name</TableCell>
            <TableCell>Middle Name</TableCell>
            <TableCell>Last Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* {data.map((participant: Record) => ( */}
          <TableRow
            //   key={Math.random() * 1000}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell onClick={handleCellClick}>
              {/* <Link
                onClick={() => {
                  setName("Neeraj");
                  setClick(false);
                }}
              >
                {name}
              </Link> */}
              {clientName}
            </TableCell>
            <TableCell>Neeraj</TableCell>
            <TableCell>Sharma</TableCell>
            <TableCell>Sharma</TableCell>

            <TableCell>
              <EditIcon />
            </TableCell>
          </TableRow>
          {/* ))} */}
        </TableBody>
      </Table>
    </Box>
  );
};

export default ClientResults;
