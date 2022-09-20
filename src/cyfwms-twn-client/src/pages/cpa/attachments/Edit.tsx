import { CYFSWMSNextButton } from "../../../components/CYFSWMSButtons";
import EditIcon from "../../../components/cpa/attachments/EditIcon";
import CPALayout from "../../../components/cpa/CPALayout";
import Input from "../../../components/Input";
import { selected } from "../../../contexts/cpa/attachments";
import { doPost } from "../../../features/cpa/attachments/slice";
import { onKeyDown } from "../../../library/app";
import { useAppDispatch, useAppSelector } from "../../../library/hooks";
import { Box } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import type { FormEventHandler, ReactElement } from "react";

/**
 * Form to edit document information selected from attachments.
 */
const Edit = (): ReactElement => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const cpaId = useAppSelector((state) => state.cpa.data.culturalProgramId);
  const data = useAppSelector((state) => state.cpaAttachments.data);

  const submitHandler: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const attachment = new FormData();
    attachment.append(
      "culturalDto",
      JSON.stringify({
        culturalProgramId: cpaId,
        culturalProgImageId: data[selected.value].culturalProgImageId,
        name: e.currentTarget.attachmentName.value,
        type: e.currentTarget.attachmentType.value,
      })
    );
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
    <CPALayout>
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <EditIcon />
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <Input
              id="attachmentName"
              value="Name"
              autofill={data[selected.value].name}
            />
          </Box>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <Input
              id="attachmentType"
              value="Type"
              autofill={data[selected.value].type}
            />
          </Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "right" }}>
          <CYFSWMSNextButton />
        </Box>
      </Box>
    </CPALayout>
  );
};

export default Edit;
