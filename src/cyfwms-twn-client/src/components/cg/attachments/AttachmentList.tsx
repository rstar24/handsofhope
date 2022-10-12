import { selected } from "../../../contexts/cpa/attachments";
import { TableCell, TableRow } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import type { FC } from "react";
import type { Record as RecordT } from "../../../features/cg/attachments/slice";

/**
 * `AttachmentList` FC is used to list attachments of
 * `CG` aka `Caregivers` module.
 * @param props
 * @returns `ReactElement`
 */
const AttachmentList: FC<AppRecordListProps<RecordT>> = (props) => {
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
