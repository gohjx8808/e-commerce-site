import { useUID } from "@hooks";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import { navigate } from "gatsby";
import React, { Suspense } from "react";
import Footer from "../modules/Footer";

const AuthLayout = (props: parentComponent) => {
  const { children } = props;

  const isLoggedIn = useUID();

  if (isLoggedIn) {
    navigate("/");
  }

  return (
    <Suspense
      fallback={
        <Grid
          container
          display="flex"
          minHeight="100vh"
          justifyContent="center"
          alignItems="center"
        >
          <CircularProgress color="primary" size={60} />
        </Grid>
      }
    >
      <Box display="flex" minHeight="100vh" bgcolor="customPrimary.main">
        <Grid container direction="column">
          <Grid flexGrow={1} alignItems="center" display="flex">
            {children}
          </Grid>
          <Footer />
        </Grid>
      </Box>
    </Suspense>
  );
};

export default AuthLayout;
