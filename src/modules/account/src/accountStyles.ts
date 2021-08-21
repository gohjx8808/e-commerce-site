import { makeStyles } from '@material-ui/core/styles';
import { homeColor, workColor } from '../../../utils/constants';

const accountStyles = makeStyles((theme) => ({
  boldText: {
    fontWeight: 'bold',
  },
  verticalSpacing: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  editBtnTopSpacing: {
    paddingTop: 20,
  },
  editAccDetailActionBtnContainer: {
    padding: '20px!important',
  },
  modalSubmitContainer: {
    padding: 20,
  },
  topSpacing: {
    paddingTop: 20,
  },
  bottomSpacing: {
    paddingBottom: 20,
  },
  tagChipPadding: {
    paddingLeft: 10,
  },
  homeTagColor: {
    color: `${homeColor}!important`,
    borderColor: `${homeColor}!important`,
  },
  workTagColor: {
    color: `${workColor}!important`,
    borderColor: `${workColor}!important`,
  },
  defaultColor: {
    color: 'red!important',
    borderColor: 'red!important',
  },
  desktopView: {
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
    display: 'none',
  },
  mobileView: {
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
    },
    display: 'none',
  },
  noPaddingLeft: {
    [theme.breakpoints.down('xs')]: {
      paddingLeft: 0,
    },
  },
  accDetailsRoot: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  fullWidth: {
    width: '100%',
  },
  smUpView: {
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
    display: 'none',
  },
  xsFullWidth: {
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  lgUpView: {
    [theme.breakpoints.up('lg')]: {
      display: 'block',
    },
    display: 'none',
  },
  lgBottomSpacing: {
    [theme.breakpoints.up('lg')]: {
      paddingBottom: 20,
    },
  },
  mdDownBottomSpacing: {
    [theme.breakpoints.down('md')]: {
      paddingBottom: 20,
    },
  },
}));

export default accountStyles;
