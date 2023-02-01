import FormControl from "@mui/material/FormControl";
import { styled } from "@mui/material/styles";

interface StyledFormControlProps {
  lightbg?: booleanInteger;
}

const StyledFormControl = styled(FormControl)<StyledFormControlProps>(
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
      "& input": {
        "&:-webkit-autofill": {
          transitionDelay: "9999s",
        },
        "&:-webkit-autofill::first-line": {
          fontFamily: "Sitka Display Semibold",
          fontSize: "1rem",
        },
        "::-ms-reveal": {
          display: "none",
        },
      },
    },
    "& .MuiFormHelperText-root": {
      color: !lightbg && theme.palette.common.white,
    },
  })
);

export default StyledFormControl;
