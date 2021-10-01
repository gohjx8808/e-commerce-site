import { styled } from '@mui/material/styles';
import { SnackbarContent } from 'notistack';

const StyledSnackbarContent = styled(SnackbarContent)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    minWidth: '344px !important',
  },
  [theme.breakpoints.down('xs')]: {
    marginBottom: 90,
  },
}));

export default StyledSnackbarContent;
