import { Layout } from "../components/layout/Layout";
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
import { Navigate, useNavigate } from "react-router";

/**
 * The Login functional component.
 * @returns Login component skeleton.
 */
const Login = (): ReactElement => {
  const navigate = useNavigate();
  const data = useSelector((state) => (state as any).login);
  const dispatch = useDispatch();

  const [user, setUser] = useState({
    userName: "",
    password: "",
  });

  const handleLogin = (e: any) => {
    e.preventDefault();
    console.log(data.authenticate);
    loginUser(user, dispatch);
  };

  // const handleLogout = () => {
  //   setUser({ username: "", password: "" });
  //   logoutUser(user, dispatch);
  // };
  return (
    <>
      {!data.authenticate && (
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
                    onChange={(e) => setUser({ ...user, userName: "admin" })}
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
                    setUser({ ...user, userName: e.currentTarget.value })
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
      )}
      {data.authenticate && (
        <>
          <Navigate to="/home" />
        </>
      )}
    </>
  );
};

export default Login;
