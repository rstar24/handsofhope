import { useAppDispatch, useAppSelector } from "../../../library/hooks";
import { doGet as doGetRegister } from "../../../features/cyfms/register/slice";
import { doGet as doGetContact } from "../../../features/cyfms/contact/slice";
import { doGet as doGetCounselors } from "../../../features/cyfms/counselors/slice";
import { doGet as doGetCriminalHistory } from "../../../features/cyfms/criminalHistory/slice";
import { doGet as doGetEducationAndEmployment } from "../../../features/cyfms/educationAndEmployment/slice";
import { doGet as doGetFamilyPhysicians } from "../../../features/cyfms/familyPhysicians/slice";
import { doGet as doGetHouseholdMembers } from "../../../features/cyfms/householdMembers/slice";
import { doGet as doGetOtherInformation } from "../../../features/cyfms/otherInformation/slice";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { FC } from "react";
import { Link } from "react-router-dom";
import React from "react";
import { ReactElement, useEffect } from "react";

const Appointment : FC =(): ReactElement => {
  const recordsList = useAppSelector((state) => state.icAppointment.record2);
  const data = useAppSelector((state) => state.icFileDetails.getData);
  const {id,clientName} = useAppSelector((state)=>state.icAppointment);
  const dispatch = useAppDispatch();
  const handleLink = () => {
    console.log(id);
    dispatch(doGetRegister(id));
    dispatch(doGetContact(id));
    dispatch(doGetEducationAndEmployment(id));
    dispatch(doGetOtherInformation(id));
    dispatch(doGetCriminalHistory(id));
    dispatch(doGetHouseholdMembers(id));
    dispatch(doGetFamilyPhysicians(id));
    dispatch(doGetCounselors(id));
  };

  console.log(recordsList[0])
  if (recordsList.length === 0) {
    if (true) {
      return <></>;
    }
  }
  
  return (
    <>
       {Object.entries(recordsList).map((t: any, index: number) => (
        <>
          <Typography sx={{ px: "1rem", fontWeight: "bold" }}>
            Record : {index + 1}
          </Typography>
          <TableContainer
            sx={{ display: "flex", justifyContent: "center", p: "1rem" }}
          >
            
            <Table sx={{ maxWidth: 900 }} aria-label="Participant">
              <TableBody
                sx={{ "& > tr > td": { border: 0, p: 0, paddingLeft: 5 } }}
              >
                {recordsList[index].subject !== "" ? (
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
                      Subject
                    </TableCell>
                    <TableCell width="50%">
                      <Typography component="p" sx={{ whiteSpace: "pre-wrap" }}>
                        {recordsList[index].subject}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  <></>
                )}
                {recordsList[index].status !== "" ? (
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
                        {recordsList[index].status}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  <></>
                )} 
                 {recordsList[index].date !== "" ? (
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
                    Date
                    </TableCell>
                    <TableCell width="50%">
                      <Typography component="p" sx={{ whiteSpace: "pre-wrap" }}>
                        {recordsList[index].date}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  <></>
                )} 
                {recordsList[index].time !== "" ? (
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
                      Time
                    </TableCell>
                    <TableCell width="50%">
                      <Typography component="p" sx={{ whiteSpace: "pre-wrap" }}>
                        {recordsList[index].time}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  <></>
                )} 
                {recordsList[index].location !== "" ? (
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
                      Location
                    </TableCell>
                    <TableCell width="50%">
                      <Typography component="p" sx={{ whiteSpace: "pre-wrap" }}>
                        {recordsList[index].location}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  <></>
                )} 
                {recordsList[index].duration !== "" ? (
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
                      Duration
                    </TableCell>
                    <TableCell width="50%">
                      <Typography component="p" sx={{ whiteSpace: "pre-wrap" }}>
                        {recordsList[index].duration}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  <></>
                )} 
               
                 {recordsList[index].client !== "" ? (
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
                      Client
                    </TableCell>
                    <TableCell width="50%">
                      <Typography component="p" sx={{ whiteSpace: "pre-wrap" }}>
                      <Link to="/cyfms/view" onClick={handleLink}>
                      {clientName}
                        </Link>
                        
                       
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  <></>
                )}
                 {recordsList[index].caseworker !== "" ? (
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
                      Caseworker
                    </TableCell>
                    <TableCell width="50%">
                      <Typography component="p" sx={{ whiteSpace: "pre-wrap" }}>
                        {recordsList[index].caseworker}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  <></>
                )} 
                {recordsList[index].recurringAppointment !== "" ? (
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
                     Is this a recurring appointment 
                    </TableCell>
                    <TableCell width="50%">
                      <Typography component="p" sx={{ whiteSpace: "pre-wrap" }}>
                        {recordsList[index].recurringAppointment}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  <></>
                )} 
                {recordsList[index].frequency !== "" ? (
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
                      Frequency
                    </TableCell>
                    <TableCell width="50%">
                      <Typography component="p" sx={{ whiteSpace: "pre-wrap" }}>
                        {recordsList[index].frequency}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  <></>
                )} 
                {recordsList[index].endDate !== "" ? (
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
                      End Date
                    </TableCell>
                    <TableCell width="50%">
                      <Typography component="p" sx={{ whiteSpace: "pre-wrap" }}>
                        {recordsList[index].endDate}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  <></>
                )} 
                {recordsList[index].notes !== "" ? (
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
                    Notes
                    </TableCell>
                    <TableCell width="50%">
                      <Typography component="p" sx={{ whiteSpace: "pre-wrap" }}>
                        {recordsList[index].notes}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  <></>
                )} 
              </TableBody>
            </Table>
          </TableContainer>
         
        </>
      ))}


     
    </>
  );
};

export default Appointment;
