import { Box, Button, Typography } from "@mui/material";
import { Layout } from "../components/auth/layout/Layout";
import type { ReactElement } from "react";

/**
 * The CYFMSearch functional component.
 * @returns CYFMSearch component skeleton.
 */
const CYFMSearch = (): ReactElement => {
  return (
    <Layout>
      <Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box
            component="img"
            src="/img/heartInCircle.svg"
            height={75}
            width={75}
          />
          <Typography component="h2">
            Child, Youth, and Family Members
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            py: "3rem",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              maxWidth: 300,
              rowGap: "1rem",
            }}
          >
            <Button
              component="div"
              sx={{
                background: "lightgrey",
                color: "black",
                border: "1px solid black",
              }}
            >
              Register a Child, Youth, or Family Member
            </Button>
            <Button
              component="div"
              sx={{
                background: "lightgrey",
                color: "black",
                border: "1px solid black",
              }}
            >
              Search a Child, Youth, or Family Member
            </Button>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default CYFMSearch;
