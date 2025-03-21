import CpaLayout from "../../../components/cpa/CPALayout";
import {
  cleanState,
  doGet,
  doSearch,
} from "../../../features/cpa/participant/slice";
import { useAppDispatch, useAppSelector } from "../../../library/hooks";
import ParticipantForm from "./ParticipantsForm";
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
 * `CPA` aka `Cultural Programs and Activities` module.
 * Sub page: `Participants`.
 * @returns `ReactElement`
 */
const Participants: FC = () => {
  const dispatch = useAppDispatch();
  const [addNew, setAddNew] = useState(false);
  const [disabled, setDisabled] = useState(false);
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
    <CpaLayout>
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
                            onClick={() =>
                              handleSelected(val.participantCulturalProId)
                            }
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
        <ParticipantForm
          setAddNew={setAddNew}
          setDisabled={setDisabled}
          disabled={disabled}
        />
      )}
    </CpaLayout>
  );
};

export default Participants;
