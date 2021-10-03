import ListItemButton, { ListItemButtonProps } from '@mui/material/ListItemButton';
import { styled } from '@mui/material/styles';

const StyledListItem = styled(ListItemButton)<ListItemButtonProps>(({ theme }) => ({
  color: theme.palette.text.primary,
  '&.MuiListItemButton-root': {
    '&.Mui-selected': {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.common.white,
      '& .MuiListItemIcon-root': {
        color: theme.palette.common.white,
      },
    },
  },
  '.MuiListItemIcon-root': {
    color: theme.palette.text.primary,
  },
}));

export default StyledListItem;
