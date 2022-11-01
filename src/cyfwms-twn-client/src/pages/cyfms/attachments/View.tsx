import EditIcon from "../../../components/cyfms/attachments/EditIcon";
import CyfmsLayout from "../../../components/cyfms/CYFMSLayout";
import Input from "../../../components/Input";
import SelectionContext from "../../../contexts/SelectionContext";
import { doGetOne } from "../../../features/cyfms/attachments/slice";
import { useAppDispatch, useAppSelector } from "../../../library/hooks";
import { Box, Link } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import type { FC } from "react";

/**
 * `CYFMS` aka `Child, Youth, and Family Management Services` module.
 * Sub page: `Attachments`.
 * Sub sub page: `View`.
 * Form to view document information selected from attachments.
 * @returns `ReactElement`
 */
const View: FC = () => {
  const selection = useContext(SelectionContext);
  const dispatch = useAppDispatch();
  const attachment = useAppSelector(
    (state) => state.cyfmsAttachments.data[selection.selected]
  );
  const [actualAttachment, setActualAttachment] = useState<any>({
    cgImagefile: "",
    imageType: "",
    cgImageName: "",
  });

  /** Download the attachment */
  useEffect(() => {
    dispatch(doGetOne(attachment.participantAttachmentId))
      .unwrap()
      .then((data) => {
        setActualAttachment(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [attachment.participantAttachmentId]);

  return (
    <CyfmsLayout>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem 0",
        }}
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
              autofill={attachment.name}
              disabled={true}
            />
          </Box>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <Input
              id="attachmentType"
              value="Type"
              autofill={attachment.type}
              disabled={true}
            />
          </Box>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            Download file:{" "}
            <Link
              download={true}
              href={`data:${actualAttachment.imageType};base64,${actualAttachment.file}`}
              rel="noreferrer noopener"
            >
              {actualAttachment.cgImageName}
            </Link>
          </Box>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}></Box>
        </Box>
        <Box />
      </Box>
    </CyfmsLayout>
  );
};

export default View;
