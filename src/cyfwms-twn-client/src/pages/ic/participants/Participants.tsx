import IcLayout from "../../../components/initialContact/ICLayout";
import {
  cleanState,
  doGet,
  doSearch,
} from "../../../features/initialContact/participant/slice";
import { useAppDispatch, useAppSelector } from "../../../library/hooks";
import ParticipantsForm from "./ParticipantsForm";
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
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { FC } from "react";

/**
 * `CPA` aka `Initial Contact` module.
 * Sub page: `Participants`.
 * @returns `ReactElement`
 */
const Participants: FC = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.icParticipants.record);
  const state = useAppSelector((state) => state.icFileDetails.getData);

  const [addNew, setAddNew] = useState(false);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    dispatch(doSearch({ id: state.fileDetailsId, data: "" }));
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
    <IcLayout>
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
              <TableContainer>
                <Table
                  sx={{
                    "th, td": {
                      width: "33%",
                      textAlign: "center",
                      p: "0.25rem",
                    },
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
                      <TableCell>Participant</TableCell>
                      <TableCell>Role</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody sx={{ td: { backgroundColor: grey["400"] } }}>
                    {data.map((val: any) => (
                      <TableRow>
                        <TableCell>
                          <Link
                            to="../participants"
                            onClick={() => handleSelected(val.icParticipantId)}
                          >
                            Select
                          </Link>
                        </TableCell>
                        <TableCell>{val.participant}</TableCell>
                        <TableCell>{val.role}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Box>
        </Box>
      )}
      {addNew === true && (
        <ParticipantsForm
          setAddNew={setAddNew}
          setDisabled={setDisabled}
          disabled={disabled}
        />
      )}
    </IcLayout>
  );
};

export default Participants;
