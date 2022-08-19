import { styled } from "@mui/material/styles";

interface ProductImageProps {
  cart?: boolean;
  card?: boolean;
}

const excludedProps: PropertyKey[] = ["cart", "card"];

const ProductImage = styled("img", {
  shouldForwardProp: (prop) => !excludedProps.includes(prop),
})<ProductImageProps>(({ cart, card }) => ({
  borderRadius: card ? 0 : 5,
  width: cart ? "40%" : "100%",
}));

export default ProductImage;
