import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';

interface CartItemGridProps{
  index:number
}

const CartItemGrid = styled(Grid)<CartItemGridProps>(({ theme, index }) => ({
  justifyContent: 'center',
  alignItems: 'center',
  paddingTop: theme.spacing(2),
  marginBottom: theme.spacing(4),
  borderTop: index !== 0 ? `1px solid ${theme.palette.secondary.main}` : '',
}));

export default CartItemGrid;
