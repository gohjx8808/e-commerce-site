import FormControl from "@mui/material/FormControl";
import { styled } from "@mui/material/styles";

interface StyledAutocompleteFormControlProps {
  lightbg?: booleanInteger;
}

const StyledAutocompleteFormControl = styled(
  FormControl
)<StyledAutocompleteFormControlProps>(({ theme, lightbg }) => ({
  width: "100%",
  "& label": {
    color: !lightbg && theme.palette.common.white,
    "&.Mui-focused": {
      color: lightbg
        ? theme.palette.secondary.main
        : theme.palette.primary.main,
    },
  },
  "& .MuiOutlinedInput-root": {
    color: !lightbg && theme.palette.common.white,
    "& fieldset": {
      borderColor: !lightbg && theme.palette.common.white,
    },
    "&:hover fieldset": {
      borderColor: "lightgrey",
    },
    "&.Mui-focused fieldset": {
      borderColor: lightbg
        ? theme.palette.secondary.main
        : theme.palette.primary.main,
    },
    "&.Mui-error .MuiAutocomplete-endAdornment button": {
      color: theme.palette.error.main,
    },
    "& .MuiAutocomplete-endAdornment button": {
      color: !lightbg && theme.palette.common.white,
    },
  },
  "& .MuiInput-root": {
    color: !lightbg && theme.palette.common.white,
  },
}));

export default StyledAutocompleteFormControl;
