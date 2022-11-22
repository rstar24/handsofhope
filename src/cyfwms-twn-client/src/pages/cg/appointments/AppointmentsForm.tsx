import { CYFSWMSNextButton } from "../../../components/CYFSWMSButtons";
import Dropdown from "../../../components/Dropdown";
import Input from "../../../components/Input";
import TextArea from "../../../components/TextArea";
import EditIcon from "../../../components/cg/appointments/EditIcon";
import SearchClientName from "../../../components/cyfms/searchClient/SearchClientName";
import {
  Data,
  doPost,
  doSearch,
  disableClosingDate,
  enableClosingDate,
  disabledFrequency,
  enableFrequency,
} from "../../../features/cg/appointment/slice";
import { onKeyDown } from "../../../library/app";
import { useAppDispatch, useAppSelector } from "../../../library/hooks";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Typography,
  FormControl,
  FormLabel,
  OutlinedInput,
} from "@mui/material";
import React, { useState } from "react";
import type { FC, FormEvent } from "react";

const AppointmentsForm: FC<any> = ({
  setAddNew,
  setDisabled,
  disabled,
  targetValue,
}) => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.cgCareProvider);
  const data = useAppSelector((state) => state.cgAppointment.data);
  const stete = useAppSelector((state) => state.cgAppointment);
  const { id, clientName } = useAppSelector((state) => state.cgAppointment);
  const { appointmentstatus, frequency, initialContactReferral } =
    useAppSelector((state) => state.codetable);

  const [click, setClick] = useState(false);

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    if (!click) {
      const form = e.currentTarget as HTMLFormElement;
      const formData: Data = {
        cgappointmentId: data.cgappointmentId,
        id: state.getData.id,
        appointmentDto: {
          appointmentId: data.appointmentDto.appointmentId,
          subject: form.subject.value,
          status: form.appointmentstatus.value,
          date: form.date.value,
          time: form.time.value,
          location: form.location.value,
          duration: form.duration.value,
          client: id,
          caseworker: form.caseworker.value,
          recurringAppointment: form.recurringappointment.value,
          frequency: form.frequency.value,
          endDate: form.endDate.value,
          notes: form.notes.value,
        },
      };
      dispatch(doPost(formData))
        .unwrap()
        .then(() => {
          console.log("CgAppointments POST backend API was successful!");
          dispatch(doSearch({ id: state.getData.id, data: "" }));
          setAddNew(false);
        })
        .catch((err) => {
          console.log("CgAppointments POST backend API didn't work!");
          console.log(err);
        });
    }
  };

  const changeHandler = (e: FormEvent) => {
    e.preventDefault();
    const form: any = e.currentTarget;
    // Start: Make min date of "End Date" field the current
    // entered date in "Date" field
    form.endDate.min = form.date.value;
    // END
    if (form.recurringappointment.value === "Yes") {
      dispatch(enableClosingDate(null));
      dispatch(enableFrequency(null));
    } else {
      dispatch(disableClosingDate(null));
      dispatch(disabledFrequency(null));
    }
  };

  const handleSearch = () => {
    if (!disabled) {
      setClick(true);
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
          <Dropdown
            id="appointmentstatus"
            value="Status"
            required
            autofill={data.appointmentDto.status}
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
          <FormControl
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            <FormLabel
              sx={{ p: 1, flexBasis: 0, flexGrow: 1.06, color: "black" }}
            >
              Client
            </FormLabel>
            <OutlinedInput
              sx={{
                borderRadius: 0,
                flexBasis: 0,
                flexGrow: 2,
              }}
              size="small"
              readOnly={disabled}
              value={clientName}
              style={{ backgroundColor: "#dfdada" }}
              endAdornment={<SearchIcon onClick={handleSearch} />}
            />
          </FormControl>
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
          <Dropdown
            id="recurringappointment"
            value="Is this a recurring appointment?"
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
          <Dropdown
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
            minDate="1900-01-01"
          />
        </Box>
      </Box>
      <TextArea
        formLabelFlex="1 1 0"
        outlinedInputFlex="5.3 1 0"
        id="notes"
        value="Notes"
        autofill={data.appointmentDto.notes}
        readOnly={disabled}
      />
      <Box sx={{ display: "flex", justifyContent: "right" }}>
        <CYFSWMSNextButton disabled={disabled} />
      </Box>
      {click && (
        <SearchClientName
          click={click}
          setClick={setClick}
          moduleName="cgAppointment"
          searchId="cgparticipantId"
        />
      )}
    </Box>
  );
};

export default AppointmentsForm;
