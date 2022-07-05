import CYFMSDropdown from "../../components/cyfms/CYFMSDropdown";
import CYFMSInput from "../../components/cyfms/CYFMSInput";
import CYFMSLayout from "../../components/cyfms/CYFMSLayout";
import { Box, Button, Grid, Typography } from "@mui/material";
import { FormEvent, ReactElement, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../library/hooks";
import { doGetWorker, doPostWorker } from "../../features/worker/workerSlice";
import CYFMSLongInput from "../../components/cyfms/CYFMSLongInput";
import { Link, useNavigate } from "react-router-dom";

/**
 * The CYFMSWorker functional component.
 * @returns CYFMSWorker component skeleton.
 */
const CYFMSWorker = (): ReactElement => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const participantId = useAppSelector(
    (state) => (state as any).registration.user.participantId
  );
  const data = useAppSelector((state) => (state as any).worker.user);
  console.log("worker", data);
  useEffect(() => {
    dispatch(doGetWorker(participantId));
  }, []);

  const [contact, setContact] = useState([
    {
      participantId: participantId,
      counselorCFSWorkerId: 0,
      role: "",
      name: "",
      contactInformation: "",
    },
  ]);
  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    const data: any = e.currentTarget;
    console.log("worker data ", data.cyfmsWorkerName.value);
    const newContact = [
      {
        participantId: participantId,
        counselorCFSWorkerId: 0,
        role: data.role.value,
        name: data.cyfmsWorkerName.value,
        contactInformation: data.cyfmsWorkerContactInfo.value,
      },
    ];
    setContact(newContact);
    dispatch(doPostWorker({ user: newContact })).then(() => {
      navigate("/cyfms/other_information");
    });
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
        <Typography sx={{ color: "blue" }}>Record 1</Typography>
        <Grid container sm={12} spacing={2}>
          <Grid item sm={5}>
            <CYFMSDropdown id="role" value="Role" />
          </Grid>
          <Grid item sm={5}></Grid>
          <Grid item sm={5}>
            <CYFMSInput id="cyfmsWorkerName" value="Name" />
          </Grid>
          <Grid item sm={5}></Grid>
          <Grid item sm={8.7}>
            <CYFMSLongInput
              id="cyfmsWorkerContactInfo"
              value="Contact Information"
              multiline={true}
            />
          </Grid>

          <Grid item sm={2.2}></Grid>
          <Grid item sm={2.1}></Grid>
          <Grid item sm={5}>
            <Button variant="contained">Add More</Button>
          </Grid>
        </Grid>
        <Grid item sm={7}></Grid>
        <Grid item sm={4}>
          <Button
            variant="contained"
            type="submit"
            component={Link}
            to="/cyfms/other_information"
          >
            Next
          </Button>
        </Grid>
      </Box>
    </CYFMSLayout>
  );
};

export default CYFMSWorker;
