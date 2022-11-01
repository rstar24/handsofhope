import { CYFSWMSNextButton } from "../../../components/CYFSWMSButtons";
import CYFMSDropdown from "../../../components/cyfms/CYFMSDropdown";
import Input from "../../../components/Input";
import CYFMSTextArea from "../../../components/cyfms/CYFMSTextArea";
import {
  Data,
  doPost,
  doSearch,
} from "../../../features/cg/appointment/slice";
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
 
} from "../../../features/cg/appointment/slice";
const CGAppointmentsForm = ({
  setAddNew,
  setDisabled,
  disabled,
  targetValue,
}: any) => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.cgCareProvider);
  const { appointmentstatus } = useAppSelector((state) => state.codetable);
  const { frequency } = useAppSelector((state) => state.codetable); 
  const { initialContactReferral } = useAppSelector((state) => state.codetable);
  const data = useAppSelector((state) => state.cgAppointment.data);
  const stete = useAppSelector((state)=>state.cgAppointment)
  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const formData: Data = {
      cgappointmentId:data.cgappointmentId,
      id:state.getData.id,
     
      appointmentDto:{
        appointmentId: data.appointmentDto.appointmentId,
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
    console.log(formData)
    dispatch(doPost(formData))
      .unwrap()
      .then(() => {
        console.log("PresentConcerns POST backend API was successful!");
        dispatch(doSearch({ id: state.getData.id, data: "" }));
        setAddNew(false);
      })
      .catch((err) => {
        console.log("PresentConcerns POST backend API didn't work!");
        console.log(err);
      });
  };
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
            CGAppointmentId={data.cgappointmentId}
            targetValue={targetValue}
          />
        </Box>
      )}
 {state.getData.referenceId! >= 0 ? (
          <Typography paddingLeft={1}>
            Reference ID : {state.getData.referenceId}
          </Typography>
        ) : (
          <></>
        )}
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
        <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
          <Input
            id="subject"
            value="Subject"
            required
            autofill={data.appointmentDto.subject}
            readOnly={disabled}
          />
        </Box>
        <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
          <CYFMSDropdown
           id="appointmentstatus"
           value="Status"
           required
            //autofill={data.contactMethod}
            disabled={disabled}
           
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
            required
            readOnly={disabled}
            autofill={data.appointmentDto.date}
            maxDate={new Date().toISOString().substring(0, 10)}
            minDate="1900-01-01"
          />
        </Box>
        <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
          <Input
            id="time"
            value="Time"
            type="time"
            autofill={data.appointmentDto.time}
            readOnly={disabled}
          />
        </Box>
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
        <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
          <Input
            id="location"
            value="Location"
            autofill={data.appointmentDto.location}
            readOnly={disabled}
          />
        </Box>
        <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
          <Input
            id="duration"
            value="Duration"
            autofill={data.appointmentDto.duration}
            readOnly={disabled}
          />
        </Box>
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
        <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
          <Input
            id="client"
            value="Client"
            autofill={data.appointmentDto.client}
            readOnly={disabled}
          />
        </Box>
        <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
          <Input
            id="caseworker"
            value="Caseworker"
            autofill={data.appointmentDto.caseworker}
            readOnly={disabled}
          />
        </Box>
      </Box>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
        <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
          <CYFMSDropdown
            id="recurringappointment"
            value="Is this a recurring appointment ?"
            autofill={data.appointmentDto.recurringAppointment}
            disabled={disabled}
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
            autofill={data.appointmentDto.frequency}
            readOnly={disabled}
            optionsList={Object.values(frequency).map(
              (status: any) => status.en
            )}
          />
        </Box>
        <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
          <Input
            id="endDate"
            value="End Date"
            disabled={stete.disabledClosingDate}
            type="date"
            autofill={data.appointmentDto.endDate}
            readOnly={disabled}
            maxDate={new Date().toISOString().substring(0, 10)}
            minDate="1900-01-01"
          />
        </Box>
      </Box>

      <CYFMSTextArea
       formLabelFlex="1 1 0"
       outlinedInputFlex="5 3 0"
        id="notes"
        value="Notes"
        //autofill={data.notes}
        readOnly={disabled}
      />

      <Box sx={{ display: "flex", justifyContent: "right" }}>
        <CYFSWMSNextButton disabled={disabled} />
      </Box>
    </Box>
  );
};

export default CGAppointmentsForm;
