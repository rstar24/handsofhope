import {
  CYFSWMSAddButton,
  CYFSWMSNextButton,
} from "../../components/CYFSWMSButtons";
import CYFMSLayout from "../../components/cyfms/CYFMSLayout";
import CYFMSHouseholdAndMembersRecordList from "../../components/cyfms/records/CYFMSFamilyPhysiciansRecordList";
import {
  addMoreFamilyPhysiciansRecord,
  doGetFamilyPhysicians,
  doPostFamilyPhysicians,
} from "../../features/cyfms/familyPhysicians/cyfmsFamilyPhysiciansSlice";
import { useAppDispatch, useAppSelector } from "../../library/hooks";
import { Box } from "@mui/material";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import type {
  cyfmsFamilyPhysiciansData,
  cyfmsFamilyPhysiciansRecord,
} from "../../features/cyfms/familyPhysicians/cyfmsFamilyPhysiciansSlice";
import type { FormEvent, ReactElement, Ref } from "react";

/**
 * The CYFMSFamilyPhysicians functional component.
 * @returns CYFMSFamilyPhysicians component skeleton.
 */
const CYFMSFamilyPhysicians = (): ReactElement => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const participantId = useAppSelector(
    (state: any) => state.cyfmsRegister.user.participantId
  );
  const recordsList = useAppSelector(
    (state: any) => state.cyfmsFamilyPhysicians.familyPhysiciansData.recordsList
  );

  // Reference to the form
  const cyfmsFamilyPhysiciansFormRef: Ref<HTMLFormElement> = useRef(null);

  useEffect(() => {
    dispatch(doGetFamilyPhysicians(null))
      .unwrap()
      .then((recordListFromAPI) => {
        console.log("familyPhysicians GET backend API was successful!");
      })
      .catch((err) => {
        console.log("familyPhysicians GET backend API didn't work!");
        console.log(err);
      });
  }, []);

  // Handles the form data submission and other
  // activities.
  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    const cyfmsFamilyPhysiciansForm: any = e.currentTarget;
    const cyfmsFamilyPhysiciansFormData: cyfmsFamilyPhysiciansData = {
      recordsList: new Array<cyfmsFamilyPhysiciansRecord>(recordsList.length),
    };
    for (let index = 0; index < recordsList.length; ++index) {
      cyfmsFamilyPhysiciansFormData.recordsList[index] = {
        participantId: participantId,
        familyPhysicianId: recordsList[index].familyPhysicianId,
        name: cyfmsFamilyPhysiciansForm[
          `familyPhysicians_record_${index + 1}_Name`
        ].value,
        phone:
          cyfmsFamilyPhysiciansForm[
            `familyPhysicians_record_${index + 1}_Phone`
          ].value,
        cell: cyfmsFamilyPhysiciansForm[
          `familyPhysicians_record_${index + 1}_Cell`
        ].value,
        listOfMedication:
          cyfmsFamilyPhysiciansForm[
            `familyPhysicians_record_${index + 1}_ListOfMedication`
          ].value,
      };
    }
    dispatch(doPostFamilyPhysicians(cyfmsFamilyPhysiciansFormData.recordsList))
      .unwrap()
      .then(() => {
        console.log("familyPhysicians POST backend API was successful!");
        navigate("/cyfms/counselors");
      })
      .catch((err) => {
        console.log("familyPhysicians POST backend API didn't work!");
        console.log(err);
      });
  };

  const addMoreHandler = (e: MouseEvent) => {
    e.preventDefault();
    const cyfmsFamilyPhysiciansForm = cyfmsFamilyPhysiciansFormRef.current;
    dispatch(
      addMoreFamilyPhysiciansRecord({
        participantId: participantId,
        familyPhysicianId:
          recordsList[recordsList.length - 1].familyPhysicianId,
        name: (cyfmsFamilyPhysiciansForm as any)[
          `familyPhysicians_record_${recordsList.length}_Name`
        ].value,
        phone: (cyfmsFamilyPhysiciansForm as any)[
          `familyPhysicians_record_${recordsList.length}_Phone`
        ].value,
        cell: (cyfmsFamilyPhysiciansForm as any)[
          `familyPhysicians_record_${recordsList.length}_Cell`
        ].value,
        listOfMedication: (cyfmsFamilyPhysiciansForm as any)[
          `familyPhysicians_record_${recordsList.length}_ListOfMedication`
        ].value,
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
        ref={cyfmsFamilyPhysiciansFormRef}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem 0" }}>
          {CYFMSHouseholdAndMembersRecordList(recordsList)}
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

export default CYFMSFamilyPhysicians;
