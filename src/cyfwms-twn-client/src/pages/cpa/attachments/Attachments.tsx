import AttachmentList from "../../../components/cpa/attachments/AttachmentList";
import CPALayout from "../../../components/cpa/CPALayout";
import { doGet } from "../../../features/cpa/attachments/slice";
import { useAppDispatch, useAppSelector } from "../../../library/hooks";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import type { ReactElement } from "react";

const Attachments = (): ReactElement => {
  const dispatch = useAppDispatch();
  const cpaId = useAppSelector((state) => state.cpa.data.culturalProgramId);
  const state = useAppSelector((state) => state.cpaAttachments);

  useEffect(() => {
    dispatch(doGet(cpaId))
      .unwrap()
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <CPALayout>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem 0",
        }}
      >
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
          <Box
            sx={{
              flexBasis: 0,
              flexGrow: 2,
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button
              component={Link}
              to="../attachments/add"
              variant="contained"
            >
              Add New
            </Button>
          </Box>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <TableContainer>
              <Table>
                <TableHead
                  sx={{
                    "& > tr > th": {
                      backgroundColor: (theme) => theme.palette.primary.main,
                      color: "white",
                      p: "0.5rem",
                    },
                    "& > tr": { border: 0 },
                  }}
                >
                  <TableRow>
                    <TableCell>Action</TableCell>
                    <TableCell>Document</TableCell>
                    <TableCell>Type</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody
                  sx={{
                    "& > tr > td": {
                      backgroundColor: grey["400"],
                      p: "0.25rem",
                    },
                    "& > tr": { border: 0 },
                  }}
                >
                  <AttachmentList list={state.data} />
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Box>
    </CPALayout>
  );
};

export default Attachments;
