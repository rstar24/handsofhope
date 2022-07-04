import AuthLayout from "../../components/auth/layout/AuthLayout";
import CYFMSHeader from "../../components/cyfms/CYFMSHeader";
import {
  Box,
  Button,
  Grid,
  InputLabel,
  Select,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import type { ReactElement } from "react";
import CYFMSInput from "../../components/cyfms/CYFMSInput";

/**
 * The CYFMSSearch functional component.
 * @returns CYFMSSearch component skeleton.
 */
const CYFMSSearch = (): ReactElement => {
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
    <AuthLayout>
      <CYFMSHeader />
      <Grid
        container
        spacing={2}
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
        <Grid item xs={2} sm={4} md={1}></Grid>
        <Grid item xs={2} sm={4} md={6}>
          <Grid container spacing={2}>
            <Grid item md={10}>
              <CYFMSInput id="firstName" value="First Name" autofill="" />
            </Grid>
            <Grid item md={10}>
              <CYFMSInput id="MiddleName" value="Middle Name" autofill="" />
            </Grid>
            <Grid item md={10}>
              <CYFMSInput id="lastName" value="Last Name" autofill="" />
            </Grid>

            <Grid item md={10}>
              <CYFMSInput id="dateOfBirth" value="Date of Birth" autofill="" />
            </Grid>

            <Grid item md={10}>
              <CYFMSInput
                id="maritalStatus"
                value="Marital Status"
                autofill=""
              />
            </Grid>
            <Grid item md={10}>
              <CYFMSInput id="phone" value="Phone Number" autofill="" />
            </Grid>
            <Grid item md={10}>
              <CYFMSInput id="city" value="City" autofill="" />
            </Grid>
          </Grid>
          <Grid item md={10}></Grid>
          <Grid container>
            <Grid item md={5.5}></Grid>
            <Grid item md={4}>
              <Button variant="contained" color="info">
                Search
              </Button>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={2} sm={4} md={8}>
          {/* <form>
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
          </form> */}
        </Grid>
      </Grid>
    </AuthLayout>
  );
};

export default CYFMSSearch;
