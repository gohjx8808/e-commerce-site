import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export default makeStyles((theme:Theme) => ({
  componentTopSpacing: {
    marginTop: '80px!important',
  },
  componentBottomSpacing: {
    marginBottom: '80px!important',
  },
  componentHalfTopSpacing: {
    marginTop: '40px!important',
  },
  componentHalfBottomSpacing: {
    marginBottom: '40px!important',
  },
  componentQuarterTopSpacing: {
    marginTop: '20px!important',
  },
  componentQuarterBottomSpacing: {
    marginBottom: '20px!important',
  },
  italicText: {
    fontStyle: 'italic',
  },
  boldText: {
    fontWeight: 'bold',
  },
  underlinedText: {
    textDecorationLine: 'underline',
  },
  centerText: {
    textAlign: 'center',
  },
  justifyText: {
    textAlign: 'justify',
    [theme.breakpoints.down('xs')]: {
      whiteSpace: 'pre-wrap',
    },
  },
  white: {
    color: 'white!important',
  },
}));
