import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import AuthLayout from "../components/auth/layout/AuthLayout";
import React from "react";
import type { FC, ReactNode } from "react";

interface IconType {
  value: string;
  route: string;
}

const icons: IconType[] = [
  {
    value: "Child, Youth, and Family Members",
    route: "/cyfms",
  },
  {
    value: "Initial Contacts",
    route: "/initial_contact",
  },
  {
    value: "Wellness Journey",
    route: "/wellness_journey",
  },
  {
    value: "Cultural Programs and Activities",
    route: "/cpa",
  },
  { value: "Caregivers", route: "/cg" },
  { value: "Reports", route: "/reports" },
  { value: "Notifications", route: "/notifications" },
];

const RenderIcons = (icons: IconType[]): ReactNode[] => {
  let result: ReactNode[] = new Array(icons.length);
  for (let index: number = 0; index < icons.length; ++index) {
    result.push(
      <Link
        key={icons[index].value}
        to={icons[index].route}
        style={{ textDecoration: "none" }}
      >
        <Card elevation={0} sx={{ width: 150 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="100px"
              image={"/img/logo-encircled.svg"}
              alt=""
            />
            <CardContent>
              <Typography
                component="h2"
                variant="body1"
                sx={{ fontSize: "0.7rem", textAlign: "center" }}
              >
                {icons[index].value}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Link>
    );
  }
  return result;
};

/**
 * `Home` is displayed on `/home` route.
 * @returns `ReactElement`
 */
const Home: FC = () => {
  return (
    <AuthLayout>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          my: "1rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem 1rem",
            justifyContent: "center",
            maxWidth: "768px",
          }}
        >
          {RenderIcons(icons)}
        </Box>
      </Box>
    </AuthLayout>
  );
};

export default Home;
