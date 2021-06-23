import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  authenticationBgColor: {
    backgroundColor: theme.palette.primary.main,
    height: '100vh',
  },
  iconContainer: {
    margin: 'auto',
    width: '20%',
  },
  icon: {
    borderRadius: 10,
  },
}));
