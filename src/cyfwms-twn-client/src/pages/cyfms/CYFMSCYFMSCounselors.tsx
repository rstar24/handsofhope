import CYFMSLayout from "../../components/cyfms/CYFMSLayout";
import {
  doGetCYFMSCounselors,
  doPostCYFMSCounselors,
} from "../../features/cyfms/cyfmsCounselors/cyfmsCounselorsSlice";
import { useAppDispatch, useAppSelector } from "../../library/hooks";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { FormEvent, ReactElement, useEffect, useState } from "react";
import {
  CYFSWMSAddButton,
  CYFSWMSNextButton,
} from "../../components/CYFSWMSButtons";
import CYFMSCYFMSCounselorsRecordList from "../../components/cyfms/records/CYFMSCounselorsRecordList";

/**
 * The CYFMSWorker functional component.
 * @returns CYFMSWorker component skeleton.
 */
const CYFMSWorker = (): ReactElement => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const participantId = useAppSelector(
    (state) => (state as any).cyfmsRegister.user.participantId
  );
  const data = useAppSelector((state) => (state as any).cyfmsCounselors.user);
  console.log("worker", data);
  useEffect(() => {
    dispatch(doGetCYFMSCounselors(participantId));
  }, []);

  // State for the records list
  const [recordList, setRecordList] = useState([{}]);

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
    dispatch(doPostCYFMSCounselors({ user: newContact })).then(() => {
      navigate("/cyfms/other_information");
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
          {CYFMSCYFMSCounselorsRecordList(recordList)}
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

export default CYFMSWorker;
