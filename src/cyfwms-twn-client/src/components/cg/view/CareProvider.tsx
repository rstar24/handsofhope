import { useAppDispatch, useAppSelector } from "../../../library/hooks";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import { doGet as doGetRegister } from "../../../features/cyfms/register/slice";
import { doGet as doGetContact } from "../../../features/cyfms/contact/slice";
import { doGet as doGetCounselors } from "../../../features/cyfms/counselors/slice";
import { doGet as doGetCriminalHistory } from "../../../features/cyfms/criminalHistory/slice";
import { doGet as doGetEducationAndEmployment } from "../../../features/cyfms/educationAndEmployment/slice";
import { doGet as doGetFamilyPhysicians } from "../../../features/cyfms/familyPhysicians/slice";
import { doGet as doGetHouseholdMembers } from "../../../features/cyfms/householdMembers/slice";
import { doGet as doGetOtherInformation } from "../../../features/cyfms/otherInformation/slice";
import type { ReactElement } from "react";
import { Link } from "react-router-dom";

const CareProvider = (): ReactElement => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.cgCareProvider.getData);


  const handlePrimaryCaregiver = () =>{
    dispatch(doGetRegister(data.priParticipantId));
    dispatch(doGetContact(data.priParticipantId));
    dispatch(doGetEducationAndEmployment(data.priParticipantId));
    dispatch(doGetOtherInformation(data.priParticipantId));
    dispatch(doGetCriminalHistory(data.priParticipantId));
    dispatch(doGetHouseholdMembers(data.priParticipantId));
    dispatch(doGetFamilyPhysicians(data.priParticipantId));
    dispatch(doGetCounselors(data.priParticipantId));
  }

  const handleSecondaryCaregiver = () =>{
    dispatch(doGetRegister(data.secParticipantId));
    dispatch(doGetContact(data.secParticipantId));
    dispatch(doGetEducationAndEmployment(data.secParticipantId));
    dispatch(doGetOtherInformation(data.secParticipantId));
    dispatch(doGetCriminalHistory(data.secParticipantId));
    dispatch(doGetHouseholdMembers(data.secParticipantId));
    dispatch(doGetFamilyPhysicians(data.secParticipantId));
    dispatch(doGetCounselors(data.secParticipantId));
  }

 
  return (
    <TableContainer
      sx={{ display: "flex", justifyContent: "center", p: "1rem" }}
    >
      <Table sx={{ maxWidth: 900 }}>
        <TableBody sx={{ "& > tr > td": { border: 0, p: 0 } }}>
        {data.referenceId !== 0 ? (
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
                Reference ID
              </TableCell>
              <TableCell width="50%">
                <Typography component="p" sx={{ whiteSpace: "pre-wrap" }}>
                  {data.referenceId}
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            <></>
          )}
          {data.name !== "" ? (
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
                Name
              </TableCell>
              <TableCell width="50%">
                <Typography component="p" sx={{ whiteSpace: "pre-wrap" }}>
                  {data.name}
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            <></>
          )}
          {data.status !== "" ? (
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
                Status
              </TableCell>
              <TableCell width="50%">
                <Typography component="p" sx={{ whiteSpace: "pre-wrap" }}>
                  {data.status}
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            <></>
          )}
          {data.type !== "" ? (
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
                Type
              </TableCell>
              <TableCell width="50%">
                <Typography component="p" sx={{ whiteSpace: "pre-wrap" }}>
                  {data.type}
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            <></>
          )}
          {data.otherType !== "" ? (
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
                Other Type
              </TableCell>
              <TableCell width="50%">
                <Typography component="p" sx={{ whiteSpace: "pre-wrap" }}>
                  {data.otherType}
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            <></>
          )}
          {data.address !== "" ? (
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
                Address
              </TableCell>
              <TableCell width="50%">
                <Typography component="p" sx={{ whiteSpace: "pre-wrap" }}>
                  {data.address}
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            <></>
          )}
          {data.city !== "" ? (
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
                City
              </TableCell>
              <TableCell width="50%">
                <Typography component="p" sx={{ whiteSpace: "pre-wrap" }}>
                  {data.city}
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            <></>
          )}
          {data.postalCode !== "" ? (
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
                Postal Code
              </TableCell>
              <TableCell width="50%">
                <Typography component="p" sx={{ whiteSpace: "pre-wrap" }}>
                  {data.postalCode}
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            <></>
          )}

          {data.province !== "" ? (
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
                Province
              </TableCell>
              <TableCell width="50%">
                <Typography component="p" sx={{ whiteSpace: "pre-wrap" }}>
                  {data.province}
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            <></>
          )}
          {data.phoneNumber !== "" ? (
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
                Phone Number
              </TableCell>
              <TableCell width="50%">
                <Typography component="p" sx={{ whiteSpace: "pre-wrap" }}>
                  {data.phoneNumber}
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            <></>
          )}
          {data.email !== "" ? (
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
                Email
              </TableCell>
              <TableCell width="50%">
                <Typography component="p" sx={{ whiteSpace: "pre-wrap" }}>
                  {data.email}
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            <></>
          )}
          {data.primaryCaregiver !== "" ? (
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
                Primary Caregiver
              </TableCell>
              <TableCell width="50%">
              <Typography component="p" sx={{ whiteSpace: "pre-wrap" }}>
                        <Link to="/cyfms/view" onClick={handlePrimaryCaregiver}>
                          {data.primaryCaregiver}
                        </Link>
                      </Typography>
              </TableCell>
            </TableRow>
          ) : (
            <></>
          )}
          {data.secondaryCaregiver !== "" ? (
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
                Secondary Caregiver
              </TableCell>
              <TableCell width="50%">
              <Typography component="p" sx={{ whiteSpace: "pre-wrap" }}>
                        <Link to="/cyfms/view" onClick={handleSecondaryCaregiver}>
                          {data.secondaryCaregiver}
                        </Link>
                      </Typography>
              </TableCell>
            </TableRow>
          ) : (
            <></>
          )}
         
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CareProvider;
