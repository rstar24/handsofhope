
import { CYFSWMSNextButton } from "../../../components/CYFSWMSButtons";
import ICDropdown from "../../../components/initialContact/ICDropdown";
import ICInput from "../../../components/initialContact/ICInput";
import ICTextArea from "../../../components/initialContact/ICTextArea";
import {
  Data,
  doPost,
  doSearch,
} from "../../../features/initialContact/appointment/slice";
import { onKeyDown } from "../../../library/app";
import { useAppDispatch, useAppSelector } from "../../../library/hooks";
import EditIcon from "./EditIcon";
import { Box ,Typography }from "@mui/material";
import React from "react";
import type { FormEvent } from "react";
import {
  disableClosingDate,
  enableClosingDate,
  disableFrequency,
  enableFrequency
 
} from "../../../features/initialContact/appointment/slice";

const ICAppointmentsForm = ({
  setAddNew,
  setDisabled,
  disabled,
  targetValue,
}: any) => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.icFileDetails);
  const { appointmentstatus } = useAppSelector((state) => state.codetable);
  const { frequency } = useAppSelector((state) => state.codetable); 
  const { initialContactReferral } = useAppSelector((state) => state.codetable);
  const data = useAppSelector((state) => state.icAppointment.data);
 const stete = useAppSelector((state)=>state.icAppointment)
  const submitHandler = (e: FormEvent) => {

    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const formData: Data = {
      icappointmentId:data.icappointmentId,
      fileDetailsId:state.getData.fileDetailsId,
      fileDetailsNo:state.getData.fileNumber,
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
       dispatch(doSearch({ id: state.getData.fileDetailsId, data: "" }));
        setAddNew(false);
      })
      .catch((err) => {
        console.log("PresentConcerns POST backend API didn't work!");
        console.log(err);
      });
  };
    
  console.log("helloooo",data)
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
      dispatch(disableFrequency(null));
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
            icappointmentId={data.icappointmentId}
            targetValue={targetValue}
          />
        </Box>
      )}
      {disabled && (
        <Typography sx={{ p: 1 }}>
          File No:{state.getData.fileNumber}
        </Typography>
      )}
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
        <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
          <ICInput
            id="subject"
            value="Subject"
            required
            autofill={data.appointmentDto.subject}
            readOnly={disabled}
          />
        </Box>
        <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
          <ICDropdown
            id="appointmentstatus"
            value="Status"
            required
            autofill={data.appointmentDto.status}
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
          <ICInput
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
          <ICInput
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
          <ICInput
            id="location"
            value="Location"
            autofill={data.appointmentDto.location}
            readOnly={disabled}
          />
        </Box>
        <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
          <ICInput
            id="duration"
            value="Duration"
            autofill={data.appointmentDto.duration}
            readOnly={disabled}
          />
        </Box>
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
        <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
          <ICInput
            id="client"
            value="Client"
            autofill={data.appointmentDto.client}
            readOnly={disabled}
          />
        </Box>
        <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
          <ICInput
            id="caseworker"
            value="Caseworker"
            autofill={data.appointmentDto.caseworker}
            readOnly={disabled}
          />
        </Box>
      </Box>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
        <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
          <ICDropdown
            id="recurringappointment"
            value="Is this a recurring appointment ?"
            autofill={data.appointmentDto.recurringAppointment}
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
          <ICDropdown
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
          <ICInput
            id="endDate"
            disabled={stete.disabledClosingDate}

            value="End Date"
            maxDate={new Date().toISOString().substring(0, 10)}
            minDate="1900-01-01"
            type="date"
            autofill={data.appointmentDto.endDate}
          
          />
        </Box>
      </Box>

      <ICTextArea
        id="notes"
        value="Notes"
        autofill={data.appointmentDto.notes}
        readOnly={disabled}
      />

      <Box sx={{ display: "flex", justifyContent: "right" }}>
        <CYFSWMSNextButton disabled={disabled} />
      </Box>
    </Box>
  );
};

export default ICAppointmentsForm;
