import {
  CYFSWMSAddButton,
  CYFSWMSNextButton,
} from "../../components/CYFSWMSButtons";
import CYFMSLayout from "../../components/cyfms/CYFMSLayout";
import CYFMSCYFMSCounselorsRecordList from "../../components/cyfms/records/CYFMSCounselorsRecordList";
import {
  doGetCYFMSCounselors,
  doPostCYFMSCounselors,
} from "../../features/cyfms/cyfmsCounselors/cyfmsCounselorsSlice";
import { useAppDispatch, useAppSelector } from "../../library/hooks";
import { Box } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import type { FormEvent, ReactElement } from "react";

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

  // State for the records list
  const [recordList, setRecordList] = useState([
    {
      participantId: participantId,
      counselorCFSWorkerId: 0,
      role: "",
      name: "",
      contactInformation: "",
    },
  ]);

  // Reference to the form
  const formRef = useRef(null);

  useEffect(() => {
    dispatch(doGetCYFMSCounselors(participantId));
    dispatch(doGetCYFMSCounselors(participantId))
      .unwrap()
      .then((recordListFromAPI) => {
        setRecordList(recordListFromAPI);
      })
      .catch((err) => {
        console.log("cyfmsCounselors backend API didn't work");
        console.log(err);
      });
  }, []);

  // Handles the form data submission and other
  // activities.
  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    dispatch(doPostCYFMSCounselors({ recordList: recordList }))
      .unwrap()
      .then(() => {
        console.log("Counselors data has been posted!");
        navigate("/cyfms/other_information");
      })
      .catch((err) => {
        console.log("Counselors data NOT posted!");
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
          counselorCFSWorkerId: 0,
          role: (formRef.current as any)[`cyfmsCounselors_record_${1}_Role`]
            .value,
          name: (formRef.current as any)[`cyfmsCounselors_record_${1}_Name`]
            .value,
          contactInformation: (formRef.current as any)[
            `cyfmsCounselors_record_${1}_ContactInformation`
          ].value,
        },
      ]);
    } else {
      setRecordList((previousRecordList) => [
        ...previousRecordList,
        {
          participantId: participantId,
          counselorCFSWorkerId: 0,
          role: "",
          name: "",
          contactInformation: "",
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
