import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  createStyles,
  FormControl,
  InputLabel,
  makeStyles,
  TextField,
  Theme,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Carousel from 'react-material-ui-carousel';
import getStripe from '../../../utils/stripejs';

interface ProductCardOwnProps{
  product:products.productData
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const ProductCard = (props:ProductCardOwnProps) => {
  const classes = useStyles();
  const { product } = props;
  const [loading, setLoading] = useState(false);

  const { handleSubmit, register } = useForm({
    defaultValues: {
      priceID: product.prices.id,
    },
  });

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
    <Card
      style={{
        width: '18rem',
        boxShadow: '5px 5px 25px 0 rgba(46,61,73,.2)',
        backgroundColor: '#fff',
        borderRadius: '6px',
      }}
    >
      <CardHeader
        title={product.name}
      />
      <Carousel indicators={false}>
        {product.images.map((imageURL) => (
          <CardMedia
            key={imageURL}
            image={imageURL}
            title={product.name}
            component="img"
          />
        ))}
      </Carousel>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField {...register('priceID')} type="hidden" />
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
  );
};

export default ProductCard;
