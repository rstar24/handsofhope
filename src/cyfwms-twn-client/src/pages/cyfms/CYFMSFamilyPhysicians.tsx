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
  const formRef: Ref<HTMLFormElement> = useRef(null);

  useEffect(() => {
    dispatch(doGetFamilyPhysicians(participantId))
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
    const form: any = e.currentTarget;
    const formData: cyfmsFamilyPhysiciansData = {
      recordsList: new Array<cyfmsFamilyPhysiciansRecord>(recordsList.length),
    };
    for (let index = 0; index < recordsList.length; ++index) {
      formData.recordsList[index] = {
        participantId: participantId,
        familyPhysicianId: recordsList[index].familyPhysicianId,
        name: form[`familyPhysicians_record_${index + 1}_Name`].value,
        phone: form[`familyPhysicians_record_${index + 1}_Phone`].value,
        cell: form[`familyPhysicians_record_${index + 1}_Cell`].value,
        listOfMedication:
          form[`familyPhysicians_record_${index + 1}_ListOfMedication`].value,
      };
    }
    dispatch(doPostFamilyPhysicians(formData.recordsList))
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
    const form: any = formRef.current;
    const flag: boolean = recordsList.length > 0;
    dispatch(
      addMoreFamilyPhysiciansRecord({
        participantId: participantId,
        familyPhysicianId: flag
          ? recordsList[recordsList.length - 1].familyPhysicianId
          : 0,
        name: flag
          ? form[`familyPhysicians_record_${recordsList.length}_Name`].value
          : "",
        phone: flag
          ? form[`familyPhysicians_record_${recordsList.length}_Phone`].value
          : "",
        cell: flag
          ? form[`familyPhysicians_record_${recordsList.length}_Cell`].value
          : "",
        listOfMedication: flag
          ? form[
              `familyPhysicians_record_${recordsList.length}_ListOfMedication`
            ].value
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
