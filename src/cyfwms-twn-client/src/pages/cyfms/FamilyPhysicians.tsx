import {
  CYFSWMSAddButton,
  CYFSWMSNextButton,
} from "../../components/CYFSWMSButtons";
import CYFMSLayout from "../../components/cyfms/CYFMSLayout";
import FamilyPhysiciansRecordList from "../../components/cyfms/records/FamilyPhysiciansRecordList";
import {
  addMoreRecord,
  doGet,
  doPost,
} from "../../features/cyfms/familyPhysicians/slice";
import { onKeyDown } from "../../library/app";
import { useAppDispatch, useAppSelector } from "../../library/hooks";
import { Box } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import type { Data, Record } from "../../features/cyfms/familyPhysicians/slice";
import type { FormEvent, ReactElement, Ref } from "react";

/**
 * The FamilyPhysicians functional component.
 * @returns FamilyPhysicians component skeleton.
 */
const FamilyPhysicians = (): ReactElement => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const participantID = useAppSelector(
    (state) => state.cyfmsRegister.data.participantId
  );
  const recordsList = useAppSelector(
    (state) => state.cyfmsFamilyPhysicians.data.recordsList
  );

  // Reference to the form
  const formRef: Ref<HTMLFormElement> = useRef(null);

  useEffect(() => {
    dispatch(doGet(participantID))
      .unwrap()
      .then((data) => {
        console.log("FamilyPhysicians GET backend API was successful!");
      })
      .catch((err) => {
        console.log("FamilyPhysicians GET backend API didn't work!");
        console.log(err);
      });
  }, []);

  // Handles the form data submission and other
  // activities.
  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    const form: any = e.currentTarget;
    const formData: Data = {
      recordsList: new Array<Record>(recordsList.length),
    };
    for (let index = 0; index < recordsList.length; ++index) {
      formData.recordsList[index] = {
        participantId: participantID,
        familyPhysicianId: recordsList[index].familyPhysicianId,
        name: form[`record_${index + 1}_Name`].value,
        phone: form[`record_${index + 1}_Phone`].value,
        cell: form[`record_${index + 1}_Cell`].value,
        listOfMedication: form[`record_${index + 1}_ListOfMedication`].value,
      };
    }
    dispatch(doPost(formData))
      .unwrap()
      .then((data) => {
        console.log("FamilyPhysicians POST backend API was successful!");
        navigate("../counselors");
      })
      .catch((err) => {
        console.log("FamilyPhysicians POST backend API didn't work!");
        console.log(err);
      });
  };

  const addMoreHandler = (e: MouseEvent) => {
    e.preventDefault();
    const form: any = formRef.current;
    const flag: boolean = recordsList.length > 0;
    dispatch(
      addMoreRecord({
        participantId: participantID,
        familyPhysicianId: flag
          ? recordsList[recordsList.length - 1].familyPhysicianId
          : 0,
        name: flag ? form[`record_${recordsList.length}_Name`].value : "",
        phone: flag ? form[`record_${recordsList.length}_Phone`].value : "",
        cell: flag ? form[`record_${recordsList.length}_Cell`].value : "",
        listOfMedication: flag
          ? form[`record_${recordsList.length}_ListOfMedication`].value
          : "",
      })
    );
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
        ref={formRef}
        onKeyDown={onKeyDown}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem 0" }}>
          {FamilyPhysiciansRecordList(recordsList)}
        </Box>
        <Box>
          <CYFSWMSAddButton onClick={addMoreHandler} />
        </Box>
        <Box sx={{ display: "flex", gap: "0 1rem", justifyContent: "right" }}>
          <CYFSWMSNextButton />
        </Box>
      </Box>
    </CYFMSLayout>
  );
};

export default FamilyPhysicians;
