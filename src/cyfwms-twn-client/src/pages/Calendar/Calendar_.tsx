import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../../index.css";
import { Box, Typography } from "@mui/material";
import AuthLayout from "../../components/auth/layout/AuthLayout";
import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../library/hooks";
import AppointmentEvent from "./AppointmentEvent";
import {
  doGetAll,
  doGetByDate as doGetAppointments,
} from "../../features/calendar/appointments/slice";
import ReminderEvent from "./ReminderEvent";
import { doGetByDate } from "../../features/calendar/reminders/slice";

const localizer = momentLocalizer(moment);

const initialArtists = [{ id: 0, title: "Neeraj", start: "", end: "" }];
const Calendar_ = (props: any) => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const data = useAppSelector((state) => state.calendarAppointment.record);
  const [title, setTitle] = useState(["No Event"]);
  const [newEvent, setNewEvent] = useState(initialArtists);
  const [start, setStart] = useState(
    moment(new Date()).format(" ddd, DD MMM yyyy ")
  );
  const [end, setEnd] = useState(
    moment(new Date()).format(" ddd, DD MMM yyyy ")
  );

  useEffect(() => {
    dispatch(doGetAll()).then((res: any) => {
      const events = res.payload.map((key: any) => ({
        id: key.appointmentId,
        title: key.subject,
        start: moment(key.date).toDate(),
        end: moment(key.date).toDate(),
      }));
      setNewEvent(events);

      // for (var i = 0; i < res.payload.length; i++) {
      //   if (res.payload[i].start === moment(new Date()).format("yyyy-MM-DD")) {
      //     setTitle(res.payload[i].title);
      //   }
      // }
    });
  }, [open]);

  const showEvent = (e: any) => {
    setTitle(e.title);
    setStart(moment(new Date(e.start)).format(" ddd, DD MMM yyyy "));
    setEnd(moment(new Date(e.end)).format(" ddd, DD MMM yyyy "));
  };

  const dayPropGetter = useCallback((date: Date) => {
    return {
      ...(date.getDate() === new Date().getDate() &&
        date.getMonth() === new Date().getMonth() &&
        date.getFullYear() === new Date().getFullYear() && {
          style: { backgroundColor: "#8ac9c669" },
        }),
    };
  }, []);

  const selecteDate = (range: { start: Date; end: Date }) => {
    return true;
  };

  const selecetedSlot = (slotInfo: any) => {
    //slotInfo.start
    dispatch(doGetAppointments(moment(slotInfo.start).format("yyyy-MM-DD")));
    dispatch(doGetByDate(moment(slotInfo.start).format("yyyy-MM-DD")));
  };

  const handleEvent = (e: any) => {
    console.log("eventsssssssss", e);
  };

  return (
    <>
      <AuthLayout>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem 0",
            padding: "1%",
          }}
        >
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 0rem" }}>
            <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
              <Calendar
                selectable
                className="rbc-button-link rbc-show-more rbc-month-view "
                events={newEvent}
                startAccessor="start"
                endAccessor="end"
                onSelectEvent={handleEvent}
                defaultDate={moment(new Date()).toDate()}
                min={new Date(0, 0, 0, 9, 0, 0)}
                localizer={localizer}
                onDoubleClickEvent={showEvent}
                eventPropGetter={(isSelected: any) => ({
                  isSelected,
                  style: { backgroundColor: "red", color: "white" },
                })}
                dayPropGetter={dayPropGetter}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "400px",
                  width: "500px",
                }}
                onSelecting={selecteDate}
                onSelectSlot={selecetedSlot}
                views={{ month: true, day: true }}
              />
            </Box>
            <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
              <Typography sx={{ fontWeight: 1000 }}>Appointments</Typography>
              <Box
                sx={{
                  height: 180,
                  flexBasis: 0,
                  flexGrow: 1,
                  overflow: "hidden",
                  overflowY: "scroll",
                }}
              >
                <AppointmentEvent />
              </Box>
              <Typography sx={{ fontWeight: 1000 }}>Reminders</Typography>
              <Box
                sx={{
                  height: 180,
                  flexBasis: 0,
                  flexGrow: 1,
                  overflow: "hidden",
                  overflowY: "scroll",
                }}
              >
                <ReminderEvent />
              </Box>
            </Box>
          </Box>
        </Box>
      </AuthLayout>
    </>
  );
};

export default Calendar_;
