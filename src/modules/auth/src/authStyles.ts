import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

export default makeStyles((theme:Theme) => ({
  loginIconContainer: {
    [theme.breakpoints.down('xs')]: {
      width: '30%',
    },
    width: '20%',
  },
  icon: {
    borderRadius: 200,
  },
  whiteText: {
    color: 'white',
  },
  loginBtn: {
    [theme.breakpoints.down('xs')]: {
      paddingRight: 20,
      paddingLeft: 20,
    },
    paddingRight: 40,
    paddingLeft: 40,
  },
  spacingVertical: {
    marginTop: 10,
    marginBottom: 10,
  },
  signupIconContainer: {
    [theme.breakpoints.down('xs')]: {
      width: '40%',
    },
    width: '10%',
  },
  cardBg: {
    backgroundColor: theme.palette.secondary.main,
  },
  signoutModalActionContainer: {
    padding: '20px!important',
  },
  topSpacing: {
    paddingTop: 20,
  },
  noTopPadding: {
    paddingTop: '0px!important',
    paddingBottom: '20px!important',
  },
  noBottomPadding: {
    paddingBottom: '0px!important',
  },
  minorTopSpacing: {
    paddingTop: 5,
  },
}));
