import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { ChangeEventHandler, FormEventHandler, ReactElement } from "react";
import CPALayout from "../../../components/cpa/CPALayout";
import Input from "../../../components/Input";
import { CYFSWMSNextButton } from "../../../components/CYFSWMSButtons";
import AuthLayout from "../../../components/auth/layout/AuthLayout";

/**
 * Form to submit/add one more document to attachments.
 */
const Add = (): ReactElement => {
  const navigate = useNavigate();

  const [fileName, setFileName] = useState<string>("");

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setFileName(e.currentTarget.value.replace(/^.*[\\/]/, ""));
  };

  return (
    <AuthLayout>
      <CPALayout>
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem 0",
          }}
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
      </CPALayout>
    </AuthLayout>
  );
};

export default Add;
