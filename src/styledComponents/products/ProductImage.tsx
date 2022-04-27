import { styled } from "@mui/material/styles";
import { GatsbyImage } from "gatsby-plugin-image";

interface ProductImageProps {
  cart?: boolean;
  card?: boolean;
}

const ProductImage = styled(GatsbyImage)<ProductImageProps>(
  ({ cart, card }) => ({
    borderRadius: card ? 0 : 5,
    width: cart ? "40%" : "100%",
  })
);

export default ProductImage;
