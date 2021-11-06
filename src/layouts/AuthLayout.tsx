import Grid from '@mui/material/Grid';
import React, { FC } from 'react';
import Footer from '../modules/Footer';

const AuthLayout:FC = (props) => {
  const { children } = props;

  return (
    <Grid container minHeight="100vh" direction="column">
      <Grid alignItems="center" display="flex" flexGrow={1} bgcolor="customPrimary.main">
        {children}
      </Grid>
      <Footer />
    </Grid>
  );
};

export default AuthLayout;
