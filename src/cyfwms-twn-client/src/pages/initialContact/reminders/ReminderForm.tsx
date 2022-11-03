import { CYFSWMSNextButton } from "../../../components/CYFSWMSButtons";
import ICDropdown from "../../../components/initialContact/ICDropdown";
import ICInput from "../../../components/initialContact/ICInput";
import ICTextArea from "../../../components/initialContact/ICTextArea";
import {
  Data,
  doPost,
  doSearch,
  
} from "../../../features/initialContact/reminder/slice";
import { onKeyDown } from "../../../library/app";
import { useAppDispatch, useAppSelector } from "../../../library/hooks";
import EditIcon from "./EditIcon";
import { Box,Typography} from "@mui/material";
import React from "react";
import type { FormEvent } from "react";

const ReminderForm = ({
  setAddNew,
  setDisabled,
  disabled,
  targetValue,
}: any) => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.icFileDetails);
  const { reminderstatus } = useAppSelector((state) => state.codetable);
  const data = useAppSelector((state) => state.icReminder.data);

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const formData: Data = {
      icReminderId: data.icReminderId,
      fileDetailsId:state.getData.fileDetailsId,
      fileNumber:state.getData.fileNumber,
      reminderDto:{
        reminderId: data.reminderDto.reminderId,
        assignedTo: form.assignedTo.value,
        regarding: form.regarding.value,
        subject: form.subject.value,
        status: form.status.value,
        reminderDate: form.reminderDate.value,
        endDate:form.endDate.value,
        description: form.description.value,
        frequency: form.frequency.value,
      }
    };
    dispatch(doPost(formData))
      .unwrap()
      .then(() => {
        console.log("IcReminder POST backend API was successful!");
        dispatch(doSearch({ id: state.getData.fileDetailsId, data: "" }));
        setAddNew(false);
      })
      .catch((err) => {
        console.log("IcReminder POST backend API didn't work!");
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
              icReminderId={data.icReminderId}
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
              id="reminderDate"
              value="Reminder Date"
              type="date"
              autofill={data.reminderDto.reminderDate}
              readOnly={disabled}
              
            />
          </Box>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <ICInput
           
              id="assignedTo"
              value="Assigned To"
              autofill={data.reminderDto.assignedTo} 
              readOnly={disabled}
            />
          </Box>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <ICInput
             
              id="regarding"
              value="Regarding"
              autofill={data.reminderDto.regarding}
              readOnly={disabled}
              required
            />
          </Box>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <ICInput
             
              id="subject"
              value="Subject"
              autofill={data.reminderDto.subject}
              readOnly={disabled}
              required
            />
          </Box>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <ICDropdown
              id="status"
              value="Status"
              autofill={data.reminderDto.status}
              readOnly={disabled}
              required
              optionsList={Object.values(reminderstatus).map(
                (status: any) => status.en
              )}
            />
          </Box>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}></Box>
        </Box>

        <ICTextArea
          id="description"
          value="Description"
          type="text"
          autofill={data.reminderDto.description}
          readOnly={disabled}
        />
        <h4>Reccurance</h4>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <ICInput
              
              id="frequency"
              value="Frequency"
              autofill={data.reminderDto.frequency}
              readOnly={disabled}
            />
          </Box>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <ICInput
           
              id="endDate"
              value="End Date"
              type="date"
              autofill={data.reminderDto.endDate}
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


export default ReminderForm;
