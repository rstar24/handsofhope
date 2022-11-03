import React, { ReactElement, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { Link } from "react-router-dom";
import { grey } from "@mui/material/colors";
import { useAppDispatch, useAppSelector } from "../../library/hooks";
import {
  doGet as doGetCalendar,
  doGetByDate,
  setCalendarView,
} from "../../features/calendar/reminders/slice";
import { initiate } from "../../features/initiatorSlice";
import { setEdit, setOpen } from "../../features/popupSlice";
import { unhideTabs } from "../../features/navBarSlice";
import { doGet as doGetRegister } from "../../features/cyfms/register/slice";
import { doSearch as doSearchCyfmsAppointment } from "../../features/cyfms/appointment/slice";
import { doSearch as doSearchICAppointment } from "../../features/initialContact/appointment/slice";
import moment from "moment";

function ReminderEvent(): ReactElement {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.calendarReminder.record);
  useEffect(() => {
    dispatch(doGetByDate(moment(new Date()).format("yyyy-MM-DD")));
  }, []);

  const handleSelected = (id: number, participant: number) => {
    dispatch(setCalendarView(true));
    dispatch(initiate(null));
    dispatch(unhideTabs(null));
    dispatch(setEdit(true));
    dispatch(setOpen(true));
  };
  return (
    <div>
      <Table sx={{ minWidth: 600 }} aria-label="simple table">
        <TableHead>
          <TableRow sx={{ backgroundColor: "#da0404", color: "white" }}>
            <TableCell
              sx={{ color: "white" }}
              align="center"
              size="small"
            ></TableCell>
            <TableCell sx={{ color: "white" }} align="center" size="small">
              Date
            </TableCell>
            <TableCell sx={{ color: "white" }} align="center" size="small">
              Subject
            </TableCell>
            <TableCell sx={{ color: "white" }} align="center" size="small">
              Status
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody
          sx={{
            "& > tr > td": {
              backgroundColor: grey["400"],
              p: "0.25rem",
            },
            "& > tr": { border: 0 },
          }}
        >
          {data.map((val: any, key: any) => (
            <TableRow
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
              }}
            >
              <TableCell sx={{ color: "black" }} align="center" size="small">
                {val.participantId && (
                  <Link
                    to="../cyfms/reminders"
                    onClick={() => {
                      handleSelected(val.appointmentId, val.participantId);
                      dispatch(doGetRegister(val.participantId));
                      dispatch(
                        doSearchCyfmsAppointment({
                          id: val.participantId,
                          data: "",
                        })
                      );
                    }}
                  >
                    Select
                  </Link>
                )}

                {val.fileDetailsId && (
                  <Link
                    to="../initial_contact/reminders"
                    onClick={() => {
                      handleSelected(val.reminderId, val.fileDetailsId);
                      dispatch(
                        doSearchICAppointment({
                          id: val.fileDetailsId,
                          data: "",
                        })
                      );
                    }}
                  >
                    Select
                  </Link>
                )}
                {val.cgProviderId && (
                  <Link
                    to="../initial_contact/reminders"
                    onClick={() => {
                      handleSelected(val.reminderId, val.cgProviderId);
                      dispatch(
                        doSearchICAppointment({
                          id: val.cgProviderId,
                          data: "",
                        })
                      );
                    }}
                  >
                    Select
                  </Link>
                )}
              </TableCell>
              <TableCell sx={{ color: "black" }} align="center" size="small">
                {val.date}
              </TableCell>
              <TableCell sx={{ color: "black" }} align="center" size="small">
                {val.subject}
              </TableCell>
              <TableCell sx={{ color: "black" }} align="center" size="small">
                {val.status}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default ReminderEvent;
