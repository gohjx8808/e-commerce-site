import Container from '@material-ui/core/Container';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import authenticationStyles from '../src/authenticationStyles';

interface AuthenticationLayoutOwnProps{
  children:React.ReactElement
}

const AuthenticationLayout = (props:AuthenticationLayoutOwnProps) => {
  const { children } = props;
  const styles = authenticationStyles();

  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      className={styles.authenticationBgColor}
    >
      {children}
    </Grid>
  );
};

export default AuthenticationLayout;
