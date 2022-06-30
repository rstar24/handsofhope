import { Box, Button, Typography } from "@mui/material";
import CYFMSInput from "../../components/cyfms/CYFMSInput";
import CYFMSLayout from "../../components/cyfms/CYFMSLayout";
import { FormEvent, ReactElement, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../library/hooks";
import { doGetHouseHold } from "../../features/householdMember/householdSlice";
import {
  doGetFamilyPhysicians,
  doPostFamilyPhysicians,
} from "../../features/familyPhysicians/familyPhysiciansSlice";

/**
 * The CYFMSFamilyPhysician functional component.
 * @returns CYFMSFamilyPhysician component skeleton.
 */
const CYFMSFamilyPhysician = (): ReactElement => {
  const dispatch = useAppDispatch();
  const participantId = useAppSelector(
    (state) => (state as any).registration.user.participantId
  );
  const data = useAppSelector((state) => (state as any).familyPhysicians.user);
  console.log("family", data);
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
    dispatch(doPostFamilyPhysicians({ user: newContact }));
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
        <Typography>Family Physician:1</Typography>
        <CYFMSInput id="name" value="Name" />
        <CYFMSInput id="phone" value="Phone" />
        <CYFMSInput id="cell" value="Cell" />
        <CYFMSInput id="medicationInfo" value="List Of Medication" />
        <Button variant="contained">Add More</Button>
        <Button variant="contained" type="submit">
          Next
        </Button>
      </Box>
    </CYFMSLayout>
  );
};

export default CYFMSFamilyPhysician;
