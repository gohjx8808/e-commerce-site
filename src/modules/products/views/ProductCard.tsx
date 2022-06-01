import { ProductContext } from "@contextProvider/ProductContextProvider";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { Link as GatsbyLink } from "gatsby";
import { useSnackbar } from "notistack";
import React, { memo, useContext } from "react";
import { useXsDownMediaQuery } from "../../../hooks";
import ProductPrice from "../../../styledComponents/products/ProductPrice";
import StyledProductCard from "../../../styledComponents/products/StyledProductCard";
import { formatPrice, getProductVariationSuffix } from "../../../utils/helper";
import "../src/carousel.css";
import ItemVariationMenu from "./ItemVariationMenu";
import ProductImageCarousel from "./ProductImageCarousel";

interface ProductCardOwnProps {
  product: products.productData;
}

const ProductCard = (props: ProductCardOwnProps) => {
  const { product } = props;
  const isXsView = useXsDownMediaQuery();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { addToCart } = useContext(ProductContext);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const { enqueueSnackbar } = useSnackbar();

  const isKeyChainSeries = product.category === "Keychain Series";

  const onAddToCart = (
    productData: products.productData,
    variation?: string
  ) => {
    const variationSuffix = getProductVariationSuffix(
      isKeyChainSeries,
      variation
    );
    const productName = productData.name + variationSuffix;
    addToCart(productData, isKeyChainSeries, 1, variation);
    enqueueSnackbar(`${productName} had been added to your cart!`);
  };

  const triggerItemVariationMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const onClickAddToCart = (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    event.preventDefault();
    if (product.category === "Keychain Series") {
      triggerItemVariationMenu(event);
    } else {
      onAddToCart(product);
    }
  };

  return (
    <Grid item lg={3} md={6} sm={6} xs={6}>
      <Link
        component={GatsbyLink}
        to={`/products/${product.contentful_id}`}
        color="secondary"
        underline="hover"
      >
        <StyledProductCard variant="outlined">
          <CardHeader
            title={product.name}
            sx={{ minHeight: { sm: 95, xs: 105 } }}
          />
          <Box onClick={(event) => event.preventDefault()}>
            <ProductImageCarousel
              imageList={product.productImage}
              productName={product.name}
              card
            />
          </Box>
          <CardContent sx={{ paddingBottom: "16px!important" }}>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item>
                <Grid container spacing={1} alignItems="center">
                  <Grid item>
                    <ProductPrice discountprice={product.discountedPrice}>
                      {formatPrice(product.price, "MYR")}
                    </ProductPrice>
                  </Grid>
                  {product.discountedPrice && (
                    <Grid item xs={12} sm>
                      <Grid
                        container
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Typography fontWeight="bold">
                          {formatPrice(product.discountedPrice, "MYR")}
                        </Typography>
                        {isXsView && (
                          <IconButton
                            aria-label="addToCart"
                            onClick={onClickAddToCart}
                            color="secondary"
                          >
                            <AddShoppingCartIcon />
                          </IconButton>
                        )}
                      </Grid>
                    </Grid>
                  )}
                </Grid>
              </Grid>
              {!(product.discountedPrice && isXsView) && (
                <IconButton
                  aria-label="addToCart"
                  onClick={onClickAddToCart}
                  color="secondary"
                >
                  <AddShoppingCartIcon />
                </IconButton>
              )}
            </Grid>
          </CardContent>
        </StyledProductCard>
      </Link>
      <ItemVariationMenu
        anchorEl={anchorEl}
        handleClose={handleClose}
        addToCart={(variation) => onAddToCart(product, variation)}
      />
    </Grid>
  );
};

export default memo(ProductCard);
