import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const theme = useTheme;
// eslint-disable-next-line import/prefer-default-export
export const useXsDownMediaQuery = () =>
  useMediaQuery(theme().breakpoints.only("xs"));
