import { Box, Button, Grid, Typography } from "@mui/material";
import CYFMSInput from "../../components/cyfms/CYFMSInput";
import CYFMSLayout from "../../components/cyfms/CYFMSLayout";
import { FormEvent, ReactElement, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../library/hooks";
import { doGetHouseHold } from "../../features/householdMember/householdSlice";
import {
  doGetFamilyPhysicians,
  doPostFamilyPhysicians,
} from "../../features/familyPhysicians/familyPhysiciansSlice";
import { Link } from "react-router-dom";

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
        <Typography sx={{ color: "blue" }}>Family Physician:1</Typography>
        <Grid container sm={12} spacing={2}>
          <Grid item sm={5}>
            <CYFMSInput id="name" value="Name" />
          </Grid>
          <Grid item sm={5}>
            <CYFMSInput id="phone" value="Phone" />
          </Grid>
          <Grid item sm={5}>
            <CYFMSInput id="cell" value="Cell" />
          </Grid>
          <Grid item sm={5}></Grid>
          <Grid item sm={5}>
            <CYFMSInput id="medicationInfo" value="List Of Medication" />
          </Grid>
          <Grid item sm={5}></Grid>
          <Grid item sm={12}></Grid>
          <Grid item sm={2.4}></Grid>
          <Button variant="contained">Add More</Button>
        </Grid>
        <Grid container sm={12} spacing={2}>
          <Grid item sm={9}></Grid>
          <Grid item sm={2}>
            <Button
              variant="contained"
              type="submit"
              component={Link}
              to="/cyfms/cyfms_worker"
            >
              Next
            </Button>
          </Grid>
        </Grid>
      </Box>
    </CYFMSLayout>
  );
};

export default CYFMSFamilyPhysician;
