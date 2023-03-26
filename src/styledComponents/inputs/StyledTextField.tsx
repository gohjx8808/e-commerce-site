import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";

interface StyledTextFieldProps {
  lightBg?: boolean;
}

const StyledTextField = styled(TextField, {
  shouldForwardProp: prop => prop !== "lightBg",
})<StyledTextFieldProps>(
  ({ theme, lightBg }) => ({
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
      "& .MuiInputAdornment-root button": {
        color: !lightBg && theme.palette.common.white,
      },
      "&.Mui-error .MuiInputAdornment-root button": {
        color: theme.palette.error.main,
      },
    },
  })
);

export default StyledTextField;
