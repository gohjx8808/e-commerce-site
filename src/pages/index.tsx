import Grid from '@material-ui/core/Grid';
import { createTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { SnackbarProvider } from 'notistack';
import * as React from 'react';
import CustomSnackbar from '../sharedComponents/CustomSnackbar';
import App from './App';

const IndexPage = () => {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#f5dbc9',
      },
      error: {
        main: '#EF9A9A',
      },
      secondary: {
        main: '#B67B5E',
      },
    },
    typography: {
      fontFamily: 'Sitka Display Semibold',
    },
  });

  return (
    <SnackbarProvider
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      autoHideDuration={3000}
      content={(key, message) => (
        <CustomSnackbar id={key} message={message} />
      )}
    >
      <ThemeProvider theme={theme}>
        <Grid container>
          <Grid item xs={12}>
            <App />
          </Grid>
        </Grid>
      </ThemeProvider>
    </SnackbarProvider>
  );
};

export default IndexPage;
