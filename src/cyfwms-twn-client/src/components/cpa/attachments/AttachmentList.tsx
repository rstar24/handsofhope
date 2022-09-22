import { selected } from "../../../contexts/cpa/attachments";
import { TableCell, TableRow } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import type { ReactElement } from "react";
import { Record as RecordT } from "../../../features/cpa/attachments/slice";

const AttachmentList = (props: AppRecordListProps<RecordT>): ReactElement => {
  return (
    <>
      {props.list.map((attachment, index) => (
        <TableRow key={Math.random() * 1000}>
          <TableCell>
            <Link
              to="view"
              onClick={() => {
                selected.value = index;
              }}
            >
              Select
            </Link>
          </TableCell>
          <TableCell>{attachment.name}</TableCell>
          <TableCell>{attachment.type}</TableCell>
        </TableRow>
      ))}
    </>
  );
};

export default AttachmentList;
