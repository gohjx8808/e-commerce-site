import ProductContextProvider from "@contextProvider/ProductContextProvider";
import StatusModalContextProvider from "@contextProvider/StatusModalContextProvider";
import { PaletteMode } from "@mui/material";
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { ReactQueryDevtools } from 'react-query/devtools'
import { SnackbarProvider } from "notistack";
import { useEffect, useMemo, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import EnlargedProductImageCarouselModal from "../modules/products/views/EnlargedProductImageCarouselModal";
import StatusModal from "../modules/status/views/StatusModal";
import CustomSnackbar from "../sharedComponents/CustomSnackbar";
import DarkModeContext from "../utils/DarkModeContext";

declare module "@mui/material/AppBar" {
  interface AppBarPropsColorOverrides {
    customPrimary: true;
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    primaryButton: true;
    whiteButton: true;
  }
}

declare module "@mui/material/styles" {
  interface Palette {
    customSecondary: Palette["primary"];
    customPrimary: Palette["primary"];
    primaryButton: Palette["primary"];
  }

  interface PaletteOptions {
    customSecondary: PaletteOptions["primary"];
    customPrimary: PaletteOptions["primary"];
    primaryButton: PaletteOptions["primary"];
  }
}

type modeType = PaletteMode | "system";

const RootLayout = (props: parentComponent) => {
  const { children } = props;
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [mode, setMode] = useState<PaletteMode>("light");
  const [displayTheme, setDisplayTheme] = useState<modeType>("system");
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 1,
      },
    },
  });

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "light"
            ? {
                primary: {
                  main: "#f5dbc9",
                },
                error: {
                  main: "#EF9A9A",
                },
                secondary: {
                  main: "#B67B5E",
                },
                text: {
                  primary: "#6b3e2e",
                },
                customPrimary: {
                  main: "#f5dbc9",
                  contrastText: "#38261d",
                },
                customSecondary: {
                  main: "#B67B5E",
                },
                primaryButton: {
                  main: "#f5dbc9",
                  contrastText: "black",
                },
                whiteButton: {
                  main: "white",
                  contrastText: "#B67B5E",
                },
              }
            : {
                primary: {
                  main: "#f5dbc9",
                },
                error: {
                  main: "#EF9A9A",
                },
                secondary: {
                  main: "#B67B5E",
                },
                text: {
                  primary: "#f5dbc9",
                },
                customPrimary: {
                  main: "#292421",
                  contrastText: "#f5dbc9",
                },
                customSecondary: {
                  main: "#7A6B62",
                },
                primaryButton: {
                  main: "#B67B5E",
                  contrastText: "#fff",
                },
                whiteButton: {
                  main: "black",
                  contrastText: "#f5dbc9",
                },
              }),
        },
        typography: {
          fontFamily: "Amaranth",
        },
        components: {
          MuiAppBar: {
            defaultProps: {
              enableColorOnDark: true,
            },
          },
        },
      }),
    [mode]
  );

  useEffect(() => {
    if (displayTheme === "system") {
      if (prefersDarkMode) {
        setMode("dark");
      } else {
        setMode("light");
      }
    } else {
      setMode(displayTheme);
    }
  }, [prefersDarkMode, displayTheme]);

  const toggleTheme = (selectedMode: modeType) => {
    setDisplayTheme(selectedMode);
  };

  return (
    <DarkModeContext.Provider value={{ toggleTheme, displayTheme }}>
      <ThemeProvider theme={responsiveFontSizes(theme)}>
        <SnackbarProvider
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          autoHideDuration={3000}
          content={(key, message) => (
            <CustomSnackbar id={key} message={message} />
          )}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <QueryClientProvider client={queryClient}>
              <ProductContextProvider>
                <StatusModalContextProvider>
                  {children}
                  <StatusModal />
                  <EnlargedProductImageCarouselModal />
                  <ReactQueryDevtools />
                </StatusModalContextProvider>
              </ProductContextProvider>
            </QueryClientProvider>
          </LocalizationProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </DarkModeContext.Provider>
  );
};

export default RootLayout;
