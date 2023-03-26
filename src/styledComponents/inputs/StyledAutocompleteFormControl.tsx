import FormControl from "@mui/material/FormControl";
import { styled } from "@mui/material/styles";

interface StyledAutocompleteFormControlProps {
  lightBg?: boolean;
}

const StyledAutocompleteFormControl = styled(
  FormControl, {
  shouldForwardProp: prop => prop !== "lightBg",
}
)<StyledAutocompleteFormControlProps>(({ theme, lightBg }) => ({
  width: "100%",
  "& label": {
    color: !lightBg && theme.palette.common.white,
    "&.Mui-focused": {
      color: lightBg
        ? theme.palette.secondary.main
        : theme.palette.primary.main,
    },
  },
  "& .MuiOutlinedInput-root": {
    color: !lightBg && theme.palette.common.white,
    "& fieldset": {
      borderColor: !lightBg && theme.palette.common.white,
    },
    "&:hover fieldset": {
      borderColor: "lightgrey",
    },
    "&.Mui-focused fieldset": {
      borderColor: lightBg
        ? theme.palette.secondary.main
        : theme.palette.primary.main,
    },
    "&.Mui-error .MuiAutocomplete-endAdornment button": {
      color: theme.palette.error.main,
    },
    "& .MuiAutocomplete-endAdornment button": {
      color: !lightBg && theme.palette.common.white,
    },
  },
  "& .MuiInput-root": {
    color: !lightBg && theme.palette.common.white,
  },
}));

export default StyledAutocompleteFormControl;
