import {
  Backdrop,
  Box,
  Button,
  Modal,
  Fade,
  Typography,
  Link as MUILink,
} from "@mui/material";
import { doLogin } from "../features/login/loginSlice";
import { useAppDispatch, useAppSelector } from "../library/hooks";
import { useNavigate, Link as ReactRouterLink } from "react-router-dom";
import Layout from "../components/layout/Layout";
import React, { useState } from "react";
import type { FormEvent, ReactElement } from "react";
import CYFMSInput from "../components/cyfms/CYFMSInput";
import CYFMSInput1 from "../components/cyfms/CYFMSInput1";

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
  const data = useAppSelector((state) => (state as any).login);
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    const data: any = e.currentTarget;
    dispatch(
      doLogin({
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
          rowGap: "1.5rem",
          my: "1rem",
        }}
      >
        <CYFMSInput id="userName" name="userName" required value="Username" />
        <CYFMSInput1
          id="passWord"
          name="passWord"
          required
          type="password"
          value="Password"
        />
        <Button type="submit" variant="contained">
          Login
        </Button>
        {ErrorDialog}
        <ReactRouterLink
          style={{ textDecoration: "none" }}
          to="/cyfms/forgot_password"
        >
          <MUILink component="span" underline="hover">
            Forgot password?
          </MUILink>
        </ReactRouterLink>
      </Box>
    </Layout>
  );
};

export default Login;
