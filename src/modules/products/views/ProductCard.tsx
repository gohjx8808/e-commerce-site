import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { AddShoppingCart } from '@material-ui/icons';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { useSnackbar } from 'notistack';
import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { useAppDispatch } from '../../../hooks';
import { addToShoppingCart } from '../src/productReducers';
import productStyle from '../src/productStyle';

interface ProductCardOwnProps{
  product:products.productData
}

const ProductCard = (props:ProductCardOwnProps) => {
  const { product } = props;
  const styles = productStyle();
  const dispatch = useAppDispatch();

  const formatPrice = (amount:number, currency:string) => {
    const price = parseFloat((amount / 100).toFixed(2));
    const numberFormat = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      currencyDisplay: 'symbol',
    });
    return numberFormat.format(price);
  };

  // const onSubmit = async (hookData:products.submitCheckoutPayload) => {
  //   setLoading(true);
  //   const stripe = await getStripe();
  //   const { error } = await stripe!.redirectToCheckout({
  //     mode: 'payment',
  //     lineItems: [{ price: hookData.priceID, quantity: 1 }],
  //     successUrl: `${window.location.origin}/page-2/`,
  //     cancelUrl: `${window.location.origin}/advanced`,
  //   });

  //   if (error) {
  //     setLoading(false);
  //   }
  // };

  const { enqueueSnackbar } = useSnackbar();

  const onAddToCart = (productData:products.productData) => {
    const formattedData:products.shoppingCartItemData = {
      id: productData.id,
      name: productData.name,
      imgURL: productData.localFiles,
      price: (+productData.prices.unit_amount_decimal / 100).toFixed(2),
      quantity: 1,
    };
    dispatch(addToShoppingCart(formattedData));
    enqueueSnackbar(`${productData.name} is added to your cart!`);
  };

  return (
    <Grid item lg={3} md={6} sm={12} xs={12}>
      <Card variant="outlined" className={styles.productCard}>
        <CardHeader title={product.name} className={styles.cardTitle} />
        <Carousel indicators={false}>
          {product.localFiles.map((localFile) => {
            const imageData = getImage(localFile)!;
            return (
              <Box className={styles.carouselImageContainer} key={imageData.images.fallback?.src}>
                <GatsbyImage
                  image={imageData}
                  alt={product.name}
                />
              </Box>
            );
          })}
        </Carousel>
        <CardContent>
          <Grid container justify="space-between" alignItems="center">
            <Typography className={styles.priceText}>
              {`Price: ${formatPrice(product.prices.unit_amount, product.prices.currency)}`}
            </Typography>
            <IconButton aria-label="addToCart" size="medium" onClick={() => onAddToCart(product)}>
              <AddShoppingCart fontSize="inherit" className={styles.shoppingCartIcon} />
            </IconButton>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ProductCard;
