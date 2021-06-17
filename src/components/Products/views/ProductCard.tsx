import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
  Box,
} from '@material-ui/core';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Carousel from 'react-material-ui-carousel';
import ControlledTextInput from '../../../sharedComponents/ControlledTextInput';
import getStripe from '../../../utils/stripejs';
import productStyle from '../src/productStyle';

interface ProductCardOwnProps{
  product:products.productData
}

const ProductCard = (props:ProductCardOwnProps) => {
  const { product } = props;
  const [loading, setLoading] = useState(false);
  const styles = productStyle();

  const { handleSubmit, control } = useForm();

  const formatPrice = (amount:number, currency:string) => {
    const price = parseFloat((amount / 100).toFixed(2));
    const numberFormat = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      currencyDisplay: 'symbol',
    });
    return numberFormat.format(price);
  };

  const onSubmit = async (hookData:products.submitCheckoutPayload) => {
    setLoading(true);
    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout({
      mode: 'payment',
      lineItems: [{ price: hookData.priceID, quantity: 1 }],
      successUrl: `${window.location.origin}/page-2/`,
      cancelUrl: `${window.location.origin}/advanced`,
    });

    if (error) {
      setLoading(false);
    }
  };

  return (
    <Grid item lg={3} md={6} sm={12} xs={12}>
      <Card variant="outlined" className={styles.productCard}>
        <CardHeader title={product.name} />
        <Carousel indicators={false}>
          <Grid container justify="center">
            {product.localFiles.map((localFile) => {
              const imageData = getImage(localFile)!;
              return (
                <Box style={{ height: 250 }}>
                  <GatsbyImage
                    image={imageData}
                    alt={product.name}
                    key={imageData.images.fallback?.src}
                    objectFit="fill"
                  />
                </Box>
              );
            })}
          </Grid>
        </Carousel>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ControlledTextInput type="hidden" defaultValue={product.prices.id} control={control} name="priceID" />
            <Typography>
              Price:
              {formatPrice(product.prices.unit_amount, product.prices.currency)}
            </Typography>
            <Button
              disabled={loading}
              type="submit"
              variant="contained"
              color="primary"
            >
              BUY ME
            </Button>
          </form>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ProductCard;
