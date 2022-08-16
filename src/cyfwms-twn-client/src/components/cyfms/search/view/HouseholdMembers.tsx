import { useAppSelector } from "../../../../library/hooks";
import { HouseholdMemberLabels } from "../../../../library/labels/cyfms";
import { styles } from "../../../../pages/cyfms/View";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import type { ReactElement } from "react";

const HouseholdMembers = (): ReactElement => {
  const recordsList = useAppSelector(
    (state) => state.cyfmsHouseholdMembers.data.recordsList
  );

  return (
    <>
      {Object.entries(recordsList).map((t: any, index: number) => (
        <>
          <Typography sx={styles.header}>
            Household Member: {index + 1}
          </Typography>
          <TableContainer sx={{ p: "1rem" }}>
            <Table
              sx={{ minWidth: 650 }}
              aria-label="household member data table"
            >
              <TableBody sx={{ "& > tr > td": { border: 0, p: 0 } }}>
                {Object.entries(recordsList[index]).map((t: any, k: any) => {
                  if (
                    t[1] !== "" &&
                    t[1] !== 0 &&
                    HouseholdMemberLabels[k] !== "ParticipantId" &&
                    HouseholdMemberLabels[k] !== "HouseholdMemberId"
                  ) {
                    return (
                      <TableRow key={Math.random() * 1000}>
                        <TableCell width="30%">
                          <Typography style={styles.keys}>
                            {HouseholdMemberLabels[k]}
                          </Typography>
                        </TableCell>
                        <TableCell width="70%">
                          <Typography style={styles.values}>{t[1]}</Typography>
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

export default HouseholdMembers;
