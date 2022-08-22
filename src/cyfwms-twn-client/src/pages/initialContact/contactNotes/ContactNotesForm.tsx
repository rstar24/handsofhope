import { Box } from "@mui/material";
import React, { FormEvent } from "react";
import { CYFSWMSNextButton } from "../../../components/CYFSWMSButtons";
import ICDropdown from "../../../components/initialContact/ICDropdown";
import ICInput from "../../../components/initialContact/ICInput";
import ICTextArea from "../../../components/initialContact/ICTextArea";
import {
  Data,
  doPost,
} from "../../../features/initialContact/contactNotes/slice";
import { useAppDispatch, useAppSelector } from "../../../library/hooks";
import EditIcon from "./EditIcon";

const ContactNotesForm = ({ setAddNew, setDisabled, disabled }: any) => {
  const dispatch = useAppDispatch();
  const fileDetailsId = useAppSelector(
    (state) => state.icFileDetails.data.fileDetailsId
  );
  const data = useAppSelector((state) => state.icContactNotes.data);

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    const form: any = e.currentTarget;
    const formData: Data = {
      fileDetailsId: fileDetailsId,
      contactNotesId: data.contactNotesId,
      name: form.name.value,
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
    >
      {disabled && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <EditIcon setDisabled={setDisabled} setAddNew={setAddNew} />
        </Box>
      )}
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
        <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
          <ICInput
            id="name"
            value="Name"
            autofill={data.name}
            disabled={disabled}
          />
        </Box>
        <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
          <ICInput
            id="worker"
            value="Worker"
            autofill={data.worker}
            disabled={disabled}
          />
        </Box>
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
        <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
          <ICInput
            id="date"
            value="Date"
            type="date"
            disabled={disabled}
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
            disabled={disabled}
          />
        </Box>
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
        <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
          <ICDropdown
            id="contactMethod"
            value="Contact Method"
            optionsList={["Visit", "abc"]}
            disabled={disabled}
          />
        </Box>
        <Box sx={{ flexBasis: 0, flexGrow: 1 }}></Box>
      </Box>

      <ICTextArea
        id="address"
        value="Need(s) Addressed"
        autofill={data.needAddress}
        disabled={disabled}
      />
      <ICTextArea
        id="summary"
        value="Summary"
        autofill={data.summary}
        disabled={disabled}
      />
      <ICTextArea
        id="result"
        value="Results"
        autofill={data.result}
        disabled={disabled}
      />
      <ICTextArea
        id="nextStep"
        value="Next Step(s)"
        autofill={data.nextStep}
        disabled={disabled}
      />
      <ICTextArea
        id="progress"
        value="Progress towards Case Plan"
        autofill={data.casePlanProgress}
        disabled={disabled}
      />
      <ICTextArea
        id="information"
        value="Additional Information"
        autofill={data.additionalInformation}
        disabled={disabled}
      />
      <Box sx={{ display: "flex", justifyContent: "right" }}>
        <CYFSWMSNextButton disabled={disabled} />
      </Box>
    </Box>
  );
};

export default ContactNotesForm;
