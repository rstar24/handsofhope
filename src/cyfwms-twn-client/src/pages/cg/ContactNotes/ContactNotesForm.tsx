import { CYFSWMSNextButton } from "../../../components/CYFSWMSButtons";
import Dropdown from "../../../components/Dropdown";
import Input from "../../../components/Input";
import TextArea from "../../../components/TextArea";
import EditIcon from "../../../components/cg/contactNotes/EditIcon";
import {
  Data,
  doPost,
  doSearch,
} from "../../../features/cg/contactNotes/slice";
import { onKeyDown } from "../../../library/app";
import { useAppDispatch, useAppSelector } from "../../../library/hooks";
import { Box } from "@mui/material";
import React from "react";
import type { FC, FormEvent } from "react";

const ContactNotesForm: FC<any> = ({
  setAddNew,
  setDisabled,
  disabled,
  targetValue,
}) => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.cgCareProvider);
  const { contactMethod } = useAppSelector((state) => state.codetable);
  const data = useAppSelector((state) => state.cgContactNotes.data);

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const formData: Data = {
      cgProviderId: state.getData.id ? state.getData.id : state.data.id,
      cgContactNotesId: data.cgContactNotesId,
      name: form.naam.value,
      worker: form.worker.value,
      date: form.date.value,
      time: form.time.value,
      contactMethod: form.contactMethod.value,
      needAddress: form.address.value,
      summary: form.summary.value,
      result: form.result.value,
      nextStep: form.nextStep.value,
      casePlanProgress: form.progress.value,
      additionalInformation: form.information.value,
    };
    dispatch(doPost(formData))
      .unwrap()
      .then(() => {
        console.log("CgContactNotes POST backend API was successful!");
        dispatch(
          doSearch({
            id: state.data.id ? state.data.id : state.getData.id,
            data: "",
          })
        );
        setAddNew(false);
      })
      .catch((err) => {
        console.log("CgContactNotes POST backend API didn't work!");
        console.log(err);
      });
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
            contactId={data.cgContactNotesId}
            targetValue={targetValue}
          />
        </Box>
      )}
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
        <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
          <Input
            id="naam"
            value="Name"
            required
            autofill={data.name}
            readOnly={disabled}
          />
        </Box>
        <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
          <Input
            id="worker"
            value="Worker"
            required
            autofill={data.worker}
            readOnly={disabled}
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
            autofill={data.date}
            maxDate={new Date().toISOString().substring(0, 10)}
            minDate="1900-01-01"
          />
        </Box>
        <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
          <Input
            id="time"
            value="Time"
            type="time"
            autofill={data.time}
            readOnly={disabled}
          />
        </Box>
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
        <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
          <Dropdown
            id="contactMethod"
            value="Contact Method"
            autofill={data.contactMethod}
            disabled={disabled}
            optionsList={Object.values(contactMethod).map(
              (status: any) => status.en
            )}
          />
        </Box>
        <Box sx={{ flexBasis: 0, flexGrow: 1 }}></Box>
      </Box>
      <TextArea
        id="address"
        value="Need(s) Addressed"
        autofill={data.needAddress}
        readOnly={disabled}
        outlinedInputFlex="5.25 1 0"
      />
      <TextArea
        id="summary"
        value="Summary"
        autofill={data.summary}
        readOnly={disabled}
        outlinedInputFlex="5.25 1 0"
      />
      <TextArea
        id="result"
        value="Results"
        autofill={data.result}
        readOnly={disabled}
        outlinedInputFlex="5.25 1 0"
      />
      <TextArea
        id="nextStep"
        value="Next Step(s)"
        autofill={data.nextStep}
        readOnly={disabled}
        outlinedInputFlex="5.25 1 0"
      />
      <TextArea
        id="progress"
        value="Progress towards Case Plan"
        autofill={data.casePlanProgress}
        readOnly={disabled}
        outlinedInputFlex="5.25 1 0"
      />
      <TextArea
        id="information"
        value="Additional Information"
        autofill={data.additionalInformation}
        readOnly={disabled}
        outlinedInputFlex="5.25 1 0"
      />
      <Box sx={{ display: "flex", justifyContent: "right" }}>
        <CYFSWMSNextButton disabled={disabled} />
      </Box>
    </Box>
  );
};

export default ContactNotesForm;
