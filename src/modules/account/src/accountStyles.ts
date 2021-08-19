import { makeStyles } from '@material-ui/core/styles';
import { homeColor, workColor } from '../../../utils/constants';

const accountStyles = makeStyles({
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
  inputFullWidth: {
    width: '100%!important',
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
});

export default accountStyles;
