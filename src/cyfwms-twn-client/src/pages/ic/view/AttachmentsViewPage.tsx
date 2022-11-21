import { useAppSelector } from "../../../library/hooks";
import {
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import { Link as L } from "react-router-dom";
import type { FC } from "react";

/**
 * *IC* aka *Initial Contact* module. \
 * Sub page: *View* \
 * Sub sub page: `AttachmentsViewPage` \
 * Displays *attachments* related details.
 */
const AttachmentsViewPage: FC = () => {
  const recordsList = useAppSelector((state) => state.icAttachments.data);

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
                {recordsList[index].name !== "" ? (
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
                      Name
                    </TableCell>
                    <TableCell width="50%">
                      <Typography component="p" sx={{ whiteSpace: "pre-wrap" }}>
                        {recordsList[index].name}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  <></>
                )}
                {recordsList[index].type !== "" ? (
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
                      Type
                    </TableCell>
                    <TableCell width="50%">
                      <Typography component="p" sx={{ whiteSpace: "pre-wrap" }}>
                        {recordsList[index].type}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  <></>
                )}
                {recordsList[index].icAttachmentName !== "" ? (
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
                      Attachment
                    </TableCell>
                    <TableCell width="50%">
                      <Typography component="p" sx={{ whiteSpace: "pre-wrap" }}>
                        <Link component={L} to="/demo">
                          {recordsList[index].icAttachmentName}
                        </Link>
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  <></>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ))}
    </>
  );
};

export default AttachmentsViewPage;
