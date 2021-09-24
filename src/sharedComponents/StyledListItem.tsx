import ListItemButton from '@mui/material/ListItemButton';
import { styled } from '@mui/material/styles';

const StyledListItem = styled(ListItemButton)(({ theme }) => ({
  '&.MuiListItemButton-root': {
    '&.Mui-selected': {
      backgroundColor: theme.palette.secondary.main,
      '& .MuiIconButton-root, & .MuiTypography-root, & .MuiListItemIcon-root': {
        color: theme.palette.common.white,
      },
    },
  },
  '.MuiListItemIcon-root': {
    color: theme.palette.text.primary,
  },
  '.MuiListItemText-root': {
    color: theme.palette.text.primary,
  },
}));

export default StyledListItem;
