import { SnackbarProvider } from 'notistack';
import * as React from 'react';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDayjs from '@mui/lab/AdapterDayjs';
import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { PaletteMode } from '@mui/material';
import { useMemo } from 'react';
import App from './App';
import CustomSnackbar from '../sharedComponents/CustomSnackbar';

declare module '@mui/material/AppBar' {
  interface AppBarPropsColorOverrides {
    customPrimary: true;
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    primaryButton: true;
  }
}

declare module '@mui/material/styles' {
  interface Palette {
    customSecondary: Palette['primary'];
    customPrimary: Palette['primary'];
    primaryButton:Palette['primary'];
  }

  interface PaletteOptions {
    customSecondary: PaletteOptions['primary'];
    customPrimary: PaletteOptions['primary'];
    primaryButton: PaletteOptions['primary'];
  }
}

const IndexPage = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const getDesignTokens = (mode:PaletteMode) => ({
    palette: {
      mode,
      ...(mode === 'light' ? {
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
        customPrimary: {
          main: '#f5dbc9',
        },
        customSecondary: {
          main: '#B67B5E',
        },
        primaryButton: {
          main: '#f5dbc9',
        },
      } : {
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
          primary: '#f5dbc9',
        },
        customPrimary: {
          main: '#292421',
          contrastText: '#f5dbc9',
        },
        customSecondary: {
          main: '#7A6B62',
        },
        primaryButton: {
          main: '#B67B5E',
          contrastText: '#fff',
        },
      }),
    },
    typography: {
      fontFamily: 'Amaranth',
    },
    components: {
      MuiAppBar: {
        defaultProps: {
          enableColorOnDark: true,
        },
      },
    },
  });

  const theme = useMemo(() => createTheme(getDesignTokens(prefersDarkMode ? 'dark' : 'light')), [prefersDarkMode]);

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
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <App />
        </LocalizationProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default IndexPage;
