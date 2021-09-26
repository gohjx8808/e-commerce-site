import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

export default makeStyles((theme:Theme) => ({
  unFocusStyle: {
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'white',
    },
  },
  unFocusLabel: {
    color: 'white',
  },
  removedAutofillStyling: {
    '&.MuiOutlinedInput-input': {
      color: 'white',
      '&:-webkit-autofill': {
        transitionDelay: '9999s',
      },
      '&:-webkit-autofill::first-line': {
        fontFamily: 'Sitka Display Semibold',
        fontSize: '1rem',
      },
    },
  },
  container: {
    width: '100%',
  },
  errorColor: {
    color: `${theme.palette.error.main}!important`,
  },
  whiteIcon: {
    '&.MuiIconButton-root': {
      color: 'white',
    },
  },
  calendarWhite: {
    '& .MuiInputAdornment-root': {
      '& button': {
        color: 'white',
      },
    },
  },
  calendarError: {
    '& .MuiInputAdornment-root': {
      '& button': {
        color: theme.palette.error.main,
      },
    },
  },
}));
