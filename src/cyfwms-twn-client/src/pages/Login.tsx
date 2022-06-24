import React from "react";
import Layout  from "../components/layout/Layout";
import {
  Button,
  Grid,
  InputLabel,
  Link,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { ReactElement, useState } from "react";
import { loginUser } from "../features/login/loginApi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

/**
 * The Login functional component.
 * @returns Login component skeleton.
 */
const Login = (): ReactElement => {
  const navigate = useNavigate();
  const data = useSelector((state) => (state as any).login);
  const dispatch = useDispatch();

  const [user, setUser] = useState({
    username: "",
    password: "",
  });


  const handleLogin = (e: any) => {
    e.preventDefault();
    loginUser(user, dispatch);
  };

  // const handleLogout = () => {
  //   setUser({ username: "", password: "" });
  //   logoutUser(user, dispatch);
  // };
  if (data.authenticate) {
    navigate("/home", { replace: true });
  }
  return (
      <Layout>
      <Grid container component="form" rowSpacing={2}>
        <Grid
          item
          container
          spacing={2}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Grid item>
            <InputLabel htmlFor="userName">
              <Typography
                color="primary"
              >
                Username
              </Typography>
            </InputLabel>
          </Grid>
          <Grid item>
            <OutlinedInput
              id="userName"
              required
              onChange={(e) =>
                setUser({ ...user, username: e.currentTarget.value })
              }
            />
          </Grid>
        </Grid>
        <Grid
          item
          container
          spacing={2}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Grid item>
            <InputLabel htmlFor="userName">
              <Typography color="primary">Password</Typography>
            </InputLabel>
          </Grid>
          <Grid item>
            <OutlinedInput
              id="passWord"
              type="password"
              required
              onChange={(e) =>
                setUser({ ...user, password: e.currentTarget.value })
              }
            />
          </Grid>
        </Grid>
        <Grid
          item
          container
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Button
            type="submit"
            variant="contained"
            sx={(theme) => ({
              backgroundColor: theme.palette.primary.dark,
            })}
            onClick={handleLogin}
          >
            Login
          </Button>
        </Grid>
        <Grid
          item
          container
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Link href="forgotPassword" underline="hover">
            Forgot password?
          </Link>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Login;
