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
import type { Record } from "../../../features/cyfms/search/slice";
import type { ReactElement } from "react";
import { useAppDispatch, useAppSelector } from "../../../library/hooks";
import {
  setCyfmsClientName,
  setCyfmsId,
} from "../../../features/initialContact/fileDetails/slice";
import { setClientName, setId } from "../../../features/cpa/participant/slice";
import {
  setCgClientName,
  setCgId,
  setCgSecClientName,
  setCgSecId,
} from "../../../features/cg/careProvider/slice";
import {
  setParticipantClientName,
  setParticipantId,
} from "../../../features/initialContact/participant/slice";
import {
  setCyfmsAppointmentClientName,
  setCyfmsAppointmentParticipantId,
} from "../../../features/cyfms/appointment/slice";
import {
  setICAppointmentClientName,
  setICAppointmentParticipantId,
} from "../../../features/initialContact/appointment/slice";
import {
  setCGAppointmentClientName,
  setCGAppointmentParticipantId,
} from "../../../features/cg/appointment/slice";
import {
  setCgReminderClientName,
  setCgReminderParticipantId,
} from "../../../features/cg/reminders/slice";
import {
  setCyfmsReminderClientName,
  setCyfmsReminderParticipantId,
} from "../../../features/cyfms/reminders/slice";
import {
  setInitialContactReminderClientName,
  setInitialContactReminderId,
} from "../../../features/initialContact/reminder/slice";
const ClientResults = ({
  setClick,
  moduleName,
  searchId,
}: any): ReactElement => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.cyfmsSearch.data);
  const handleCellClick = (participant: Record) => {
    if (moduleName === "cpaParticipant") {
      dispatch(
        setClientName(`${participant.firstname}${" "}${participant.surname}`)
      );
      dispatch(setId(participant.participantId));
      setClick(false);
    } else if (moduleName === "initialContact" && searchId === "fileDetails") {
      dispatch(
        setCyfmsClientName(
          `${participant.firstname}${" "}${participant.surname}`
        )
      );
      dispatch(setCyfmsId(participant.participantId));
      setClick(false);
    } else if (
      moduleName === "initialContact" &&
      searchId === "icParticipant"
    ) {
      dispatch(
        setParticipantClientName(
          `${participant.firstname}${" "}${participant.surname}`
        )
      );
      dispatch(setParticipantId(participant.participantId));
      setClick(false);
    } else if (
      moduleName === "cyfmsAppointment" &&
      searchId === "participantId"
    ) {
      dispatch(
        setCyfmsAppointmentClientName(
          `${participant.firstname}${" "}${participant.surname}`
        )
      );
      dispatch(setCyfmsAppointmentParticipantId(participant.participantId));
      setClick(false);
    } else if (
      moduleName === "cyfmsReminder" &&
      searchId === "cyfmsReminderId"
    ) {
      dispatch(
        setCyfmsReminderClientName(
          `${participant.firstname}${" "}${participant.surname}`
        )
      );
      dispatch(setCyfmsReminderParticipantId(participant.participantId));
      setClick(false);
    } else if (
      moduleName === "icAppointment" &&
      searchId === "icparticipantId"
    ) {
      dispatch(
        setICAppointmentClientName(
          `${participant.firstname}${" "}${participant.surname}`
        )
      );
      dispatch(setICAppointmentParticipantId(participant.participantId));
      setClick(false);
    } else if (
      moduleName === "cgAppointment" &&
      searchId === "cgparticipantId"
    ) {
      dispatch(
        setCGAppointmentClientName(
          `${participant.firstname}${" "}${participant.surname}`
        )
      );
      dispatch(setCGAppointmentParticipantId(participant.participantId));
      setClick(false);
    } else if (moduleName === "caregivers" && searchId === "primary") {
      dispatch(
        setCgClientName(`${participant.firstname}${" "}${participant.surname}`)
      );
      dispatch(setCgId(participant.participantId));
      setClick(false);
    } else if (moduleName === "caregivers" && searchId === "secondary") {
      dispatch(
        setCgSecClientName(
          `${participant.firstname}${" "}${participant.surname}`
        )
      );
      dispatch(setCgSecId(participant.participantId));
      setClick(false);
    } else if (moduleName === "cgReminder" && searchId === "cgReminderId") {
      dispatch(
        setCgReminderClientName(
          `${participant.firstname}${" "}${participant.surname}`
        )
      );
      dispatch(setCgReminderParticipantId(participant.participantId));
      setClick(false);
    } else if (
      moduleName === "initialcontactreminder" &&
      searchId === "icReminderId"
    ) {
      dispatch(
        setInitialContactReminderClientName(
          `${participant.firstname}${" "}${participant.surname}`
        )
      );
      dispatch(setInitialContactReminderId(participant.participantId));
      setClick(false);
    }
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
            <TableCell>Last Name</TableCell>
            <TableCell>City</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((participant: Record) => (
            <TableRow
              key={Math.random() * 1000}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell
                onClick={() => {
                  handleCellClick(participant);
                }}
              >
                {participant.referenceId}
              </TableCell>
              <TableCell>{participant.firstname}</TableCell>
              <TableCell>{participant.surname}</TableCell>
              <TableCell>{participant.city}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default ClientResults;
