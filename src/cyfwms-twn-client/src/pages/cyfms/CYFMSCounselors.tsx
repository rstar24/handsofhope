import {
  CYFSWMSAddButton,
  CYFSWMSNextButton,
} from "../../components/CYFSWMSButtons";
import CYFMSLayout from "../../components/cyfms/CYFMSLayout";
import CYFMSCounselorsRecordList from "../../components/cyfms/records/CYFMSCounselorsRecordList";
import {
  addMoreCounselorsRecord,
  doGetCounselors,
  doPostCounselors,
} from "../../features/cyfms/counselors/cyfmsCounselorsSlice";
import { useAppDispatch, useAppSelector } from "../../library/hooks";
import { Box } from "@mui/material";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import type {
  cyfmsCounselorsData,
  cyfmsCounselorsRecord,
} from "../../features/cyfms/counselors/cyfmsCounselorsSlice";
import type { FormEvent, ReactElement, Ref } from "react";

/**
 * The CYFMSCounselors functional component.
 * @returns CYFMSCounselors component skeleton.
 */
const CYFMSCounselors = (): ReactElement => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const participantId = useAppSelector(
    (state) => (state as any).cyfmsRegister.user.participantId
  );
  const recordsList = useAppSelector(
    (state: any) => state.cyfmsCounselors.counselorsData.recordsList
  );

  // Reference to the form
  const formRef: Ref<HTMLFormElement> = useRef(null);

  useEffect(() => {
    dispatch(doGetCounselors(null))
      .unwrap()
      .then((recordListFromAPI) => {
        console.log("counselors GET backend API was successful!");
      })
      .catch((err) => {
        console.log("counselors GET backend API didn't work!");
        console.log(err);
      });
  }, []);

  // Handles the form data submission and other
  // activities.
  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    const form: any = e.currentTarget;
    const formData: cyfmsCounselorsData = {
      recordsList: new Array<cyfmsCounselorsRecord>(recordsList.length),
    };
    for (let index = 0; index < recordsList.length; ++index) {
      formData.recordsList[index] = {
        participantId: participantId,
        counselorCFSWorkerId: recordsList[index].counselorCFSWorkerId,
        role: form[`counselors_record_${index + 1}_Role`].value,
        name: form[`counselors_record_${index + 1}_Name`].value,
        contactInformation:
          form[`counselors_record_${index + 1}_ContactInformation`].value,
      };
    }
    dispatch(doPostCounselors(formData.recordsList))
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
    const form: any = formRef.current;
    const flag: boolean = recordsList.length > 0;
    dispatch(
      addMoreCounselorsRecord({
        participantId: participantId,
        counselorCFSWorkerId: flag
          ? recordsList[recordsList.length - 1].counselorCFSWorkerId
          : 0,
        role: flag
          ? form[`counselors_record_${recordsList.length}_Role`].value
          : "",
        name: flag
          ? form[`counselors_record_${recordsList.length}_Name`].value
          : "",
        contactInformation: flag
          ? form[`counselors_record_${recordsList.length}_ContactInformation`]
              .value
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
          {CYFMSCounselorsRecordList(recordsList)}
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

export default CYFMSCounselors;
