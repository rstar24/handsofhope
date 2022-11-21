import { doGet as doGetRegister } from "../../../features/cyfms/register/slice";
import { doGet as doGetContact } from "../../../features/cyfms/contact/slice";
import { doGet as doGetCounselors } from "../../../features/cyfms/counselors/slice";
import { doGet as doGetCriminalHistory } from "../../../features/cyfms/criminalHistory/slice";
import { doGet as doGetEducationAndEmployment } from "../../../features/cyfms/educationAndEmployment/slice";
import { doGet as doGetFamilyPhysicians } from "../../../features/cyfms/familyPhysicians/slice";
import { doGet as doGetHouseholdMembers } from "../../../features/cyfms/householdMembers/slice";
import { doGet as doGetOtherInformation } from "../../../features/cyfms/otherInformation/slice";
import { FileDetailsLabels } from "../../../library/labels/initialContact";
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
import { Link } from "react-router-dom";
import type { FC } from "react";

const FileDetailsViewPage: FC = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.icFileDetails.getData);
  const handleLink = () => {
    console.log(data.participantId);
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
    <TableContainer
      sx={{ display: "flex", justifyContent: "center", p: "1rem" }}
    >
      <Table sx={{ maxWidth: 900 }} aria-label="register data table">
        <TableBody sx={{ "& > tr > td": { border: 0, p: 0 } }}>
          {Object.entries(data).map((t: any, k: any) => {
            if (
              t[0] !== "fileDetailsId" &&
              t[0] !== "participantId" &&
              t[1] !== "0001-01-01"
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
                    {FileDetailsLabels[k]}
                  </TableCell>
                  <TableCell width="50%">
                    {t[0] === "clientName" ? (
                      <Typography component="p" sx={{ whiteSpace: "pre-wrap" }}>
                        <Link to="/cyfms/view" onClick={handleLink}>
                          {t[1]}
                        </Link>
                      </Typography>
                    ) : (
                      <Typography component="p" sx={{ whiteSpace: "pre-wrap" }}>
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
  );
};

export default FileDetailsViewPage;
