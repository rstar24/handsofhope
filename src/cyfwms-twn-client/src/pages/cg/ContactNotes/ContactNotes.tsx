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
  Data,
  doGet,
  doSearch,
} from "../../../features/cg/contactNotes/slice";
import { useAppDispatch, useAppSelector } from "../../../library/hooks";
import { doGetICContactMethod } from "../../../features/codetable/slice";
import { grey } from "@mui/material/colors";

import CgLayout from "../../../components/cg/CgLayout";
import ContactNotesForm from "./ContactNotesForm";

function ContactNotes(props: any) {
  const state = useAppSelector((state) => state.cgCareProvider.data);
  const dispatch = useAppDispatch();
  const [addNew, setAddNew] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const records = useAppSelector((state) => state.cgContactNotes.record);
  const [value, setValue] = useState("");

  useEffect(() => {
    dispatch(doGetICContactMethod());

    dispatch(doSearch({ id: state.id, data: "" }))
      .unwrap()
      .catch((err) => {});
  }, []);
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
  const handleSearchIcon = (e: any) => {
    dispatch(doSearch({ id: state.id, data: value }))
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
                <TableHead
                  sx={{
                    "& > tr > th": {
                      backgroundColor: (theme) => theme.palette.primary.main,
                      color: "white",
                      p: "0.25rem",
                    },
                    "& > tr": { border: 0 },
                  }}
                >
                  <TableRow sx={{ backgroundColor: "#da0404", color: "white" }}>
                    <TableCell></TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Worker</TableCell>
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
                  {records &&
                    Array.isArray(records) &&
                    records.map((val: any) => (
                      <TableRow key={val.cgContactNotesId}>
                        <TableCell>
                          <Link
                            to="../contact_notes"
                            onClick={() => handleSelected(val.cgContactNotesId)}
                          >
                            Select
                          </Link>
                        </TableCell>
                        <TableCell>{val.date}</TableCell>
                        <TableCell>{val.name}</TableCell>
                        <TableCell>{val.worker}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </Box>
          </Box>
        </Box>
      )}
      {addNew === true && (
        <ContactNotesForm
          setAddNew={setAddNew}
          setDisabled={setDisabled}
          disabled={disabled}
          targetValue={value}
        />
      )}
    </CgLayout>
  );
}

export default ContactNotes;
