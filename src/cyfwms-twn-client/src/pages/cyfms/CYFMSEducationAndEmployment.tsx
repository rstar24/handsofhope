import { Box, Typography } from "@mui/material";
import CYFMSInput from "../../components/cyfms/CYFMSInput";
import CYFMSLayout from "../../components/cyfms/CYFMSLayout";
import CYFMSDropdown from "../../components/cyfms/CYFMSDropdown";
import { useAppDispatch, useAppSelector } from "../../library/hooks";
import {
  doGetEducationAndEmployment,
  doPostEducationAndEmployment,
} from "../../features/cyfms/educationAndEmploymentAPI/educationAndEmploymentSlice";
import { doGetEducation } from "../../features/codetable/codetableSlice";
import { useNavigate } from "react-router-dom";
import { CYFSWMSNextButton } from "../../components/CYFSWMSButtons";
import React, { useEffect, useState } from "react";
import type { FormEvent, ReactElement } from "react";

/**
 * The CYFMSEducationAndEmployment functional component.
 * @returns CYFMSEducationAndEmployment component skeleton.
 */
const CYFMSEducationAndEmployment = (): ReactElement => {
  const navigate = useNavigate();
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

  const [disabledSchoolFields, setDisabledSchoolFields] =
    useState<boolean>(true);
  const [disabledDesiredProfession, setDisabledDesiredProfession] =
    useState<boolean>(true);

  // Handles the form data submission and other
  // activities.
  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    const data: any = e.currentTarget;
    const newEducationAndEmploymentData = {
      participantId: participantId,
      attendingSchool: data.educationAndEmployment_AttendingSchool.value,
      school: data.educationAndEmployment_SchoolName.value,
      grade: data.educationAndEmployment_SchoolGrade.value,
      employed: data.educationAndEmployment_Employed.value,
      typeOfEmployment: data.educationAndEmployment_TypeOfEmployment.value,
      desiredProfession: data.educationAndEmployment_DesiredProfession.value,
    };
    dispatch(
      doPostEducationAndEmployment({ user: newEducationAndEmploymentData })
    ).then(
      () => {
        console.log("EducationAndEmployment data has been posted!");
        navigate("/cyfms/criminal_history");
      },
      (err) => {
        console.log("EducationAndEmployment data NOT posted!");
        console.log(err);
      }
    );
  };

  // Handles the form fields' value changes
  // and other activities.
  const changeHandler = (e: FormEvent) => {
    const data: any = e.currentTarget;
    console.log(data.educationAndEmployment_AttendingSchool.value);
    data.educationAndEmployment_AttendingSchool.value === "Yes"
      ? setDisabledSchoolFields(false)
      : setDisabledSchoolFields(true);
    data.educationAndEmployment_TypeOfEmployment.value === "Job Search"
      ? setDisabledDesiredProfession(false)
      : setDisabledDesiredProfession(true);
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
                    id="educationAndEmployment_AttendingSchool"
                    value="Attending School?"
                    optionsList={["No", "Yes"]}
                  />
                </Box>
                <Box sx={{ flexBasis: 0, flexGrow: 1 }}></Box>
              </Box>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
                <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
                  <CYFMSInput
                    disabled={disabledSchoolFields}
                    id="educationAndEmployment_SchoolName"
                    value="School"
                  />
                </Box>
                <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
                  <CYFMSInput
                    disabled={disabledSchoolFields}
                    id="educationAndEmployment_SchoolGrade"
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
                    id="educationAndEmployment_Employed"
                    value="Employed?"
                    optionsList={["No", "Yes"]}
                  />
                </Box>
                <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
                  <CYFMSDropdown
                    id="educationAndEmployment_TypeOfEmployment"
                    value="Type of Employment"
                    optionsList={[
                      "Part-time",
                      "Full-time",
                      "Casual",
                      "Job Search",
                    ]}
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
                <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
                  <CYFMSInput
                    disabled={disabledDesiredProfession}
                    id="educationAndEmployment_DesiredProfession"
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

export default CYFMSEducationAndEmployment;
