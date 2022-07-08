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
import { useEffect, useState } from "react";
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
  const data = useAppSelector((state) => (state as any).familyPhysicians.user);
  console.log("family", data);

  // State for the records list
  const [recordList, setRecordList] = useState([{}]);

  useEffect(() => {
    dispatch(doGetFamilyPhysicians(participantId));
  }, []);

  const [contact, setContact] = useState([{}]);
  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    const data: any = e.currentTarget;
    const newContact = [
      {
        participantId: participantId,
        familyPhysicianId: 0,
        name: data.name.value,
        phone: data.phone.value,
        cell: data.cell.value,
        listOfMedication: data.medicationInfo.value,
      },
    ];
    setContact(newContact);
    dispatch(doPostFamilyPhysicians({ user: newContact })).then(() => {
      navigate("/cyfms/cyfms_worker");
    });
  };

  const addMoreHandler = (e: MouseEvent) => {
    e.preventDefault();
    setRecordList((previousRecordList) => [...previousRecordList, {}]);
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
