import EditIcon from "../../../components/cpa/attachments/EditIcon";

import Input from "../../../components/Input";
import { selected } from "../../../contexts/cpa/attachments";
import { doGetOne } from "../../../features/cpa/attachments/slice";
import { useAppDispatch, useAppSelector } from "../../../library/hooks";
import { Box, Link } from "@mui/material";
import React, { useEffect, useState } from "react";
import type { ReactElement } from "react";
import CgLayout from "../../../components/cg/CgLayout";

/**
 * Form to view document information selected from attachments.
 */
const View = (): ReactElement => {
  const dispatch = useAppDispatch();
  //   const attachment = useAppSelector(
  //     (state) => state.cpaAttachments.data[selected.value]
  //   );
  const [actualAttachment, setActualAttachment] = useState<any>({
    file: "",
    imageType: "",
    culturalimagename: "",
  });

  /** Download the attachment */
  //   useEffect(() => {
  //     dispatch(doGetOne(attachment.culturalProgImageId))
  //       .unwrap()
  //       .then((data) => {
  //         setActualAttachment(data);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }, [attachment.culturalProgImageId]);

  return (
    <CgLayout>
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
              //autofill={attachment.name}
              disabled={true}
            />
          </Box>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <Input
              id="attachmentType"
              value="Type"
              //   autofill={attachment.type}
              disabled={true}
            />
          </Box>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            Download file:{" "}
            <Link
              download={true}
              //href={`data:${actualAttachment.imageType};base64,${actualAttachment.file}`}
              rel="noreferrer noopener"
            >
              {/* {actualAttachment.culturalimagename} */}
            </Link>
          </Box>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}></Box>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>Preview </Box>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}></Box>
        </Box>
        <Box />
      </Box>
    </CgLayout>
  );
};

export default View;
