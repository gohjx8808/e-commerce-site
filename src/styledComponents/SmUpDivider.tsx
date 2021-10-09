import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';

const SmUpDivider = styled(Divider)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    display: 'flex',
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
  },
  display: 'none',
}));

export default SmUpDivider;
