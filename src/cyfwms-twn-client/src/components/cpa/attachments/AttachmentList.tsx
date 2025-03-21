import AttachmentsContext from "../../../contexts/AttachmentsContext";
import { TableCell, TableRow } from "@mui/material";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import type { Record as RecordT } from "../../../features/cpa/attachments/slice";
import type { FC } from "react";

/**
 * `AttachmentList` FC is used to list attachments of
 * `CPA` aka `Cultural Programs and Activities` module.
 * @param props
 * @returns `ReactElement`
 */
const AttachmentList: FC<AppRecordListProps<RecordT>> = (props) => {
  const context = useContext(AttachmentsContext);
  return (
    <>
      {props.list.map((attachment, index) => (
        <TableRow key={Math.random() * 1000}>
          <TableCell>
            <Link to="view" onClick={() => context.setSelected(index)}>
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
