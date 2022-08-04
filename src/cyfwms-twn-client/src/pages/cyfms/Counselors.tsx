import {
  CYFSWMSAddButton,
  CYFSWMSNextButton,
} from "../../components/CYFSWMSButtons";
import CYFMSLayout from "../../components/cyfms/CYFMSLayout";
import CounselorsRecordList from "../../components/cyfms/records/CounselorsRecordList";
import {
  addMoreRecord,
  doGet,
  doPost,
} from "../../features/cyfms/counselors/slice";
import { useAppDispatch, useAppSelector } from "../../library/hooks";
import { Box } from "@mui/material";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import type { Data, Record } from "../../features/cyfms/counselors/slice";
import type { FormEvent, ReactElement, Ref } from "react";

/**
 * The Counselors functional component.
 * @returns Counselors component skeleton.
 */
const Counselors = (): ReactElement => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const participantID = useAppSelector(
    (state) => state.cyfmsRegister.data.participantId
  );
  const recordsList = useAppSelector(
    (state) => state.cyfmsCounselors.data.recordsList
  );

  // Reference to the form
  const formRef: Ref<HTMLFormElement> = useRef(null);

  useEffect(() => {
    dispatch(doGet(participantID))
      .unwrap()
      .then((data) => {
        console.log("Counselors GET backend API was successful!");
      })
      .catch((err) => {
        console.log("Counselors GET backend API didn't work!");
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
        counselorCFSWorkerId: recordsList[index].counselorCFSWorkerId,
        role: form[`record_${index + 1}_Role`].value,
        name: form[`record_${index + 1}_Name`].value,
        contactInformation:
          form[`record_${index + 1}_ContactInformation`].value,
      };
    }
    dispatch(doPost(formData))
      .unwrap()
      .then((data) => {
        console.log("Counselors POST backend API was successful!");
        navigate("../other_information");
      })
      .catch((err) => {
        console.log("Counselors POST backend API didn't work!");
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
        counselorCFSWorkerId: flag
          ? recordsList[recordsList.length - 1].counselorCFSWorkerId
          : 0,
        role: flag ? form[`record_${recordsList.length}_Role`].value : "",
        name: flag ? form[`record_${recordsList.length}_Name`].value : "",
        contactInformation: flag
          ? form[`record_${recordsList.length}_ContactInformation`].value
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
          {CounselorsRecordList(recordsList)}
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

export default Counselors;
