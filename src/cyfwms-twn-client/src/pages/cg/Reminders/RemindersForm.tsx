import { CYFSWMSNextButton } from "../../../components/CYFSWMSButtons";
import Dropdown from "../../../components/Dropdown";
import Input from "../../../components/Input";
import TextArea from "../../../components/TextArea";
import EditIcon from "../../../components/cg/reminders/EditIcon";
import SearchClientName from "../../../components/cyfms/searchClient/SearchClientName";
import { Data, doPost, doSearch } from "../../../features/cg/reminders/slice";
import { onKeyDown } from "../../../library/app";
import { useAppDispatch, useAppSelector } from "../../../library/hooks";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  FormLabel,
  OutlinedInput,
  Typography,
  FormControl,
} from "@mui/material";
import React, { useState } from "react";
import type { FC, FormEvent } from "react";

const RemindersForm: FC<any> = ({
  setAddNew,
  setDisabled,
  disabled,
  targetValue,
}) => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.cgCareProvider);
  const { reminderstatus, frequency } = useAppSelector(
    (state) => state.codetable
  );
  const data = useAppSelector((state) => state.cgReminder.data);
  const { id, clientName } = useAppSelector((state) => state.cgReminder);

  const [click, setClick] = useState(false);

  const handleSearch = () => {
    setClick(true);
  };

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    if (!click) {
      const form = e.currentTarget as HTMLFormElement;
      const formData: Data = {
        id: state.getData.id,
        cgReminderId: data.cgReminderId,
        referenceId: state.getData.referenceId
          ? state.getData.referenceId
          : state.data.referenceId,
        reminderDto: {
          reminderId: data.reminderDto.reminderId,
          assignedTo: form.assignedTo.value,
          regarding: id,
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
          setAddNew(false);
          console.log("CgReminders POST backend API was successful!");
          dispatch(
            doSearch({
              id: state.data.id ? state.data.id : state.getData.id,
              data: "",
            })
          );
        })
        .catch((err) => {
          console.log("CgReminders POST backend API didn't work");
          console.log(err);
        });
    }
  };
  const changeHandler = (e: FormEvent) => {
    e.preventDefault();
    const form: any = e.currentTarget;
    // Start: Make min date of "End Date" field the current
    // entered date in "Date" field
    form.endDate.min = form.reminderDate.value;
    // END
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
            remindersId={data.cgReminderId}
            targetValue={targetValue}
          />
        </Box>
      )}
      <Typography variant="body1">
        <b>Task information</b>
      </Typography>
      {disabled && (
        <Typography sx={{ p: 1 }}>Reference Id:{data.referenceId}</Typography>
      )}
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
        <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
          <Input
            id="reminderDate"
            value="Reminder Date"
            type="date"
            autofill={data.reminderDto.reminderDate}
            readOnly={disabled}
            required
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
              Regarding
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
              required
            />
          </FormControl>
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
          <Dropdown
            id="status"
            value="Status"
            required
            autofill={data.reminderDto.status}
            readOnly={disabled}
            optionsList={Object.values(reminderstatus).map(
              (status: any) => status.en
            )}
          />
        </Box>
        <Box sx={{ flexBasis: 0, flexGrow: 1 }}></Box>
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
        <Box sx={{ flexBasis: 0, flexGrow: 1 }}></Box>
      </Box>
      <TextArea
        formLabelFlex="1 1 0"
        outlinedInputFlex="5.3 1 0"
        id="description"
        value="Description"
        autofill={data.reminderDto.description}
        readOnly={disabled}
      />
      <Typography variant="body1">
        <b>Recurrance</b>
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
        <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
          <Dropdown
            id="frequency"
            value="Frequency"
            autofill={data.reminderDto.status}
            readOnly={disabled}
            required
            optionsList={Object.values(frequency).map(
              (status: any) => status.en
            )}
          />
        </Box>
        <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
          <Input
            id="endDate"
            value="End Date"
            type="date"
            autofill={data.reminderDto.endDate}
            required
            readOnly={disabled}
          />
        </Box>
        {click && (
          <SearchClientName
            click={click}
            setClick={setClick}
            moduleName="cgReminder"
            searchId="cgReminderId"
          />
        )}
      </Box>
      <Box sx={{ display: "flex", justifyContent: "right" }}>
        <CYFSWMSNextButton disabled={disabled} />
      </Box>
    </Box>
  );
};

export default RemindersForm;
