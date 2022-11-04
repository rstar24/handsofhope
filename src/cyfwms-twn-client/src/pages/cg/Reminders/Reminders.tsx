import {
  Box,
  Button,
  OutlinedInput,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import SearchIcon from "@mui/icons-material/Search";

import { Link } from "react-router-dom";

import {
  cleanState,
  doGet,
  doSearch,
} from "../../../features/cg/reminders/slice";
import { useAppDispatch, useAppSelector } from "../../../library/hooks";

import RemindersForm from "./RemindersForm";
import { grey } from "@mui/material/colors";

import CgLayout from "../../../components/cg/CgLayout";
import { doGetCGStatus } from "../../../features/codetable/slice";

function Reminders(props: any) {
  const dispatch = useAppDispatch();
  const state1 = useAppSelector((state) => state.cgCareProvider);
  const state = useAppSelector((state) => state.cgReminder.data);
  const data = useAppSelector((state) => state.cgReminder.record);
  const [addNew, setAddNew] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const [value, setValue] = useState("");

  useEffect(() => {
    dispatch(doGetCGStatus()).then(() => {
      dispatch(
        doSearch({
          id: state1.data.id ? state1.data.id : state1.getData.id,
          data: "",
        })
      )
        .unwrap()
        .catch((err) => {});
    });
  }, [addNew]);

  const handleAddNew = () => {
    dispatch(cleanState(null));
    setDisabled(false);
    setAddNew(true);
  };
  console.log(data);
  const handleSelected = (id: number) => {
    dispatch(doGet(id))
      .unwrap()
      .then(() => {
        setDisabled(true);
        setAddNew(true);
      });
  };
  const handleSearchIcon = (e: any) => {
    dispatch(
      doSearch({
        id: state1.getData.id ? state1.getData.id : state1.data.id,
        data: value,
      })
    )
      .unwrap()
      .catch((err) => {});
  };
  const handleChange = (e: any) => {
    setValue(e.target.value);
  };

  return (
    <CgLayout>
      {addNew === false && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem 0",
          }}
        >
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
            <Box sx={{ paddingLeft: "8px", flexBasis: 0, flexGrow: 2 }}>
              <OutlinedInput
                id="search"
                value={value}
                placeholder="search..."
                size="small"
                onChange={(e) => handleChange(e)}
                sx={{ borderRadius: 0, flexBasis: 0, flexGrow: 2, ml: -1 }}
                type="text"
                endAdornment={
                  <SearchIcon onClick={(e) => handleSearchIcon(e)} />
                }
              />
            </Box>
            <Box sx={{ flexBasis: 0, flexGrow: 2 }}>
              <Button
                variant="contained"
                onClick={() => {
                  setValue("");
                }}
              >
                Clear Search
              </Button>
            </Box>
            <Box sx={{ flexBasis: 0, flexGrow: 2 }}></Box>

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
                    ></TableCell>
                    <TableCell
                      sx={{ color: "white" }}
                      align="center"
                      size="small"
                    >
                      Date
                    </TableCell>
                    <TableCell
                      sx={{ color: "white" }}
                      align="center"
                      size="small"
                    >
                      Subject
                    </TableCell>
                    <TableCell
                      sx={{ color: "white" }}
                      align="center"
                      size="small"
                    >
                      Status
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody
                  sx={{
                    "& > tr > td": {
                      backgroundColor: grey["400"],
                      p: "0.25rem",
                    },
                    "& > tr": { border: 0 },
                  }}
                >
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
                          to="../reminders"
                          onClick={() => handleSelected(val.cgReminderId)}
                        >
                          Select
                        </Link>
                      </TableCell>
                      <TableCell
                        sx={{ color: "black" }}
                        align="center"
                        size="small"
                      >
                        {val.date}
                      </TableCell>
                      <TableCell
                        sx={{ color: "black" }}
                        align="center"
                        size="small"
                      >
                        {val.subject}
                      </TableCell>
                      <TableCell
                        sx={{ color: "black" }}
                        align="center"
                        size="small"
                      >
                        {val.status}
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
        <RemindersForm
          setAddNew={setAddNew}
          setDisabled={setDisabled}
          disabled={disabled}
          targetValue={value}
        />
      )}
    </CgLayout>
  );
}

export default Reminders;
