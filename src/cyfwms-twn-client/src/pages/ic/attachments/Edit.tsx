import { CYFSWMSNextButton } from "../../../components/CYFSWMSButtons";
import EditIcon from "../../../components/initialContact/attachments/EditIcon";
import IcLayout from "../../../components/initialContact/ICLayout";
import Input from "../../../components/Input";
import AttachmentsContext from "../../../contexts/AttachmentsContext";
import { doPost } from "../../../features/initialContact/attachments/slice";
import { onKeyDown } from "../../../library/app";
import { useAppDispatch, useAppSelector } from "../../../library/hooks";
import { Box, Button } from "@mui/material";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Record } from "../../../features/initialContact/attachments/slice";
import type { ChangeEventHandler, FC, FormEventHandler } from "react";

/**
 * `IC` aka `Initial Contact` module.
 * Sub page: `Attachments`.
 * Sub sub page: `Edit`.
 * Form to edit document information selected from attachments.
 * @returns `ReactElement`
 */
const Edit: FC = () => {
  const context = useContext(AttachmentsContext);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const fileDetailsId = useAppSelector(
    (state) => state.icFileDetails.getData.fileDetailsId
  );
  const data = useAppSelector((state) => state.icAttachments.data);
  const [fileName, setFileName] = useState<string>("");

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setFileName(e.currentTarget.value.replace(/^.*[\\/]/, ""));
  };

  const submitHandler: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const attachment = new FormData();
    attachment.append(
      "icDto",
      JSON.stringify({
        fileDetailsId: fileDetailsId,
        icAttachmentId: data[context.selected].icAttachmentId,
        name: e.currentTarget.attachmentName.value,
        type: e.currentTarget.attachmentType.value,
      } as Record)
    );
    if (e.currentTarget.attachment.files[0]) {
      attachment.append("file", e.currentTarget.attachment.files[0]);
    }
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
    <IcLayout>
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
              autofill={data[context.selected].name}
            />
          </Box>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <Input
              id="attachmentType"
              value="Type"
              autofill={data[context.selected].type}
            />
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
    </IcLayout>
  );
};

export default Edit;
