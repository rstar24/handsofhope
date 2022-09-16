import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import { cleanState } from "../../../features/cpa/participant/slice";
import { useAppDispatch, useAppSelector } from "../../../library/hooks";
import CPALayout from "../../../components/cpa/CPALayout";
import ParticipantForm from "./ParticipantForm";
import { doGet, doSearch } from "../../../features/cpa/participant/slice";

function Participant(props: any) {
  const dispatch = useAppDispatch();
  const [addNew, setAddNew] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [value, setValue] = useState("");
  const data = useAppSelector((state) => state.cpaParticipant.record);
  const state = useAppSelector((state) => state.cpa.data);

  useEffect(() => {
    dispatch(doSearch(state.culturalProgramId))
      .unwrap()
      .catch((err) => {});
  }, [addNew]);
  const handleAddNew = () => {
    dispatch(cleanState(null));
    setDisabled(false);
    setAddNew(true);
  };
  const handleSelected = (id: number) => {
    dispatch(doGet(id))
      .unwrap()
      .then(() => {
        setDisabled(true);
        setAddNew(true);
      });
  };

  return (
    <CPALayout>
      {addNew === false && (
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
              <Button variant="contained" onClick={handleAddNew}>
                Add New
              </Button>
            </Box>
          </Box>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
            <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
              <Table sx={{ minWidth: 760 }} aria-label="simple table">
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#da0404", color: "white" }}>
                    <TableCell
                      sx={{ color: "white" }}
                      align="center"
                      size="small"
                    >
                      {" "}
                    </TableCell>
                    <TableCell
                      sx={{ color: "white" }}
                      align="center"
                      size="small"
                    >
                      Participant
                    </TableCell>
                    <TableCell
                      sx={{ color: "white" }}
                      align="center"
                      size="small"
                    >
                      Role
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((val: any) => (
                    <TableRow
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell
                        sx={{ color: "black" }}
                        align="center"
                        size="small"
                      >
                        <Link
                          to="../participants"
                          onClick={() =>
                            handleSelected(val.participantCulturalProId)
                          }
                        >
                          Select
                        </Link>
                      </TableCell>

                      <TableCell
                        sx={{ color: "black" }}
                        align="center"
                        size="small"
                      >
                        {" "}
                        {val.participant}
                      </TableCell>
                      <TableCell
                        sx={{ color: "black" }}
                        align="center"
                        size="small"
                      >
                        {val.role}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Box>
        </Box>
      )}
      {addNew === true && (
        <ParticipantForm
          setAddNew={setAddNew}
          setDisabled={setDisabled}
          disabled={disabled}
        />
      )}
    </CPALayout>
  );
}

export default Participant;
