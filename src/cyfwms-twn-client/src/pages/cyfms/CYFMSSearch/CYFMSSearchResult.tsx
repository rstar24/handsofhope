import React, { ReactElement } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../library/hooks";
import { doGetCYFMSRegister } from "../../../features/cyfms/register/cyfmsRegisterSlice";
import { doGetContact } from "../../../features/cyfms/contact/cyfmsContactSlice";
import { doGetEducationAndEmployment } from "../../../features/cyfms/educationAndEmployment/educationAndEmploymentSlice";
import { doGetOtherInformation } from "../../../features/cyfms/otherInformation/cyfmsOtherInformationSlice";
import { doGetCriminalHistory } from "../../../features/cyfms/criminalHistory/cyfmsCriminalHistorySlice";
import { doGetHouseholdMembers } from "../../../features/cyfms/householdMembers/cyfmsHouseholdMembersSlice";
import { doGetFamilyPhysicians } from "../../../features/cyfms/familyPhysicians/cyfmsFamilyPhysiciansSlice";
import { doGetCounselors } from "../../../features/cyfms/counselors/cyfmsCounselorsSlice";

const CYFMSSearchResult = (): ReactElement => {
  const dispatch = useAppDispatch();
  const searchData = useAppSelector((state) => (state as any).search.readUser);
  const navigate = useNavigate();
  console.log("--->", searchData);
  const handleSearchView = (id: any) => {
    dispatch(doGetCYFMSRegister(id));
    dispatch(doGetContact(id));
    dispatch(doGetEducationAndEmployment(id));
    dispatch(doGetOtherInformation(id));
    dispatch(doGetCriminalHistory(id));
    dispatch(doGetHouseholdMembers(id));
    dispatch(doGetFamilyPhysicians(id));
    dispatch(doGetCounselors(id));
  };
  return (
    <Box sx={{ my: 10, ml: -55 }}>
      <Table sx={{ minWidth: 800 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
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
              <TableCell>
                <Link
                  to={`view/${i.participantId}`}
                  onClick={() => handleSearchView(i.participantId)}
                >
                  {i.participantId}
                </Link>
              </TableCell>
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
