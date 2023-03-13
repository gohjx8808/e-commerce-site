import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";

interface StyledTextFieldProps {
  lightbg?: booleanInteger;
}

const StyledTextField = styled(TextField)<StyledTextFieldProps>(
  ({ theme, lightbg }) => ({
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
      "& .MuiInputAdornment-root button": {
        color: !lightbg && theme.palette.common.white,
      },
      "&.Mui-error .MuiInputAdornment-root button": {
        color: theme.palette.error.main,
      },
    },
  })
);

export default StyledTextField;
