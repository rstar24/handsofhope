import { CYFSWMSNextButton } from "../../../components/CYFSWMSButtons";
import Input from "../../../components/Input";
import {
  Data,
  doPost,
  doSearch,
} from "../../../features/cyfms/appointment/slice";
import CYFMSDropdown from "../../../components/cyfms/CYFMSDropdown";
import { onKeyDown } from "../../../library/app";
import { useAppDispatch, useAppSelector } from "../../../library/hooks";
import EditIcon from "./EditIcon";
import { Box, Typography } from "@mui/material";
import React from "react";
import type { FormEvent } from "react";
import {
  disableClosingDate,
  enableClosingDate,
  disabledFrequency,
  enableFrequency
 
} from "../../../features/cyfms/appointment/slice";
import CYFMSTextArea from "../../../components/cyfms/CYFMSTextArea";

const AppointmentsForm = ({
  setAddNew,
  setDisabled,
  disabled,
  targetValue,
}: any) => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.cyfmsRegister);
  const { appointmentstatus } = useAppSelector((state) => state.codetable);
  const { frequency } = useAppSelector((state) => state.codetable); 
  const { initialContactReferral } = useAppSelector((state) => state.codetable);
  const data = useAppSelector((state) => state.cyfmsAppointments.data);
 const stete = useAppSelector((state)=>state.cyfmsAppointments)
  const submitHandler = (e: FormEvent) => {

    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const formData: Data = {
  
      participantAppointmentId:data.participantAppointmentId,
      participantId:state.data.participantId,
      referenceId:state.data.referenceId,
      appointmentdto:{
        appointmentId: data.appointmentdto.appointmentId,
        subject: form.subject.value,
        status: form.appointmentstatus.value,
        date: form.date.value,
        time: form.time.value,
        location: form.location.value,
        duration: form.duration.value,
        client: form.client.value,
        caseworker: form.caseworker.value,
        recurringAppointment : form.recurringappointment.value,
        frequency: form.frequency.value,
        endDate: form.endDate.value,
        notes:form.notes.value,
      }
     
      
    };

    dispatch(doPost(formData))
      .unwrap()
      .then(() => {
        console.log("PresentConcerns POST backend API was successful!");
       dispatch(doSearch({ id: state.data.participantId, data: "" }));
        setAddNew(false);
      })
      .catch((err:any) => {
        console.log("PresentConcerns POST backend API didn't work!");
        console.log(err);
      });
  };
  // Handles the form data submi and other
  // activities.
  const changeHandler = (e: FormEvent) => {
    e.preventDefault();
    const form: any = e.currentTarget;
    // console.log(form.closingDate.value);
    if (form.recurringappointment.value === "Yes") {
      dispatch(enableClosingDate(null));
      dispatch(enableFrequency(null));
    } else {
      // form.recurringappointment.value = "";
      dispatch(disableClosingDate(null));
      dispatch(disabledFrequency(null));
    }
  };
  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem 0",
      }}
      onSubmit={submitHandler}
      onChange={changeHandler}
      onKeyDown={onKeyDown}
      
    >
      
      {disabled && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <EditIcon
            setDisabled={setDisabled}
            setAddNew={setAddNew}
            participantAppointmentId={data.participantAppointmentId}
            targetValue={targetValue}
          />
        </Box>
      )}
      {disabled && (
        <Typography sx={{ p: 1 }}>
          Reference Id:{state.data.referenceId}
        </Typography>
      )}
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
        <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
          <Input
            id="subject"
            value="Subject"
            //required
            autofill={data.appointmentdto.subject}
            readOnly={disabled}
          />
        </Box>
        <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
          <CYFMSDropdown
            id="appointmentstatus"
            value="Appointment Status"
            autofill={data.appointmentdto.status}
            disabled={disabled}
            // optionsList={[" ","Scheduled", "Rescheduled","Missed","Completed","Cancelled"]}
            optionsList={Object.values(appointmentstatus).map(
              (status: any) => status.en
            )}
          />
        </Box>
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
        <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
          <Input
            id="date"
            value="Date"
            type="date"
            //required
            readOnly={disabled}
            autofill={data.appointmentdto.date}
            maxDate={new Date().toISOString().substring(0, 10)}
            minDate="1900-01-01"
          />
        </Box>
        <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
          <Input
            id="time"
            value="Time"
            type="time"
            autofill={data.appointmentdto.time}
            readOnly={disabled}
          />
        </Box>
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
        <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
          <Input
            id="location"
            value="Location"
            autofill={data.appointmentdto.location}
            readOnly={disabled}
          />
        </Box>
        <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
          <Input
            id="duration"
            value="Duration"
            autofill={data.appointmentdto.duration}
            readOnly={disabled}
          />
        </Box>
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
        <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
          <Input
            id="client"
            value="Client"
            autofill={data.appointmentdto.client}
            readOnly={disabled}
          />
        </Box>
        <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
          <Input
            id="caseworker"
            value="Caseworker"
            autofill={data.appointmentdto.caseworker}
            readOnly={disabled}
          />
        </Box>
      </Box>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
        <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
          <CYFMSDropdown
            id="recurringappointment"
            value="Is this a recurring appointment ?"
            autofill={data.appointmentdto.recurringAppointment}
            disabled={disabled}
            // optionsList={["", "Yes", "No"]}
            optionsList={Object.values(initialContactReferral).map(
              (status: any) => status.en
            )}
          />
        </Box>
        <Box sx={{ flexBasis: 0, flexGrow: 1 }}></Box>
      </Box>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
        <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
          <CYFMSDropdown
            id="frequency"
            value="Frequency"
            disabled={stete.disabledFrequency}
            autofill={data.appointmentdto.frequency}
            readOnly={disabled}
            optionsList={Object.values(frequency).map(
              (status: any) => status.en
            )}
          />
        </Box>
        <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
          <Input
            id="endDate"
            disabled={stete.disabledClosingDate}

            value="End Date"
            maxDate={new Date().toISOString().substring(0, 10)}
            minDate="1900-01-01"
            type="date"
            autofill={data.appointmentdto.endDate}
          
          />
        </Box>
      </Box>

      <CYFMSTextArea
        id="notes"
        value="Notes"
        autofill={data.appointmentdto.notes}
        readOnly={disabled}
      />

      <Box sx={{ display: "flex", justifyContent: "right" }}>
        <CYFSWMSNextButton disabled={disabled} />
      </Box>
    </Box>
  );
};

export default AppointmentsForm;
