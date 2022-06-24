import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { Layout } from "../../components/auth/layout/Layout";
import CYFMSHeader from "../../components/cyfms/CYFMSHeader";
import { Button, Grid, InputLabel, Link, Typography } from "@mui/material";
import theme from "../../lib/theme";

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Other = () => {
  return (
    <Layout>
      <CYFMSHeader />
      <Grid container spacing={0}>
        <Grid item xs={3} sm={10} md={1}>
          <Box
            sx={{
              textAlign: "left",
              mt: "-2ch",
              width: "100%",
              height: "70px",
            }}
          ></Box>
        </Grid>
        <Grid item xs={4} sm={6} md={1}>
          <Typography sx={{ ml: 2, mt: 4 }}>Identity</Typography>
          <Typography sx={{ ml: 2, mt: 1 }}>Contact</Typography>
          <Typography sx={{ ml: 2, mt: 1 }}>Houshhold Members</Typography>
          <Typography sx={{ ml: 2, mt: 1 }}>
            Education And Employement
          </Typography>
          <Typography sx={{ ml: 2, mt: 1 }}>Criminal History</Typography>
          <Typography sx={{ ml: 2, mt: 1 }}>Family Physician</Typography>
          <Typography sx={{ ml: 2, mt: 1 }}>Counselor/CFS Worker</Typography>
          <Typography sx={{ ml: 2, mt: 1, backgroundColor: "GrayText" }}>
            {" "}
            Other Information
          </Typography>
        </Grid>

        <Grid item xs={6} md={10}>
          <Grid container component="form" rowSpacing={0}>
            <Grid item xs={4} sm={2} md={12}>
              <Typography sx={{ ml: 2, mt: 4 }}>
                <Link href="Other Information" underline="hover">
                  Other Information
                </Link>
              </Typography>
            </Grid>
            <Grid item xs={8} sm={6} md={2}>
              <InputLabel>
                <Typography sx={{ ml: 2 }}>Strengths</Typography>
              </InputLabel>
            </Grid>
            <Grid item xs={8} sm={6} md={10}>
              <TextField
                fullWidth
                id="filled-basic"
                label=""
                variant="filled"
              />
            </Grid>
            <Grid item xs={8} sm={6} md={2}>
              <InputLabel>
                <Typography sx={{ ml: 2 }}>Weaknesses</Typography>
              </InputLabel>
            </Grid>
            <Grid item xs={8} sm={6} md={10}>
              <TextField
                fullWidth
                sx={{ mt: 1 }}
                id="filled-basic"
                label=""
                variant="filled"
              />
            </Grid>
            <Grid item xs={8} sm={6} md={2}>
              <InputLabel>
                <Typography sx={{ ml: 2 }}>Skills</Typography>
              </InputLabel>
            </Grid>
            <Grid item xs={8} sm={6} md={10}>
              <TextField
                fullWidth
                sx={{ mt: 1 }}
                id="filled-basic"
                label=""
                variant="filled"
              />
            </Grid>
            <Grid item xs={8} sm={6} md={2}>
              <InputLabel>
                <Typography sx={{ ml: 2 }}>Experiences</Typography>
              </InputLabel>
            </Grid>
            <Grid item xs={8} sm={6} md={10}>
              <TextField
                fullWidth
                sx={{ mt: 1 }}
                id="filled-basic"
                label=""
                variant="filled"
              />
            </Grid>
            <Grid item xs={8} sm={6} md={2}>
              <InputLabel>
                <Typography sx={{ ml: 2 }}>Effective Copying Skills</Typography>
              </InputLabel>
            </Grid>
            <Grid item xs={8} sm={6} md={10}>
              <TextField
                fullWidth
                sx={{ mt: 1 }}
                id="filled-basic"
                label=""
                variant="filled"
              />
            </Grid>
            <Grid item xs={4} md={10} />
            <Grid item xs={4} md={2}>
              <Button
                style={{
                  marginTop: "20px",
                  display: "flex",
                  flexFlow: "row Wrap",
                  height: "35px",
                  width: "100%",
                }}
                type="submit"
                variant="contained"
              >
                Next
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Other;
