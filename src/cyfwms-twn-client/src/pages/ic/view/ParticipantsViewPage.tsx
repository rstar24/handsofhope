import { doGet as doGetContact } from "../../../features/cyfms/contact/slice";
import { doGet as doGetCounselors } from "../../../features/cyfms/counselors/slice";
import { doGet as doGetCriminalHistory } from "../../../features/cyfms/criminalHistory/slice";
import { doGet as doGetEducationAndEmployment } from "../../../features/cyfms/educationAndEmployment/slice";
import { doGet as doGetFamilyPhysicians } from "../../../features/cyfms/familyPhysicians/slice";
import { doGet as doGetHouseholdMembers } from "../../../features/cyfms/householdMembers/slice";
import { doGet as doGetOtherInformation } from "../../../features/cyfms/otherInformation/slice";
import { doGet as doGetRegister } from "../../../features/cyfms/register/slice";
import { doSearch } from "../../../features/initialContact/contactNotes/slice";
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
import { Link } from "react-router-dom";
import type { FC } from "react";

/**
 * *IC* aka *Initial Contact* module. \
 * Sub page: *View* \
 * Sub sub page: `ParticipantsViewPage` \
 * Displays *participants* related details.
 */
const ParticipantsViewPage: FC = () => {
  const dispatch = useAppDispatch();
  const recordsList = useAppSelector((state) => state.icParticipants.record);
  const data = useAppSelector((state) => state.icParticipants.getData);
  const popup = useAppSelector((state) => state.popup.open);

  useEffect(() => {
    dispatch(doSearch({ id: data.fileDetailsId, data: "" }));
  }, [popup]);

  if (recordsList.length > 0) {
    if (
      recordsList[0].notes === "" &&
      recordsList[0].role === "" &&
      recordsList[0].participant === ""
    ) {
      return <></>;
    }
  }

  const handleLink = () => {
    dispatch(doGetRegister(data.participantId));
    dispatch(doGetContact(data.participantId));
    dispatch(doGetEducationAndEmployment(data.participantId));
    dispatch(doGetOtherInformation(data.participantId));
    dispatch(doGetCriminalHistory(data.participantId));
    dispatch(doGetHouseholdMembers(data.participantId));
    dispatch(doGetFamilyPhysicians(data.participantId));
    dispatch(doGetCounselors(data.participantId));
  };

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
            <Table sx={{ maxWidth: 900 }} aria-label="Participants">
              <TableBody sx={{ "& > tr > td": { border: 0, p: 0 } }}>
                {Object.entries(recordsList[index]).map((t: any, k: any) => {
                  if (k !== 0 && k !== 1 && t[1] !== "") {
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
                          {t[0] === "participant" ? (
                            <Typography
                              component="p"
                              sx={{ whiteSpace: "pre-wrap" }}
                            >
                              <Link to="/cyfms/view" onClick={handleLink}>
                                {t[1]}
                              </Link>
                            </Typography>
                          ) : (
                            <Typography
                              component="p"
                              sx={{ whiteSpace: "pre-wrap" }}
                            >
                              {t[1]}
                            </Typography>
                          )}
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

export default ParticipantsViewPage;
