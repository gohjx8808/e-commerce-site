import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  authenticationBgColor: {
    backgroundColor: theme.palette.primary.main,
    height: '100vh',
  },
  iconContainer: {
    width: '20%',
  },
  icon: {
    borderRadius: 100,
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
}));
