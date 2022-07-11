import {
  CYFSWMSAddButton,
  CYFSWMSNextButton,
} from "../../components/CYFSWMSButtons";
import CYFMSLayout from "../../components/cyfms/CYFMSLayout";
import CYFMSHouseholdAndMembersRecordList from "../../components/cyfms/records/CYFMSFamilyPhysiciansRecordList";
import {
  doGetFamilyPhysicians,
  doPostFamilyPhysicians,
} from "../../features/cyfms/familyPhysicians/familyPhysiciansSlice";
import { useAppDispatch, useAppSelector } from "../../library/hooks";
import { Box } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import type { FormEvent, ReactElement } from "react";

/**
 * The CYFMSFamilyPhysicians functional component.
 * @returns CYFMSFamilyPhysicians component skeleton.
 */
const CYFMSFamilyPhysicians = (): ReactElement => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const participantId = useAppSelector(
    (state) => (state as any).cyfmsRegister.user.participantId
  );

  // State for the records list
  const [recordList, setRecordList] = useState([
    {
      participantId: participantId,
      familyPhysicianId: 0,
      name: "",
      phone: "",
      cell: "",
      listOfMedication: "",
    },
  ]);

  // Reference to the form
  const formRef = useRef(null);

  useEffect(() => {
    dispatch(doGetFamilyPhysicians(participantId))
      .unwrap()
      .then((recordListFromAPI) => {
        setRecordList(recordListFromAPI);
      })
      .catch((err) => {
        console.log("familyPhysicians backend API didn't work");
        console.log(err);
      });
  }, []);

  // Handles the form data submission and other
  // activities.
  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    dispatch(doPostFamilyPhysicians({ recordList: recordList }))
      .unwrap()
      .then(() => {
        console.log("FamilyPhysicians data has been posted!");
        navigate("/cyfms/cyfms_worker");
      })
      .catch((err) => {
        console.log("FamilyPhysicians data NOT posted!");
        console.log(err);
      });
  };

  const addMoreHandler = (e: MouseEvent) => {
    e.preventDefault();
    if (recordList.length >= 1) {
      setRecordList((previousList: any) => [
        ...previousList,
        {
          participantId: participantId,
          familyPhysicianId: 0,
          name: (formRef.current as any)[`familyPhysicians_record_${1}_Name`]
            .value,
          phone: (formRef.current as any)[`familyPhysicians_record_${1}_Phone`]
            .value,
          cell: (formRef.current as any)[`familyPhysicians_record_${1}_Cell`]
            .value,
          listOfMedication: (formRef.current as any)[
            `familyPhysicians_record_${1}_ListOfMedication`
          ].value,
        },
      ]);
    } else {
      setRecordList((previousRecordList) => [
        ...previousRecordList,
        {
          participantId: participantId,
          familyPhysicianId: 0,
          name: "",
          phone: "",
          cell: "",
          listOfMedication: "",
        },
      ]);
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
        ref={formRef}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem 0" }}>
          {CYFMSHouseholdAndMembersRecordList(recordList)}
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
