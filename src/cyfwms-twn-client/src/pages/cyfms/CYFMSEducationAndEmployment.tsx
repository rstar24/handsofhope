import { Box, Button, Typography } from "@mui/material";
import CYFMSInput from "../../components/cyfms/CYFMSInput";
import CYFMSLayout from "../../components/cyfms/CYFMSLayout";
import React, { useEffect } from "react";
import type { FormEvent, ReactElement } from "react";
import CYFMSDropdown from "../../components/cyfms/CYFMSDropdown";
import { useAppDispatch, useAppSelector } from "../../library/hooks";
import { doGetContact } from "../../features/contact/contactSlice";
import {
  doGetEducationAndEmployment,
  doPostEducationAndEmployment,
} from "../../features/educationAndEmploymentAPI/educationAndEmploymentSlice";
import { doGetEducation } from "../../features/codetable/codetableSlice";

/**
 * The CYFMSEducationAndEmployment functional component.
 * @returns CYFMSEducationAndEmployment component skeleton.
 */
const CYFMSEducationAndEmployment = (): ReactElement => {
  const dispatch = useAppDispatch();
  const participantId = useAppSelector(
    (state) => (state as any).registration.user.participantId
  );
  const data = useAppSelector(
    (state) => (state as any).educationAndEmployment.user
  );
  useEffect(() => {
    dispatch(doGetEducationAndEmployment(participantId));
  }, []);

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    const data: any = e.currentTarget;
    const newContact = {
      participantId: participantId,
      educationId: 0,
      attendingSchool: data.education.value,
      school: data.school.value,
      grade: data.grade.value,
      employmentId: 0,
      employed: data.education.value,
      typeOfEmployment: data.typeOfEmployee.value,
      desiredProfession: data.desiredProfession.value,
    };

    dispatch(doPostEducationAndEmployment({ user: newContact }));
  };

  return (
    <CYFMSLayout>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "2rem 2rem",
          mb: "auto",
        }}
        onSubmit={submitHandler}
      >
        <Typography>Education</Typography>
        <CYFMSDropdown id="education" value="Attending School?" />
        <CYFMSInput id="school" value="School" />
        <CYFMSInput id="grade" value="Grade" />
        <Typography>Employment</Typography>
        <CYFMSDropdown id="education" value="Employed?" />
        <CYFMSDropdown id="typeOfEmployee" value="Type of Employment" />
        <CYFMSInput id="desiredProfession" value="Desired Profession" />
        <Button variant="contained" type="submit">
          Next
        </Button>
      </Box>
    </CYFMSLayout>
  );
};

export default CYFMSEducationAndEmployment;
