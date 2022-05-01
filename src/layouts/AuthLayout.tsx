import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import React, { Suspense } from "react";
import Footer from "../modules/Footer";
import { isSSR } from "../utils/constants";

const AuthLayout = (props: parentComponent) => {
  const { children } = props;

  if (isSSR) {
    return <div />;
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
