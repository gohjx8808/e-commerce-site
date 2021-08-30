import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&.MuiListItem-root.Mui-selected': {
      backgroundColor: theme.palette.secondary.main,
      '& .MuiIconButton-root, & .MuiTypography-root, & .MuiListItemIcon-root': {
        color: theme.palette.common.white,
      },
    },
    '& .MuiListItemIcon-root': {
      color: theme.palette.text.primary,
    },
  },
}))(MenuItem);

export default StyledMenuItem;
