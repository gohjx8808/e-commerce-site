import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import { Link as GatsbyLink } from "gatsby";
import Typography from "@mui/material/Typography";
import { GatsbyImage, getImage, ImageDataLike } from "gatsby-plugin-image";
import { useSnackbar } from "notistack";
import React, { memo } from "react";
import { Carousel } from "react-responsive-carousel";
import { useAppDispatch, useXsDownMediaQuery } from "../../../hooks";
import ProductPrice from "../../../styledComponents/products/ProductPrice";
import StyledProductCard from "../../../styledComponents/products/StyledProductCard";
import { formatPrice, getProductVariationSuffix } from "../../../utils/helper";
import {
  toggleEnlargedProductImageModal,
  updateSelectedProductImage,
  updateSelectedProductImageList,
} from "../src/productReducers";
import ItemVariationMenu from "./ItemVariationMenu";
import "../src/carousel.css";
import { productLocalStorageKeys } from "../src/productConstants";
import { addToCart } from "../src/productUtils";

interface ProductCardOwnProps {
  product: products.productData;
}

const ProductCard = (props: ProductCardOwnProps) => {
  const { product } = props;
  const dispatch = useAppDispatch();
  const isXsView = useXsDownMediaQuery();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const { enqueueSnackbar } = useSnackbar();

  const isKeyChainSeries = product.category === "Keychain Series";

  const onAddToCart = (
    productData: products.productData,
    variation?: string
  ) => {
    // const shoppingCart: products.shoppingCartItemData[] = JSON.parse(
    //   String(localStorage.getItem(productLocalStorageKeys.shoppingCart))
    // );
    const variationSuffix = getProductVariationSuffix(
      isKeyChainSeries,
      variation
    );
    const productName = productData.name + variationSuffix;
    addToCart(productData, isKeyChainSeries, 1, variation);
    // const formattedData = {
    //   id: productData.contentful_id + variationSuffix,
    //   name: productName,
    //   img: getImage(productData.productImage[0]),
    //   price: productData.discountedPrice
    //     ? productData.discountedPrice.toFixed(2)
    //     : productData.price.toFixed(2),
    //   quantity: 1,
    //   itemPrice: productData.discountedPrice
    //     ? productData.discountedPrice.toFixed(2)
    //     : productData.price.toFixed(2),
    // };
    // const targetIndex = shoppingCart.findIndex(
    //   (item) => item.id === formattedData.id
    // );
    // // no same item in cart storage
    // if (targetIndex === -1) {
    //   shoppingCart.push(formattedData);
    // } else {
    //   shoppingCart[targetIndex].quantity += 1;
    //   shoppingCart[targetIndex].itemPrice += formattedData.price;
    // }
    // localStorage.setItem(
    //   productLocalStorageKeys.shoppingCart,
    //   JSON.stringify(shoppingCart)
    // );
    enqueueSnackbar(`${productName} had been added to your cart!`);
  };

  const triggerItemVariationMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const triggerEnlargeImage = (
    imageData: ImageDataLike,
    carouselImageList: ImageDataLike[],
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    event.preventDefault();
    dispatch(updateSelectedProductImage(imageData));
    dispatch(updateSelectedProductImageList(carouselImageList));
    dispatch(toggleEnlargedProductImageModal(true));
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
          <Carousel
            showIndicators={false}
            infiniteLoop
            animationHandler="fade"
            showThumbs={false}
            showStatus={false}
            transitionTime={800}
          >
            {product.productImage.map((image) => {
              const imageData = getImage(image)!;
              return (
                <Box
                  sx={{ cursor: "zoom-in" }}
                  key={imageData.images.fallback?.src}
                  onClick={(event) =>
                    triggerEnlargeImage(image, product.productImage, event)
                  }
                >
                  <GatsbyImage image={imageData} alt={product.name} />
                </Box>
              );
            })}
          </Carousel>
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
