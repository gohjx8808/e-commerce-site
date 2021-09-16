import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  unFocusStyle: {
    color: 'white',
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'white',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: 'lightgrey',
    },
  },
  unFocusLabel: {
    color: 'white',
  },
  removedAutofillStyling: {
    '&:-webkit-autofill': {
      transitionDelay: '9999s',
    },
    '&:-webkit-autofill::first-line': {
      fontFamily: 'Sitka Display Semibold',
      fontSize: '1rem',
    },
  },
  container: {
    width: '100%',
  },
});
