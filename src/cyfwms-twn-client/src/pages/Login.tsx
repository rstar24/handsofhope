import Input from "../components/Input";
import Layout from "../components/layout/Layout";
import { doPost } from "../features/login/slice";
import { useAppDispatch, useAppSelector } from "../library/hooks";
import {
  Backdrop,
  Box,
  Button,
  Modal,
  Fade,
  Typography,
  Link as MUILink,
} from "@mui/material";
import {
  Link as ReactRouterLink,
  Navigate,
  useNavigate,
} from "react-router-dom";
import React, { useState } from "react";
import type { FormEvent, ReactElement } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "5px solid red",
  boxShadow: 24,
  p: 4,
};

/**
 * The Login functional component.
 * @returns Login component skeleton.
 */
const Login = (): ReactElement => {
  const navigate = useNavigate();
  const state = useAppSelector((state) => state.login);
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Redirect to `Home` if already logged in!
  if (state.isLoggedIn) {
    return <Navigate to="/home" />;
  }

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    const data: any = e.currentTarget;
    dispatch(
      doPost({
        username: data.userName.value,
        password: data.passWord.value,
      })
    )
      .unwrap()
      .then((res) => {
        navigate("/home");
      })
      .catch((err) => {
        setOpen(true);
      });
  };

  const ErrorDialog: ReactElement = (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <Typography
            id="transition-modal-title"
            variant="h6"
            component="h2"
            sx={{ color: "red" }}
          >
            Invalid Credentials
          </Typography>
          <Typography id="transition-modal-description" sx={{ mt: 2 }}>
            Username/Password combination does not match!
          </Typography>
        </Box>
      </Fade>
    </Modal>
  );

  return (
    <Layout>
      <Box
        component="form"
        onSubmit={submitHandler}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          rowGap: "1rem",
          my: "1rem",
        }}
      >
        <Typography>
          <b>Hands of Hope</b>
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem 0" }}>
          <Input id="userName" name="userName" value="Username" required />
          <Input
            formLabelFlex="1.06 1 0"
            id="passWord"
            name="passWord"
            validationTitle="Password must be at least 5 characters long!"
            validationPattern="^.{5,}$"
            value="Password"
            required
            type="password"
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            <Box sx={{ flex: "1.08 1 0" }}></Box>
            <Box
              sx={{
                flex: "2 1 0",
                display: "flex",
                justifyContent: "center",
                gap: "0 1rem",
              }}
            >
              <Button variant="contained" type="submit">
                Login
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            <Box sx={{ flex: "1.08 1 0" }}></Box>
            <Box
              sx={{
                flex: "2 1 0",
                display: "flex",
                justifyContent: "center",
                gap: "0 1rem",
              }}
            >
              <ReactRouterLink style={{ textDecoration: "none" }} to="/login">
                <MUILink component="span" underline="hover">
                  Forgot password?
                </MUILink>
              </ReactRouterLink>
            </Box>
          </Box>
        </Box>
        {ErrorDialog}
      </Box>
    </Layout>
  );
};

export default Login;
