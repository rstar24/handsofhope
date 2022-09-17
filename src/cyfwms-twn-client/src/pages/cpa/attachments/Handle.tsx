import { CYFSWMSNextButton } from "../../../components/CYFSWMSButtons";
import EditIcon from "../../../components/cpa/attachments/EditIcon";
import CPALayout from "../../../components/cpa/CPALayout";
import Input from "../../../components/Input";
import { doPost } from "../../../features/cpa/attachments/slice";
import { onKeyDown } from "../../../library/app";
import { useAppDispatch, useAppSelector } from "../../../library/hooks";
import { Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type { ChangeEventHandler, FormEventHandler } from "react";

const AttachmentHandler = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const cpaId = useAppSelector((state) => state.cpa.data.culturalProgramId);
  const data: any = (location.state as any)?.data;
  const [mode, setMode] = useState<string>((location.state as any)?.mode);
  const [fileName, setFileName] = useState<string>("");

  // useEffect(() => {
  //   setMode();
  // }, [mode]);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setFileName(e.currentTarget.value.replace(/^.*[\\/]/, ""));
  };

  const submitHandler: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const attachment: any = {
      culturalDto: JSON.stringify({
        culturalProgramId: cpaId,
        culturalProgImageId: 0,
        name: e.currentTarget.attachmentName.value,
        type: e.currentTarget.attachmentType.value,
      }),
      file: e.currentTarget.attachment.value,
    };
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
        {mode === "view" && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <EditIcon data={data} />
          </Box>
        )}
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <Input
              id="attachmentName"
              value="Name"
              autofill={mode === "view" ? data.name : ""}
              disabled={mode === "view" ? true : false}
            />
          </Box>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <Input
              id="attachmentType"
              value="Type"
              autofill={mode === "view" ? data.type : ""}
              disabled={mode === "view" ? true : false}
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
              <Button
                variant="contained"
                component="label"
                disabled={mode === "view" || mode === "edit" ? true : false}
              >
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
          <CYFSWMSNextButton disabled={mode === "view" ? true : false} />
        </Box>
      </Box>
    </CPALayout>
  );
};

export default AttachmentHandler;
