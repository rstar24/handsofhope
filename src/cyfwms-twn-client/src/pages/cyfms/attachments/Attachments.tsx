import AttachmentList from "../../../components/cyfms/attachments/AttachmentList";
import CyfmsLayout from "../../../components/cyfms/CYFMSLayout";
import { doGet } from "../../../features/cyfms/attachments/slice";
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
import type { FC } from "react";

/**
 * `CYFMS` aka `Child, Youth, and Family Management Services` module.
 * Sub page: `Attachments`.
 * @returns `ReactElement`
 */
const Attachments: FC = () => {
  const dispatch = useAppDispatch();
  const participantId = useAppSelector(
    (state) => state.cyfmsRegister.data.participantId
  );
  const state = useAppSelector((state) => state.cyfmsAttachments);

  useEffect(() => {
    dispatch(doGet(participantId))
      .unwrap()
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <CyfmsLayout>
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
              <Table
                sx={{
                  "th, td": { width: "33%", textAlign: "center", p: "0.25rem" },
                }}
              >
                <TableHead
                  sx={{
                    th: {
                      backgroundColor: (theme) => theme.palette.primary.main,
                      color: "white",
                    },
                  }}
                >
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell>Document</TableCell>
                    <TableCell>Type</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody sx={{ td: { backgroundColor: grey["400"] } }}>
                  <AttachmentList list={state.data} />
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Box>
    </CyfmsLayout>
  );
};

export default Attachments;
