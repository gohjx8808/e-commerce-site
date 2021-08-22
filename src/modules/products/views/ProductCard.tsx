import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { AddShoppingCart } from '@material-ui/icons';
import clsx from 'clsx';
import {
  GatsbyImage, getImage, ImageDataLike,
} from 'gatsby-plugin-image';
import { useSnackbar } from 'notistack';
import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { useAppDispatch } from '../../../hooks';
import { formatPrice } from '../../../utils/helper';
import {
  addToShoppingCart,
  toggleEnlargedProductImageModal,
  updateSelectedProductImage,
  updateSelectedProductImageList,
} from '../src/productReducers';
import productStyle from '../src/productStyle';

interface ProductCardOwnProps{
  product:products.productData
}

const ProductCard = (props:ProductCardOwnProps) => {
  const { product } = props;
  const styles = productStyle();
  const dispatch = useAppDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const onAddToCart = (productData:products.productData) => {
    const formattedData = {
      id: productData.contentful_id,
      name: productData.name,
      img: getImage(productData.productImage[0]),
      price: productData.price.toFixed(2),
      quantity: 1,
    } as products.shoppingCartItemData;
    dispatch(addToShoppingCart(formattedData));
    enqueueSnackbar(`${productData.name} is added to your cart!`);
  };

  const triggerEnlargeImage = (imageData:ImageDataLike, carouselImageList:ImageDataLike[]) => {
    dispatch(updateSelectedProductImage(imageData));
    dispatch(updateSelectedProductImageList(carouselImageList));
    dispatch(toggleEnlargedProductImageModal(true));
  };

  return (
    <Grid item lg={3} md={6} sm={6} xs={6}>
      <Card variant="outlined" className={styles.productCard}>
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
                onClick={() => triggerEnlargeImage(image, product.productImage)}
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
                  <>
                    <Grid item>
                      <Typography className={styles.discountedPriceText}>
                        {formatPrice(product.discountedPrice, 'MYR')}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Chip className={styles.dicountMarginChip} label={`-${(((product.price - product.discountedPrice) / product.price) * 100).toFixed(0)}%`} />
                    </Grid>
                  </>
                )}
              </Grid>
            </Grid>
            <IconButton aria-label="addToCart" onClick={() => onAddToCart(product)} className={styles.shoppingCartBtn}>
              <AddShoppingCart fontSize="inherit" className={styles.shoppingCartIcon} />
            </IconButton>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ProductCard;
