import EditIcon from "../EditIcon";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import type { Record } from "../../../features/cyfms/search/slice";
import type { ReactElement } from "react";
import { useAppDispatch, useAppSelector } from "../../../library/hooks";
import {
  setCyfmsClientName,
  setCyfmsId,
} from "../../../features/initialContact/fileDetails/slice";
import { setClientName, setId } from "../../../features/cpa/participant/slice";

const ClientResults = ({ setClick, moduleName }: any): ReactElement => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.cyfmsSearch.data);
  const handleCellClick = (participant: Record) => {
    if (moduleName === "cpaParticipant") {
      dispatch(
        setClientName(`${participant.firstname}${" "}${participant.surname}`)
      );
      dispatch(setId(participant.participantId));
      setClick(false);
    } else if (moduleName === "initialContact") {
      dispatch(
        setCyfmsClientName(
          `${participant.firstname}${" "}${participant.surname}`
        )
      );
      dispatch(setCyfmsId(participant.participantId));
      setClick(false);
    }
  };
  return (
    <Box>
      <Typography fontSize={20} fontWeight={800} color="red" paddingLeft={2}>
        Total Results - {data.length}
      </Typography>
      <Table sx={{ minWidth: 800 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Reference ID</TableCell>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>City</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((participant: Record) => (
            <TableRow
              key={Math.random() * 1000}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell
                onClick={() => {
                  handleCellClick(participant);
                }}
              >
                {participant.referenceId}
              </TableCell>
              <TableCell>{participant.firstname}</TableCell>
              <TableCell>{participant.surname}</TableCell>
              <TableCell>{participant.city}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default ClientResults;
