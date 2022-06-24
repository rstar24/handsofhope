import React from 'react';
import {
  Box,
  Button,
  Grid,
  InputLabel,
  Select,
  TextField,
} from "@mui/material";
import { useState } from "react";
import Layout from "../../components/auth/layout/Layout";
import CYFMSHeader from "./CYFMSHeader";
import type { ReactChildren } from "../../shared/types";
import type { ReactElement } from "react";

/**
 * The CYFMSSearch functional component.
 * @returns CYFMSSearch component skeleton.
 */
const CYFMSSearch = (props: ReactChildren): ReactElement => {
  const names = ["Single", "Married", "Devorced"];

  const [personName, setPersonName] = useState<string[]>([]);
  const handleChangeMultiple = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { options } = event.target;
    const value: string[] = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setPersonName(value);
  };
  return (
    <Layout>
      <CYFMSHeader />
      <Grid
        container
        rowSpacing={1}
        direction="row"
        columns={{ xs: 2, sm: 8, md: 12 }}
      >
        <Grid
          item
          display="flex"
          justifyContent="flex-start"
          alignItems="flex-start"
          xs={2}
          sm={4}
          md={4}
          style={{ justifyContent: "end" }}
        >
          <Button
            variant="contained"
            style={{
              border: "1px solid black",
              backgroundColor: "#bbb7b7",
              color: "black",
              height: "60px",
              width: "300px",
            }}
          >
            Search for a Child, Youth, and Family Members
          </Button>
        </Grid>
        <Grid item xs={2} sm={4} md={8}>
          <form>
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
              }}
            >
              <Grid
                container
                md={8}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Grid item md={4}>
                  <InputLabel style={{ color: "black" }}>First Name</InputLabel>
                </Grid>
                <Grid item md={4}>
                  <TextField
                    hiddenLabel
                    id="filled-hidden-label-small"
                    defaultValue="John"
                    variant="filled"
                    size="small"
                  />
                </Grid>
              </Grid>
              <Grid
                container
                md={8}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Grid item md={4}>
                  <InputLabel style={{ color: "black" }}>
                    Middle Name
                  </InputLabel>
                </Grid>
                <Grid item md={4}>
                  <TextField
                    hiddenLabel
                    id="filled-hidden-label-small"
                    defaultValue=""
                    variant="filled"
                    size="small"
                  />
                </Grid>
              </Grid>
              <Grid
                container
                md={8}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Grid item md={4}>
                  <InputLabel style={{ color: "black" }}>Last Name</InputLabel>
                </Grid>
                <Grid item md={4}>
                  <TextField
                    hiddenLabel
                    id="filled-hidden-label-small"
                    defaultValue="Sharma"
                    variant="filled"
                    size="small"
                  />
                </Grid>
              </Grid>
              <Grid
                container
                md={8}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Grid item md={4}>
                  <InputLabel style={{ color: "black" }}>
                    Date of Birth
                  </InputLabel>
                </Grid>
                <Grid item md={4}>
                  <TextField
                    hiddenLabel
                    id="filled-hidden-label-small"
                    defaultValue="11/05/1997"
                    variant="filled"
                    size="small"
                  />
                </Grid>
              </Grid>
              <Grid
                container
                md={8}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Grid item md={4}>
                  <InputLabel style={{ color: "black" }}>
                    Phone Number
                  </InputLabel>
                </Grid>
                <Grid item md={4}>
                  <TextField
                    hiddenLabel
                    id="filled-hidden-label-small"
                    defaultValue="91XXXXXXXX"
                    variant="filled"
                    size="small"
                  />
                </Grid>
              </Grid>
              <Grid
                container
                md={8}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Grid item md={4}>
                  <InputLabel style={{ color: "black" }}>
                    Marital Status
                  </InputLabel>
                </Grid>
                <Grid item md={4}>
                  <Select
                    native
                    variant="filled"
                    size="small"
                    value={personName}
                    style={{ marginBottom: "10px" }}
                    // @ts-ignore Typings are not considering `native`
                    onChange={handleChangeMultiple}
                    inputProps={{
                      id: "select-multiple-native",
                    }}
                  >
                    {names.map((name) => (
                      <option key={name} value={name}>
                        {name}
                      </option>
                    ))}
                  </Select>
                </Grid>
              </Grid>
              <Grid
                container
                md={8}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Grid item md={4}>
                  <InputLabel style={{ color: "black" }}>City</InputLabel>
                </Grid>
                <Grid item md={4}>
                  <TextField
                    hiddenLabel
                    id="filled-hidden-label-small"
                    defaultValue="Indore"
                    variant="filled"
                    size="small"
                  />
                </Grid>
              </Grid>
              <Grid
                container
                md={8}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Grid item md={4}></Grid>
                <Grid item md={4}>
                  <Button variant="contained" color="info">
                    Search{" "}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </form>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default CYFMSSearch;
