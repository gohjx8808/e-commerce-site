import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

interface ProductPriceProps{
  discountPrice:number
}

const ProductPrice = styled(Typography)<ProductPriceProps>(({ theme, discountPrice }) => ({
  color: !discountPrice ? theme.palette.secondary.main : 'grey',
  fontWeight: !discountPrice ? 'bold' : 'normal',
  textDecoration: discountPrice ? 'line-through' : '',
  textDecorationColor: discountPrice ? 'grey' : '',
}));

export default ProductPrice;
