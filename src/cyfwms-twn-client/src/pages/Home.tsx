import React from 'react';
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Layout } from "../components/auth/layout/Layout";
import type { ReactElement, ReactNode } from "react";

interface IconType {
  value: string;
  route: string;
  src: string;
}

const icons: IconType[] = [
  {
    value: "Child, Youth, and Family Members",
    route: "/cyfm_search",
    src: "/img/heartInCircle.svg",
  },
  {
    value: "Initial Contact",
    route: "/initial_contact",
    src: "/img/flower.svg",
  },
  {
    value: "Wellness Journey",
    route: "/wellness_journey",
    src: "/img/fishes.svg",
  },
  {
    value: "Cultural Programs and Activities",
    route: "/cpa",
    src: "/img/halfMoon.svg",
  },
  { value: "Caregivers", route: "/caregivers", src: "/img/home.svg" },
  { value: "Reports", route: "/reports", src: "/img/mountains.svg" },
  { value: "Notifications", route: "/notifications", src: "/img/feather.svg" },
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
              image={icons[index].src}
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
 * The Home functional component.
 * @returns Home component skeleton.
 */
const Home = (): ReactElement => {
  return (
    <Layout>
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
    </Layout>
  );
};

export default Home;
