import { createTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { SnackbarProvider } from 'notistack';
import * as React from 'react';
import App from './App';
import CustomSnackbar from '../sharedComponents/CustomSnackbar';

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
      text: {
        primary: '#6b3e2e',
      },
    },
    typography: {
      fontFamily: 'Sitka Display Semibold',
    },
  });

  return (
    <ThemeProvider theme={responsiveFontSizes(theme)}>
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
        <App />
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default IndexPage;
