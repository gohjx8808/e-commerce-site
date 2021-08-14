import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  imageListItem: {
    cursor: 'zoom-in',
  },
  imageListRoot: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    paddingTop: 10,
  },
});
