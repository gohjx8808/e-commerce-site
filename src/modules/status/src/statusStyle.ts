import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  backdropRoot: {
    zIndex: theme.zIndex.drawer + 1,
  },
  statusBgImgContainer: {
    [theme.breakpoints.up('lg')]: {
      width: '50%',
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
    width: '80%',
  },
  statusTitle: {
    [theme.breakpoints.down('xs')]: {
      fontSize: 20,
    },
    fontWeight: 'bold',
    fontSize: 40,
    textShadow: '0px 2px grey',
  },
  statusMsg: {
    [theme.breakpoints.down('xs')]: {
      fontSize: 20,
      paddingBottom: 5,
    },
    fontSize: 30,
    paddingBottom: 20,
    textShadow: '0px 2px grey',
  },
  absolutePos: {
    position: 'absolute',
    [theme.breakpoints.up('sm')]: {
      paddingTop: 20,
    },
  },
  statusBtn: {
    [theme.breakpoints.down('xs')]: {
      padding: '5px 5px 5px 5px',
    },
    padding: '10px 20px 10px 20px',
  },
}));
