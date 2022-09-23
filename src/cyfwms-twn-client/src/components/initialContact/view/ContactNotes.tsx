import { useAppDispatch, useAppSelector } from "../../../library/hooks";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import { ReactElement, useEffect } from "react";
import { doSearch } from "../../../features/initialContact/contactNotes/slice";

const ContactNotes = (): ReactElement => {
  const recordsList = useAppSelector((state) => state.icContactNotes.record);
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.icFileDetails.getData);
  const popup = useAppSelector((state) => state.popup.open);

  useEffect(() => {
    dispatch(doSearch({ id: data.fileDetailsId, data: "" }));
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
                          {t[0]
                            //insert a space before all caps
                            .replace(/([A-Z])/g, " $1")
                            // uppercase the first character
                            .replace(/^./, function (str: String) {
                              return str.toUpperCase();
                            })}
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

export default ContactNotes;
