import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

interface ProductPriceProps {
  discountprice?: number;
}

const ProductPrice = styled(Typography)<ProductPriceProps>(
  ({ discountprice }) => ({
    color: !discountprice ? "" : "grey",
    fontWeight: !discountprice ? "bold" : "normal",
    textDecoration: discountprice ? "line-through" : "",
    textDecorationColor: discountprice ? "grey" : "",
  })
);

export default ProductPrice;
