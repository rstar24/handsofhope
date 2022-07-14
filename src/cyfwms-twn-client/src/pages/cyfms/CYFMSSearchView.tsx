import React, { ReactElement } from "react";

import { useAppDispatch, useAppSelector } from "../../library/hooks";
import { Box, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

import CYFMSHeader from "../../components/cyfms/CYFMSHeader";
import AuthLayout from "../../components/auth/layout/AuthLayout";

const CYFMSSearchView = (): ReactElement => {
  const data = useAppSelector((state) => state as any);

  return (
    <AuthLayout>
      <CYFMSHeader />

      <Box
        component="form"
        sx={{
          justifyContent: "center",
        }}
      >
        <Box
          component="form"
          paddingLeft={2}
          boxShadow={3}
          sx={{
            background: "#d7d3d354",
            maxHeight: "10vh",
          }}
        >
          <Typography variant="h5" fontWeight={500}>
            {data.cyfmsRegister.readUser.firstname} <></>
            {data.cyfmsRegister.readUser.surname}
          </Typography>
        </Box>
        <Box
          sx={{
            justifyContent: "center",
            display: "flex",
            flexDirection: "row",
            background: "#d7d3d354",
            maxHeight: "100vh",
          }}
        >
          <Box
            sx={{ borderRadius: 0, flexBasis: 2, flexGrow: 1, p: 0 }}
            component="img"
            src="/img/profile1.png"
            height={200}
            width={200}
          ></Box>
          <Box
            sx={{
              borderRadius: 0,
              flexBasis: 0,
              flexGrow: 3,
              ml: 2,
              paddingLeft: 5,
            }}
          >
            <Typography variant="h5" paddingTop={2}>
              {data.cyfmsRegister.readUser.firstname} <></>
              {data.cyfmsRegister.readUser.surname}
            </Typography>
            <hr></hr>
            <Typography paddingTop={2}>
              {data.cyfmsContact.contactData.addressLine1} ,
              {data.cyfmsContact.contactData.province} ,
              {data.cyfmsContact.contactData.city} <></>
            </Typography>
            <br />
            <Typography>{data.cyfmsRegister.readUser.gender} </Typography>
            <br />
            <Typography>
              Born : {data.cyfmsRegister.readUser.dateOfBirth} <></>
            </Typography>
          </Box>
        </Box>
        <Box
          boxShadow={3}
          sx={{
            width: "100%",

            display: "flex",
            textAlign: "center",
            justifyContent: "space-between",
          }}
        >
          <Box
            color="black"
            sx={{ p: 1, textDecoration: "none" }}
            component={Link}
            to="/home"
          >
            Registration
          </Box>
          <Box
            color="black"
            sx={{ p: 1, textDecoration: "none" }}
            component={Link}
            to="/home"
          >
            Contact
          </Box>
          <Box
            color="black"
            sx={{ p: 1, textDecoration: "none" }}
            component={Link}
            to="/home"
          >
            Education and Employment
          </Box>
          <Box
            color="black"
            sx={{ p: 1, textDecoration: "none" }}
            component={Link}
            to="/home"
          >
            Other Information
          </Box>
          <Box
            color="black"
            sx={{ p: 1, textDecoration: "none" }}
            component={Link}
            to="/home"
          >
            Other Information
          </Box>
          <Box
            color="black"
            sx={{ p: 1, textDecoration: "none" }}
            component={Link}
            to="/home"
          >
            Other Information
          </Box>
          <Box
            color="black"
            sx={{ p: 1, textDecoration: "none" }}
            component={Link}
            to="/home"
          >
            Other Information
          </Box>
          <Box
            color="black"
            sx={{ p: 1, textDecoration: "none" }}
            component={Link}
            to="/home"
          >
            Other Information
          </Box>
        </Box>

        {Object.entries(data.cyfmsRegister.readUser).map((t: any, k) => (
          <Box
            sx={{
              justifyContent: "center",
              display: "flex",
              flexDirection: "row",
              background: "#d7d3d354",
              maxHeight: "100vh",
            }}
          >
            <Box
              p={1}
              sx={{
                justifyContent: "right",
                display: "flex",
                borderRadius: 0,
                flexBasis: 0,
                flexGrow: 4,
              }}
            >
              <Typography variant="subtitle1">{t[0]} : </Typography>
            </Box>
            <Box
              p={1}
              sx={{
                justifyContent: "left",
                display: "flex",
                borderRadius: 0,
                flexBasis: 0,
                flexGrow: 4,
                mr: 2,
              }}
            >
              <Typography variant="subtitle1">{t[1]}</Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </AuthLayout>
  );
};

export default CYFMSSearchView;
