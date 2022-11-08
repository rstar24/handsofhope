import { useAppDispatch, useAppSelector } from "../../../library/hooks";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { FC } from "react";
import React from "react";
import { ReactElement, useEffect } from "react";
import { doSearch } from "../../../features/cyfms/appointment/slice";

const Appointment : FC =(): ReactElement => {
  const recordsList = useAppSelector((state) => state.cgAppointment.record2);
  // const dispatch = useAppDispatch();
  // const data = useAppSelector((state) => state.cyfmsAppointments.getData);
  // const popup = useAppSelector((state) => state.popup.open);
 
  // useEffect(() => {
  //   dispatch(doSearch({ id: data.participantId, data: "" }));
  // }, [popup]);
  // console.log(Object.entries(recordsList))
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
                      StartingDate
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
               
                 {/* {recordsList[index].client !== "" ? (
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
                      Client Name
                    </TableCell>
                    <TableCell width="50%">
                      <Typography component="p" sx={{ whiteSpace: "pre-wrap" }}>
                        
                          {recordsList[index].client}
                       
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  <></>
                )} */}
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
                      EndDate
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
              </TableBody>
            </Table>
          </TableContainer>
         
        </>
      ))}


     
    </>
  );
};

export default Appointment;
