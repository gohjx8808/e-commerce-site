import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';

const SmUpDivider = styled(Divider)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    display: 'block',
  },
  display: 'none',
}));

export default SmUpDivider;
