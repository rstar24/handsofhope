import { doGet as doGetContact } from "../../../features/cyfms/contact/slice";
import { doGet as doGetCounselors } from "../../../features/cyfms/counselors/slice";
import { doGet as doGetCriminalHistory } from "../../../features/cyfms/criminalHistory/slice";
import { doGet as doGetEducationAndEmployment } from "../../../features/cyfms/educationAndEmployment/slice";
import { doGet as doGetFamilyPhysicians } from "../../../features/cyfms/familyPhysicians/slice";
import { doGet as doGetHouseholdMembers } from "../../../features/cyfms/householdMembers/slice";
import { doGet as doGetOtherInformation } from "../../../features/cyfms/otherInformation/slice";
import { doGet as doGetRegister } from "../../../features/cyfms/register/slice";
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
import { Link } from "react-router-dom";
import type { FC } from "react";

/**
 * *CYFMS* aka *Child, Youth, and Family Management System* module. \
 * Sub page: *View* \
 * Sub sub page: `RemindersViewPage` \
 * Displays *reminders* related details.
 */
const RemindersViewPage: FC = () => {
  const dispatch = useAppDispatch();
  const recordsList = useAppSelector((state) => state.cyfmsReminders.record2);
  const { id, clientName } = useAppSelector((state) => state.cyfmsReminders);

  const handleLink = () => {
    dispatch(doGetRegister(id));
    dispatch(doGetContact(id));
    dispatch(doGetEducationAndEmployment(id));
    dispatch(doGetOtherInformation(id));
    dispatch(doGetCriminalHistory(id));
    dispatch(doGetHouseholdMembers(id));
    dispatch(doGetFamilyPhysicians(id));
    dispatch(doGetCounselors(id));
  };

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
                {recordsList[index].reminderDate !== "" ? (
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
                      Reminder Date
                    </TableCell>
                    <TableCell width="50%">
                      <Typography component="p" sx={{ whiteSpace: "pre-wrap" }}>
                        {recordsList[index].reminderDate}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  <></>
                )}
                {recordsList[index].assignedTo !== "" ? (
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
                      Assigned To
                    </TableCell>
                    <TableCell width="50%">
                      <Typography component="p" sx={{ whiteSpace: "pre-wrap" }}>
                        {recordsList[index].assignedTo}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  <></>
                )}

                {recordsList[index].regarding !== "" ? (
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
                      Regarding
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

                {recordsList[index].description !== "" ? (
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
                      Description
                    </TableCell>
                    <TableCell width="50%">
                      <Typography component="p" sx={{ whiteSpace: "pre-wrap" }}>
                        {recordsList[index].description}
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
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ))}
    </>
  );
};

export default RemindersViewPage;
