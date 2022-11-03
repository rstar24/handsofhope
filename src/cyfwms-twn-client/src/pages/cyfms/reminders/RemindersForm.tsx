import { CYFSWMSNextButton } from "../../../components/CYFSWMSButtons";
import ICTextArea from "../../../components/initialContact/ICTextArea";
import { Data, doPost,doSearch } from "../../../features/cyfms/reminders/slice";
import { onKeyDown } from "../../../library/app";
import { useAppDispatch, useAppSelector } from "../../../library/hooks";
import { Box,Typography } from "@mui/material";
import React, { useState } from "react";
import type { FormEvent } from "react";
import EditIcon from "./EditIcon";
import Input from "../../../components/Input";
import CYFMSDropdown from "../../../components/cyfms/CYFMSDropdown";


const RemindersForm = ({
  setAddNew,
  setDisabled,
  disabled,
  targetValue,
}: any) => {
  const dispatch = useAppDispatch();
  const participantID = useAppSelector(
    (state) => state.cyfmsRegister.data.participantId
  );
  const { reminderstatus } = useAppSelector((state) => state.codetable);
  const state = useAppSelector((state) => state.cyfmsRegister);
  const data = useAppSelector((state) => state.cyfmsReminders.data);
  const [click, setClick] = useState(false);
  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const formData: Data = {
      participantReminderId: data.participantReminderId,
      participantId: state.data.participantId,
      reminderDto: {
        reminderId: data.reminderDto.reminderId,
        assignedTo: form.assignedTo.value,
        regarding: form.regarding.value,
        subject: form.subject.value,
        status: form.status.value,
        reminderDate: form.reminderDate.value,
        endDate: form.endDate.value,
        description: form.description.value,
        frequency: form.frequency.value,
      },
    };
    dispatch(doPost(formData))
      .unwrap()
      .then(() => {
        console.log("CyfmsReminders POST backend API was successful!");
        dispatch(doSearch({ id: state.data.participantId, data: "" }));
        setAddNew(false);
      })
      .catch((err: any) => {
        console.log("CyfmsReminders POST backend API didn't work!");
        console.log(err);
      });
  };

  return (
    <>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem 0",
        }}
        onSubmit={submitHandler}
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
              participantReminderId={data.participantReminderId}
              targetValue={targetValue}
            />
          </Box>
        )}
    
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <Input
              id="reminderDate"
              value="Reminder Date"
              type="date"
              autofill={data.reminderDto.reminderDate}
              readOnly={disabled}
            />
          </Box>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <Input
              id="assignedTo"
              value="Assigned to"
              autofill={data.reminderDto.assignedTo}
              readOnly={disabled}
            />
          </Box>
        </Box>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
          <Input
          id="regarding"
              value="Regarding"
              autofill={data.reminderDto.regarding}
              readOnly={disabled}
              required
              />
          </Box>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <Input
              id="subject"
              value="Subject"
              type="text"
              autofill={data.reminderDto.subject}
              readOnly={disabled}
              required
            />
          </Box>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <CYFMSDropdown
              id="status"
              value="Status"
              required
              autofill={data.reminderDto.status}
              readOnly={disabled}
              optionsList={Object.values(reminderstatus).map(
                (status: any) => status.en)}
            />
          </Box>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <Input
              id="description"
              value="Description"
              type="text"
              autofill={data.reminderDto.description}
              readOnly={disabled}
              required
            />
          </Box>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <Typography variant="body1">
              <b>Recurrance</b>
            </Typography>
          </Box>
        </Box>
        <ICTextArea
          id="notes"
          value="Notes"
          //autofill={data.notes}
          readOnly={disabled}
        />
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <Input
              id="frequency"
              value="Frequency"
              //autofill={data.reminderDto.frequency}
              readOnly={disabled}
            />
          </Box>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <Input
              id="endDate"
              value="End Date"
              type="date"
              //autofill={data.reminderDto.endDate}
              readOnly={disabled}
            />
          </Box>
          
        </Box>
        <Box sx={{ display: "flex", justifyContent: "right" }}>
          <CYFSWMSNextButton disabled={disabled} />
        </Box>
      </Box>
    </>
  );
};

export default RemindersForm;
