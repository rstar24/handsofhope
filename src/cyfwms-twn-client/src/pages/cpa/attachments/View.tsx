import { CYFSWMSNextButton } from "../../../components/CYFSWMSButtons";
import EditIcon from "../../../components/cpa/attachments/EditIcon";
import CPALayout from "../../../components/cpa/CPALayout";
import Input from "../../../components/Input";
import { selected } from "../../../contexts/cpa/attachments";
import { useAppSelector } from "../../../library/hooks";
import { Box } from "@mui/material";
import React from "react";
import type { ReactElement } from "react";

/**
 * Form to view document information selected from attachments.
 */
const View = (): ReactElement => {
  const attachment = useAppSelector(
    (state) => state.cpaAttachments.data[selected.value]
  );

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
        <Box sx={{ display: "flex", justifyContent: "right" }}>
          <CYFSWMSNextButton disabled={true} />
        </Box>
      </Box>
    </CPALayout>
  );
};

export default View;
