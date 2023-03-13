import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { navigate } from "gatsby";
import MainLayout from "../layouts/MainLayout";

const NotFoundPage = () => (
  <MainLayout>
    <Grid
      container
      display="flex"
      minHeight="80vh"
      justifyContent="center"
      alignItems="center"
      direction="column"
      spacing={5}
    >
      <Grid item>
        <Typography variant="h3" textAlign="center">
          Page not found
        </Typography>
        <Typography variant="h5" textAlign="center">
          Sorry 😔 we couldn’t find what you were looking for.
        </Typography>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          onClick={() => navigate("/")}
          color="primaryButton"
        >
          Back To Home
        </Button>
      </Grid>
    </Grid>
  </MainLayout>
);

export default NotFoundPage;
