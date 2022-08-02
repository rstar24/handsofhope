import { CYFSWMSNextButton } from "../../components/CYFSWMSButtons";
import Input from "../../components/Input";
import CYFMSLayout from "../../components/cyfms/CYFMSLayout";
import CYFMSDropdown from "../../components/cyfms/CYFMSDropdown";
import {
  enableDesiredProfession,
  enableSchoolFields,
  disableDesiredProfession,
  disableSchoolFields,
  doGet,
  doPost,
} from "../../features/cyfms/educationAndEmployment/slice";
import { useAppDispatch, useAppSelector } from "../../library/hooks";
import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { FormEvent, ReactElement } from "react";

/**
 * The EducationAndEmployment functional component.
 * @returns EducationAndEmployment component skeleton.
 */
const EducationAndEmployment = (): ReactElement => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const participantID = useAppSelector(
    (state) => state.cyfmsRegister.data.participantId
  );
  const { education, typeOfEmployee } = useAppSelector(
    (state) => (state as any).codetable
  );
  const state = useAppSelector((state) => state.cyfmsEducationAndEmployment);

  useEffect(() => {
    dispatch(doGet(participantID))
      .unwrap()
      .then((data) => {
        console.log(
          "EducationAndEmployment GET backend API worked successfully"
        );
      })
      .catch((err) => {
        console.log("EducationAndEmployment GET backend API didn't work");
        console.log(err);
      });
  }, []);

  // Handles the form data submission and other
  // activities.
  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    const form: any = e.currentTarget;
    const formData = {
      participantId: participantID,
      educationId: state.data.educationId,
      employmentId: state.data.employmentId,
      attendingSchool: form.attendingSchool.value,
      school: form.schoolName.value,
      grade: form.schoolGrade.value,
      employed: form.employed.value,
      typeOfEmployment: form.typeOfEmployment.value,
      desiredProfession: form.desiredProfession.value,
    };
    dispatch(doPost(formData))
      .unwrap()
      .then((data) => {
        console.log("EducationAndEmployment POST backend API was successful!");
        navigate("/cyfms/criminal_history");
      })
      .catch((err) => {
        console.log("EducationAndEmployment POST backend API didn't work!");
        console.log(err);
      });
  };

  // Handles the form fields' value changes
  // and other activities.
  const changeHandler = (e: FormEvent) => {
    const form: any = e.currentTarget;
    console.log(form.school);
    if (form.attendingSchool.value === "Yes") {
      dispatch(enableSchoolFields(null));
    } else {
      form.schoolName.value = "";
      form.schoolGrade.value = "";
      dispatch(disableSchoolFields(null));
    }
    if (form.typeOfEmployment.value === "Job Search") {
      dispatch(enableDesiredProfession(null));
    } else {
      form.desiredProfession.value = "";
      dispatch(disableDesiredProfession(null));
    }
  };

  return (
    <CYFMSLayout>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem 0",
        }}
        onSubmit={submitHandler}
        onChange={changeHandler}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem 0" }}>
          <Box>
            <Typography variant="body1" color="primary">
              Education
            </Typography>
            <Box
              sx={{ display: "flex", flexDirection: "column", gap: "1rem 0" }}
            >
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
                <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
                  <CYFMSDropdown
                    autofill={state.data.attendingSchool}
                    id="attendingSchool"
                    value="Attending School?"
                    optionsList={Object.values(education).map(
                      (education: any) => education.en
                    )}
                  />
                </Box>
                <Box sx={{ flexBasis: 0, flexGrow: 1 }}></Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "1rem",
                  flexGrow: 5,
                }}
              >
                <Box sx={{ flexBasis: 0, flexGrow: 0.5 }}>
                  <Input
                    autofill={state.data.school}
                    disabled={state.disabledSchoolFields}
                    id="schoolName"
                    value="School"
                    validationPattern={`^[a-zA-Z ]*$`}
                    validationTitle="Digits are not allowed!"
                  />
                </Box>
                <Box sx={{ flexBasis: 0, flexGrow: 0.5 }}>
                  <Input
                    autofill={state.data.grade}
                    disabled={state.disabledSchoolFields}
                    id="schoolGrade"
                    value="Grade"
                  />
                </Box>
              </Box>
            </Box>
          </Box>
          <Box>
            <Typography variant="body1" color="primary">
              Employment
            </Typography>
            <Box
              sx={{ display: "flex", flexDirection: "column", gap: "1rem 0" }}
            >
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
                <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
                  <CYFMSDropdown
                    autofill={state.data.employed}
                    id="employed"
                    value="Employed?"
                    optionsList={Object.values(education).map(
                      (education: any) => education.en
                    )}
                  />
                </Box>
                <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
                  <CYFMSDropdown
                    autofill={state.data.typeOfEmployment}
                    id="typeOfEmployment"
                    value="Type of Employment"
                    optionsList={Object.values(typeOfEmployee).map(
                      (employee: any) => employee.en
                    )}
                  />
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "0 1rem",
                }}
              >
                <Box sx={{ flexBasis: 0, flexGrow: 0.999999 }}>
                  <Input
                    autofill={state.data.desiredProfession}
                    disabled={state.disabledDesiredProfession}
                    id="desiredProfession"
                    validationPattern={`^[a-zA-Z ]*$`}
                    validationTitle="Digits are not allowed!"
                    value="Desired Profession"
                  />
                </Box>
                <Box sx={{ flexBasis: 0, flexGrow: 1 }}></Box>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "right" }}>
          <CYFSWMSNextButton />
        </Box>
      </Box>
    </CYFMSLayout>
  );
};

export default EducationAndEmployment;
