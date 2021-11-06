import AdapterDayjs from '@mui/lab/AdapterDayjs';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { PaletteMode } from '@mui/material';
import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { SnackbarProvider } from 'notistack';
import * as React from 'react';
import {
  useEffect, useMemo, useState,
} from 'react';
import { Provider } from 'react-redux';
import LoadingOverlay from '../modules/overlay/views/LoadingOverlay';
import EnlargedProductImageCarouselModal from '../modules/products/views/EnlargedProductImageCarouselModal';
import SEO from '../modules/SEO';
import StatusModal from '../modules/status/views/StatusModal';

import CustomSnackbar from '../sharedComponents/CustomSnackbar';
import store from '../store';
import DarkModeContext from '../utils/DarkModeContext';

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

type modeType = PaletteMode | 'system';

const isSSR = typeof window === 'undefined';

const RootLayout:React.FC = ({ children }) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = useState<PaletteMode>('light');
  const [displayTheme, setDisplayTheme] = useState<modeType>('system');

  const theme = useMemo(() => createTheme({
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
          contrastText: 'black',
        },
        customSecondary: {
          main: '#B67B5E',
        },
        primaryButton: {
          main: '#f5dbc9',
          contrastText: 'black',
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
  }), [mode]);

  useEffect(() => {
    if (displayTheme === 'system') {
      if (prefersDarkMode) {
        setMode('dark');
      } else {
        setMode('light');
      }
    } else {
      setMode(displayTheme);
    }
  }, [prefersDarkMode, displayTheme]);

  const toggleTheme = (selectedMode:modeType) => {
    setDisplayTheme(selectedMode);
  };

  return (
    <DarkModeContext.Provider value={{ toggleTheme, displayTheme }}>
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
            <Provider store={store}>
              {!isSSR && <SEO />}
              {children}
              <StatusModal />
              <LoadingOverlay />
              <EnlargedProductImageCarouselModal />
            </Provider>
          </LocalizationProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </DarkModeContext.Provider>
  );
};

export default RootLayout;
