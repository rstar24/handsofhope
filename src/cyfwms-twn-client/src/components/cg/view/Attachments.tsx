import {  useAppSelector } from "../../../library/hooks";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import { ReactElement } from "react";
import { AttachmentsLabels } from "../../../library/labels/careGivers";

const Attachments = (): ReactElement => {
  const recordsList = useAppSelector((state) => state.cgAttachments.data);
  if (recordsList.length === 0) {
    if (true) {
      return <></>;
    }
  }

  return (
    <>
      {Object.entries(recordsList).map((t: any, index: number) => (
        <>
          <Typography sx={{ px: "1rem", fontWeight: "bold" }}>
            Record : {index + 1}
          </Typography>

          <TableContainer
            sx={{ display: "flex", justifyContent: "center", p: "1rem" }}
          >
            <Table sx={{ maxWidth: 900 }} aria-label="Participant">
              <TableBody
                sx={{ "& > tr > td": { border: 0, p: 0, paddingLeft: 5 } }}
              >
                {Object.entries(recordsList[index]).map((t: any, k: any) => {
                  if (k!==2){
                    return (
                      <TableRow key={Math.random() * 1000}>
                        <TableCell
                          sx={{
                            display: "flex",
                            width: "50%",
                            alignContent: "start",
                            fontWeight: "bold",
                            fontSize: "1rem",
                          }}
                        >
                          {AttachmentsLabels[k]}
                        </TableCell>
                        <TableCell width="50%">
                            <Typography
                              component="p"
                              sx={{ whiteSpace: "pre-wrap" }}
                            >
                              {t[1]}
                            </Typography>
                        </TableCell>
                      </TableRow>
                    );
                  }
                  return <></>;
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ))}
    </>
  );
};

export default Attachments;
