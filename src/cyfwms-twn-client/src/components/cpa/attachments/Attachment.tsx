//import { Record } from "../../../features/cpa/attachments/slice";
import { TableCell, TableRow } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import type { ReactElement } from "react";

const Attachment = (props: any): ReactElement => {
  return (
    <TableRow key={Math.random() * 1000}>
      <TableCell>
        <Link
          to="../attachments/handle"
          state={{ mode: "view", data: props }}
          onClick={() => console.log("I was clicked!")}
        >
          Select
        </Link>
      </TableCell>
      <TableCell>{props.name}</TableCell>
      <TableCell>{props.type}</TableCell>
    </TableRow>
  );
};

export default Attachment;
