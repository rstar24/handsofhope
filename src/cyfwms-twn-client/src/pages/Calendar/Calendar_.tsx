import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../../index.css";
import { Box } from "@mui/material";
import AuthLayout from "../../components/auth/layout/AuthLayout";
import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../library/hooks";
import EventView from "./EventView";

const localizer = momentLocalizer(moment);

const initialArtists = [{ id: 0, title: "Neeraj", start: "", end: "" }];
const Calendar_ = (props: any) => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(["No Event"]);
  const [newEvent, setNewEvent] = useState(initialArtists);
  const [start, setStart] = useState(
    moment(new Date()).format(" ddd, DD MMM yyyy ")
  );
  const [end, setEnd] = useState(
    moment(new Date()).format(" ddd, DD MMM yyyy ")
  );

  // useEffect(() => {
  //   dispatch(doGet()).then((res: any) => {
  //     const events = res.payload.map((key: any) => ({
  //       id: key.calendarId,
  //       title: key.title,
  //       start: moment(key.start).toDate(),
  //       end: moment(key.end).toDate(),
  //     }));
  //     setNewEvent(events);

  //     for (var i = 0; i < res.payload.length; i++) {
  //       if (res.payload[i].start === moment(new Date()).format("yyyy-MM-DD")) {
  //         setTitle(res.payload[i].title);
  //       }
  //     }
  //   });
  // }, [open]);

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
    console.log("slot--", slotInfo);
  };

  const handleEvent = () => {
    console.log("eventsssssssss");
  };

  return (
    <>
      <AuthLayout>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem 0",
            padding: "2%",
          }}
        >
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
            <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
              <Calendar
                selectable
                className="rbc-button-link rbc-show-more rbc-month-view "
                events={[
                  {
                    end: new Date("2022-10-10T18:30:00.000Z"),
                    id: 1,
                    start: new Date("2022-10-10T18:30:00.000Z"),
                    title: "Test",
                  },
                ]}
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
              <EventView />
            </Box>
          </Box>
        </Box>
      </AuthLayout>
    </>
  );
};

export default Calendar_;
