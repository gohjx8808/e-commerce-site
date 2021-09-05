import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
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
}));
