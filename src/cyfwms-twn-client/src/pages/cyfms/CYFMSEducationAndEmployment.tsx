import { Box, Button, Grid, Typography } from "@mui/material";
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
import { Link } from "react-router-dom";

/**
 * The CYFMSEducationAndEmployment functional component.
 * @returns CYFMSEducationAndEmployment component skeleton.
 */
const CYFMSEducationAndEmployment = (): ReactElement => {
  const dispatch = useAppDispatch();
  const participantId = useAppSelector(
    (state) => (state as any).registration.user.participantId
  );

  const readData = useAppSelector(
    (state) => (state as any).educationAndEmployment.readUser
  );

  const educationData = useAppSelector(
    (state) => (state as any).educationAndEmployment.user
  );
  useEffect(() => {
    dispatch(doGetEducationAndEmployment(participantId));
  }, [dispatch, educationData, participantId]);

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    const data: any = e.currentTarget;
    const newEducationAndEmployment = {
      participantId: participantId,
      educationId: educationData.educationId,
      attendingSchool: data.education.value,
      school: data.school.value,
      grade: data.grade.value,
      employmentId: educationData.employmentId,
      employed: data.education.value,
      typeOfEmployment: data.typeOfEmployee.value,
      desiredProfession: data.desiredProfession.value,
    };

    dispatch(doPostEducationAndEmployment({ user: newEducationAndEmployment }));
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
        <Typography sx={{ color: "blue" }}>Education</Typography>
        <Grid container sm={12} spacing={2}>
          <Grid item sm={5}>
            <CYFMSDropdown
              id="education"
              value="Attending School?"
              autofill={readData.attendingSchool}
            />
          </Grid>
          <Grid item sm={5}></Grid>
          <Grid item sm={5}>
            <CYFMSInput id="school" value="School" autofill={readData.school} />
          </Grid>
          <Grid item sm={5}>
            <CYFMSInput id="grade" value="Grade" autofill={readData.grade} />
          </Grid>
        </Grid>
        <Typography sx={{ color: "blue" }}>Employment</Typography>
        <Grid container sm={12} spacing={2}>
          <Grid item sm={5}>
            <CYFMSDropdown
              id="education"
              value="Employed?"
              autofill={readData.employed}
            />
          </Grid>
          <Grid item sm={5}>
            <CYFMSDropdown
              id="typeOfEmployee"
              value="Type of Employment"
              autofill={readData.typeOfEmployment}
            />
          </Grid>
          <Grid item sm={5}>
            <CYFMSInput
              id="desiredProfession"
              value="Desired Profession"
              autofill={readData.desiredProfession}
            />
          </Grid>
          <Grid item sm={9}></Grid>
          <Grid item sm={2}>
            <Button
              variant="contained"
              type="submit"
              component={Link}
              to="/cyfms/criminal_history"
            >
              Next
            </Button>
          </Grid>
        </Grid>
      </Box>
    </CYFMSLayout>
  );
};

export default CYFMSEducationAndEmployment;
