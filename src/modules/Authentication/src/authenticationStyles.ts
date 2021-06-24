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
}));
