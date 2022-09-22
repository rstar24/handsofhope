import EditIcon from "../../../components/cpa/attachments/EditIcon";
import CPALayout from "../../../components/cpa/CPALayout";
import Input from "../../../components/Input";
import { selected } from "../../../contexts/cpa/attachments";
import { doGetOne } from "../../../features/cpa/attachments/slice";
import { useAppDispatch, useAppSelector } from "../../../library/hooks";
import { Box, Button, Link } from "@mui/material";
import React, { useEffect, useState } from "react";
import type { ReactElement } from "react";

/**
 * Form to view document information selected from attachments.
 */
const View = (): ReactElement => {
  const dispatch = useAppDispatch();
  const attachment = useAppSelector(
    (state) => state.cpaAttachments.data[selected.value]
  );
  const [actualAttachment, setActualAttachment] = useState<any>({
    file: "",
    imageType: "",
    culturalimagename: "",
  });

  /** Download the attachment */
  useEffect(() => {
    dispatch(doGetOne(attachment.culturalProgImageId))
      .unwrap()
      .then((data) => {
        setActualAttachment(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [attachment.culturalProgImageId]);

  return (
    <CPALayout>
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
              {actualAttachment.culturalimagename}
            </Link>
          </Box>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}></Box>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            Preview{" "}
            {actualAttachment.imageType.match(/image\/.*/)
              ? ""
              : "(not available)"}
          </Box>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}></Box>
        </Box>
        <Box
          component="embed"
          sx={{ display: "flex", height: "500px" }}
          src={`data:${actualAttachment.imageType};base64,${actualAttachment.file}`}
        />
      </Box>
    </CPALayout>
  );
};

export default View;
