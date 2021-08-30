import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&.MuiListItem-root.Mui-selected': {
      backgroundColor: theme.palette.secondary.main,
      '& .MuiIconButton-root, & .MuiTypography-root': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

export default StyledMenuItem;
