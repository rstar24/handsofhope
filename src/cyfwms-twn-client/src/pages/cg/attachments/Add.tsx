import { CYFSWMSNextButton } from "../../../components/CYFSWMSButtons";
import CgLayout from "../../../components/cg/CgLayout";
import Input from "../../../components/Input";
import { doPost } from "../../../features/cg/attachments/slice";
import { onKeyDown } from "../../../library/app";
import { useAppDispatch, useAppSelector } from "../../../library/hooks";
import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { ChangeEventHandler, FC, FormEventHandler } from "react";

/**
 * `CG` aka `Caregivers` module.
 * Sub page: `Attachments`.
 * Sub sub page: `Add`.
 * Form to submit/add one more document to attachments.
 * @returns `ReactElement`
 */
const Add: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const cgCareProviderId = useAppSelector(
    (state) => state.cgCareProvider.getData.id
  );
  const [fileName, setFileName] = useState<string>("");

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setFileName(e.currentTarget.value.replace(/^.*[\\/]/, ""));
  };

  const submitHandler: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const attachment = new FormData();
    attachment.append(
      "cgDto",
      JSON.stringify({
        id: cgCareProviderId,
        cgImageId: 0,
        name: e.currentTarget.attachmentName.value,
        type: e.currentTarget.attachmentType.value,
      })
    );
    attachment.append("file", e.currentTarget.attachment.files[0]);
    dispatch(doPost(attachment))
      .unwrap()
      .then((data) => {
        navigate("../attachments");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <CgLayout>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem 0",
        }}
        onSubmit={submitHandler}
        onKeyDown={onKeyDown}
      >
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <Input id="attachmentName" value="Name" />
          </Box>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <Input id="attachmentType" value="Type" />
          </Box>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <Box
              sx={{
                display: "flex",
                gap: "0 1rem",
                alignItems: "center",
              }}
            >
              <Button variant="contained" component="label">
                Upload
                <input
                  hidden
                  name="attachment"
                  type="file"
                  onChange={handleChange}
                />
              </Button>
              {fileName}
            </Box>
          </Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "right" }}>
          <CYFSWMSNextButton />
        </Box>
      </Box>
    </CgLayout>
  );
};

export default Add;
