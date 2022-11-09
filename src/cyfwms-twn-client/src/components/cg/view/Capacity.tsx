import { useAppSelector } from "../../../library/hooks";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import type { ReactElement } from "react";
import {
  CapacityLabels,
} from "../../../library/labels/careGivers";

const Capacity = (): ReactElement => {
  const data = useAppSelector((state) => state.cgCapacity.data);
  const [ available, setAvailable ] = useState( );

  return (
    <TableContainer
      sx={{ display: "flex", justifyContent: "center", p: "1rem" }}
    >
      <Table sx={{ maxWidth: 900 }} aria-label="register data table">
        <TableBody sx={{ "& > tr > td": { border: 0, p: 0 } }}>
          {/* {Object.entries(data).map((t: any, k: any) => {
            if (k!==0 && k!==5 ) {
              //t[0]!=="cgCapacityId" && t[0]!=="maximumCap" && t[0]!=="cgProviderId" && t[0]!=="currUtil"
              //t[0]!=="cgCapacityId" && t[0]!=="maximumCap" && t[0]!=="cgProviderId" && t[0]!=="currUtil" 
             // && CapacityLabels[k]!=="Capacity Id" && CapacityLabels[k]!==""
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
                    {CapacityLabels[k]}
                  </TableCell>
                  <TableCell width="50%">
                    <Typography component="p" sx={{ whiteSpace: "pre-wrap" }}>
                      {t[1]}
                    </Typography>
                  </TableCell>
                </TableRow>
              );
            }
            return <></>;
          })} */}
          {data.maximumCap !== 0 ? (
            <TableRow>
              <TableCell
                sx={{
                  display: "flex",
                  width: "50%",
                  alignContent: "start",
                  fontWeight: "bold",
                  fontSize: "1rem",
                }}
              >
                Maximum Capacity
              </TableCell>
              <TableCell width="50%">
                <Typography component="p" sx={{ whiteSpace: "pre-wrap" }}>
                  {data.maximumCap}
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            <></>
          )}
          {true ? (
            <TableRow>
              <TableCell
                sx={{
                  display: "flex",
                  width: "50%",
                  alignContent: "start",
                  fontWeight: "bold",
                  fontSize: "1rem",
                }}
              >
                Current Utilization
              </TableCell>
              <TableCell width="50%">
                <Typography component="p" sx={{ whiteSpace: "pre-wrap" }}>
                  {data.currUtil}
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            <></>
          )}
          {(data.maximumCap - data.currUtil) !== 0 ? (
            <TableRow>
              <TableCell
                sx={{
                  display: "flex",
                  width: "50%",
                  alignContent: "start",
                  fontWeight: "bold",
                  fontSize: "1rem",
                }}
              >
                Available Capacity
              </TableCell>
              <TableCell width="50%">
                <Typography component="p" sx={{ whiteSpace: "pre-wrap" }}>
                  {data.maximumCap - data.currUtil}
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            <></>
          )}
          {data.currUtilDetails !== "" ? (
            <TableRow>
              <TableCell
                sx={{
                  display: "flex",
                  width: "50%",
                  alignContent: "start",
                  fontWeight: "bold",
                  fontSize: "1rem",
                }}
              >
                Current Utilization Details
              </TableCell>
              <TableCell width="50%">
                <Typography component="p" sx={{ whiteSpace: "pre-wrap" }}>
                  {data.currUtilDetails}
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            <></>
          )}
          {data.preferences !== "" ? (
            <TableRow>
              <TableCell
                sx={{
                  display: "flex",
                  width: "50%",
                  alignContent: "start",
                  fontWeight: "bold",
                  fontSize: "1rem",
                }}
              >
                Preferences
              </TableCell>
              <TableCell width="50%">
                <Typography component="p" sx={{ whiteSpace: "pre-wrap" }}>
                  {data.preferences}
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            <></>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Capacity;
