import { Layout } from "../components/layout/Layout";
import {
  Button,
  Grid,
  InputLabel,
  Link,
  OutlinedInput,
  Typography,
} from "@mui/material";
import type { ReactElement } from "react";

/**
 * The Login functional component.
 * @returns Login component skeleton.
 */
const Login = (): ReactElement => {
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
              <Typography color="primary">Username</Typography>
            </InputLabel>
          </Grid>
          <Grid item>
            <OutlinedInput id="userName" required />
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
            <OutlinedInput id="userName" required />
          </Grid>
        </Grid>
        <Grid item container sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            type="submit"
            variant="contained"
            sx={(theme) => ({ backgroundColor: theme.palette.primary.dark })}
          >
            Login
          </Button>
        </Grid>
        <Grid item container sx={{ display: "flex", justifyContent: "center" }}>
          <Link href="forgotPassword" underline="hover">
            Forgot password?
          </Link>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Login;
