import { doSearch } from "../../../features/cg/contactNotes/slice";
import { ContactNotesLabels } from "../../../library/labels/careGivers";
import { useAppDispatch, useAppSelector } from "../../../library/hooks";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import type { FC } from "react";

/**
 * *CG* aka *Caregivers* module. \
 * Sub page: *View* \
 * Sub sub page: `ContactNotesViewPage` \
 * Displays *contact notes* related details.
 */
const ContactNotesViewPage: FC = () => {
  const dispatch = useAppDispatch();
  const recordsList = useAppSelector((state) => state.cgContactNotes.record);
  const data = useAppSelector((state) => state.cgCareProvider);
  const popup = useAppSelector((state) => state.popup.open);

  useEffect(() => {
    dispatch(
      doSearch({ id: data.data.id ? data.data.id : data.getData.id, data: "" })
    );
  }, [popup]);

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
            <Table sx={{ maxWidth: 900 }} aria-label="Contact Notes">
              <TableBody sx={{ "& > tr > td": { border: 0, p: 0 } }}>
                {Object.entries(recordsList[index]).map((t: any, k: any) => {
                  if (
                    k !== 0 &&
                    k !== 1 &&
                    t[1] !== "" &&
                    t[1] !== "01:01:01"
                  ) {
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
                          {ContactNotesLabels[k]}
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

export default ContactNotesViewPage;
