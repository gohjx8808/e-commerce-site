import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  loginBg: {
    backgroundColor: theme.palette.primary.main,
    [theme.breakpoints.down('xs')]: {
      height: '95vh',
    },
    height: '100vh',
  },
  loginIconContainer: {
    [theme.breakpoints.down('xs')]: {
      width: '30%',
    },
    width: '20%',
  },
  icon: {
    borderRadius: 200,
  },
  loginTitle: {
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
  signUpHeight: {
    backgroundColor: theme.palette.primary.main,
    [theme.breakpoints.only('xs')]: {
      alignItems: 'flex-start',
      height: '195vh',
    },
    height: '110vh',
  },
  errorSignUpHeight: {
    backgroundColor: theme.palette.primary.main,
    [theme.breakpoints.only('xs')]: {
      alignItems: 'flex-start',
      height: '220vh',
    },
    height: '120vh',
  },
  loginCard: {
    backgroundColor: '#B67B5E',
  },
  signupCard: {
    width: '80%',
    backgroundColor: '#B67B5E',
  },
  signoutModalActionContainer: {
    padding: '20px!important',
  },
}));
