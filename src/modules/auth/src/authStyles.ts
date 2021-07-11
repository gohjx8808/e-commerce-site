import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  loginBg: {
    backgroundColor: theme.palette.primary.main,
    height: '100vh',
  },
  loginIconContainer: {
    width: '20%',
  },
  icon: {
    borderRadius: 200,
  },
  loginTitle: {
    color: 'white',
  },
  formContainer: {
    margin: theme.spacing(1),
    width: '100%',
  },
  loginBtn: {
    width: '20%',
  },
  spacingVertical: {
    marginTop: 10,
    marginBottom: 10,
  },
  signupIconContainer: {
    width: '10%',
  },
  fullWidthInput: {
    width: '90%!important',
  },
  signUpHeight: {
    backgroundColor: theme.palette.primary.main,
    height: '110vh',
  },
  loginCard: {
    width: '50%',
    backgroundColor: '#B67B5E',
  },
  signupCard: {
    width: '80%',
    backgroundColor: '#B67B5E',
  },
}));
