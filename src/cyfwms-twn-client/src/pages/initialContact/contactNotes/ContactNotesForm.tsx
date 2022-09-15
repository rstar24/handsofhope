import { CYFSWMSNextButton } from "../../../components/CYFSWMSButtons";
import ICDropdown from "../../../components/initialContact/ICDropdown";
import ICInput from "../../../components/initialContact/ICInput";
import ICTextArea from "../../../components/initialContact/ICTextArea";
import {
  Data,
  doPost,
  doSearch,
} from "../../../features/initialContact/contactNotes/slice";
import { onKeyDown } from "../../../library/app";
import { useAppDispatch, useAppSelector } from "../../../library/hooks";
import EditIcon from "./EditIcon";
import { Box } from "@mui/material";
import React from "react";
import type { FormEvent } from "react";

const ContactNotesForm = ({
  setAddNew,
  setDisabled,
  disabled,
  targetValue,
}: any) => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.icFileDetails);
  const { contactMethod } = useAppSelector((state) => state.codetable);
  const data = useAppSelector((state) => state.icContactNotes.data);

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const formData: Data = {
      fileDetailsId: state.data.fileDetailsId,
      contactNotesId: data.contactNotesId,
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
        console.log("PresentConcerns POST backend API was successful!");
        dispatch(doSearch(state.data.fileDetailsId));
        setAddNew(false);
      })
      .catch((err) => {
        console.log("PresentConcerns POST backend API didn't work!");
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
            contactId={data.contactNotesId}
            targetValue={targetValue}
          />
        </Box>
      )}
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
        <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
          <ICInput
            id="naam"
            value="Name"
            required
            autofill={data.name}
            readOnly={disabled}
          />
        </Box>
        <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
          <ICInput
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
          <ICInput
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
          <ICInput
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
          <ICDropdown
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

      <ICTextArea
        id="address"
        value="Need(s) Addressed"
        autofill={data.needAddress}
        readOnly={disabled}
      />
      <ICTextArea
        id="summary"
        value="Summary"
        autofill={data.summary}
        readOnly={disabled}
      />
      <ICTextArea
        id="result"
        value="Results"
        autofill={data.result}
        readOnly={disabled}
      />
      <ICTextArea
        id="nextStep"
        value="Next Step(s)"
        autofill={data.nextStep}
        readOnly={disabled}
      />
      <ICTextArea
        id="progress"
        value="Progress towards Case Plan"
        autofill={data.casePlanProgress}
        readOnly={disabled}
      />
      <ICTextArea
        id="information"
        value="Additional Information"
        autofill={data.additionalInformation}
        readOnly={disabled}
      />
      <Box sx={{ display: "flex", justifyContent: "right" }}>
        <CYFSWMSNextButton disabled={disabled} />
      </Box>
    </Box>
  );
};

export default ContactNotesForm;
