import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { authLocalStorageKeys } from "@utils/localStorageKeys";
import { useEffect, useState } from "react";
import { getLocalStorageItem } from "./utils/helper";

const theme = useTheme;

export const useXsDownMediaQuery = () =>
  useMediaQuery(theme().breakpoints.only("xs"));

export const useIsLoggedIn = () =>
  !!getLocalStorageItem(authLocalStorageKeys.TOKEN) &&
  !!getLocalStorageItem(authLocalStorageKeys.USER);

export const usePathname = () => {
  const [pathname, setPathname] = useState<string>("/");

  useEffect(() => {
    setPathname(window.location.pathname);
  }, []);

  return pathname;
};
