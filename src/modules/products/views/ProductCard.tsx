import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import { useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import clsx from 'clsx';
import {
  GatsbyImage, getImage, ImageDataLike,
} from 'gatsby-plugin-image';
import { useSnackbar } from 'notistack';
import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { useAppDispatch } from '../../../hooks';
import { formatPrice, getProductVariationSuffix } from '../../../utils/helper';
import {
  addToShoppingCart,
  toggleEnlargedProductImageModal,
  updateSelectedProductImage,
  updateSelectedProductImageList,
} from '../src/productReducers';
import productStyle from '../src/productStyle';
import ItemVariationMenu from './ItemVariationMenu';

interface ProductCardOwnProps{
  product:products.productData
}

const ProductCard = (props:ProductCardOwnProps) => {
  const { product } = props;
  const styles = productStyle();
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isXsView = useMediaQuery(theme.breakpoints.down('xs'));
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const { enqueueSnackbar } = useSnackbar();

  const isKeyChainSeries = product.category === 'Keychain Series';

  const onAddToCart = (productData:products.productData, variation?:string) => {
    const variationSuffix = getProductVariationSuffix(isKeyChainSeries, variation!);
    const productName = productData.name + variationSuffix;
    const formattedData = {
      id: productData.contentful_id + variationSuffix,
      name: productName,
      img: getImage(productData.productImage[0]),
      price: productData.discountedPrice
        ? productData.discountedPrice.toFixed(2) : productData.price.toFixed(2),
      quantity: 1,
    } as products.shoppingCartItemData;
    dispatch(addToShoppingCart(formattedData));
    enqueueSnackbar(`${productName} had been added to your cart!`);
  };

  const triggerItemVariationMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const triggerEnlargeImage = (
    imageData:ImageDataLike,
    carouselImageList:ImageDataLike[],
    event:React.MouseEvent<HTMLElement, MouseEvent>,
  ) => {
    event.stopPropagation();
    dispatch(updateSelectedProductImage(imageData));
    dispatch(updateSelectedProductImageList(carouselImageList));
    dispatch(toggleEnlargedProductImageModal(true));
  };

  const onClickAddToCart = (
    event:React.MouseEvent<HTMLElement, MouseEvent>,
  ) => {
    event.stopPropagation();
    if (product.category === 'Keychain Series') {
      triggerItemVariationMenu(event);
    } else {
      onAddToCart(product);
    }
  };

  const openDescription = () => {
    window.open(`${window.location.origin}/products/${product.contentful_id}`);
  };

  return (
    <Grid item lg={3} md={6} sm={6} xs={6}>
      <Card variant="outlined" className={styles.productCard} onClick={openDescription}>
        <CardHeader
          title={product.name}
          className={styles.productNameContainer}
          titleTypographyProps={{ className: styles.productName }}
        />
        <Carousel
          indicators={false}
          autoPlay={false}
          navButtonsProps={{
            className: styles.productCardCarouselNavButton,
            style: {},
          }}
        >
          {product.productImage.map((image) => {
            const imageData = getImage(image)!;
            return (
              <Box
                className={styles.carouselImageContainer}
                key={imageData.images.fallback?.src}
                onClick={(event) => triggerEnlargeImage(image, product.productImage, event)}
              >
                <GatsbyImage
                  image={imageData}
                  alt={product.name}
                />
              </Box>
            );
          })}
        </Carousel>
        <CardContent className={styles.noPaddingBottomContent}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Grid container spacing={1} alignItems="center">
                <Grid item>
                  <Typography className={clsx(styles.priceText, {
                    [styles.dicountedPriceOriText]: product.discountedPrice,
                  })}
                  >
                    {formatPrice(product.price, 'MYR')}
                  </Typography>
                </Grid>
                {product.discountedPrice && (
                  <Grid item xs={12} sm>
                    <Grid container justifyContent="space-between" alignItems="center">
                      <Typography className={styles.discountedPriceText}>
                        {formatPrice(product.discountedPrice, 'MYR')}
                      </Typography>
                      {isXsView && (
                        <IconButton
                          aria-label="addToCart"
                          onClick={onClickAddToCart}
                          className={styles.shoppingCartBtn}
                        >
                          <AddShoppingCartIcon fontSize="inherit" className={styles.shoppingCartIcon} />
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
                className={styles.shoppingCartBtn}
              >
                <AddShoppingCartIcon fontSize="inherit" className={styles.shoppingCartIcon} />
              </IconButton>
            )}
          </Grid>
        </CardContent>
      </Card>
      <ItemVariationMenu
        anchorEl={anchorEl}
        handleClose={handleClose}
        addToCart={(variation) => onAddToCart(product, variation)}
      />
    </Grid>
  );
};

export default ProductCard;
