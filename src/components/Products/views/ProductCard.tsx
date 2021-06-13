import {
  Button,
  Card,
  CardContent,
  CardHeader,
  createStyles,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  Theme,
} from '@material-ui/core';
import React, { useState } from 'react';
import getStripe from '../../../utils/stripejs';

interface ProductCardOwnProps{
  product:products.productDetails
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

  const formatPrice = (amount:number, currency:string) => {
    const price = parseFloat((amount / 100).toFixed(2));
    const numberFormat = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      currencyDisplay: 'symbol',
    });
    return numberFormat.format(price);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const price = new FormData(event.target).get('priceSelect');
    const stripe = await getStripe();
    console.log(await stripe.prices.list());
    // const { error } = await stripe.redirectToCheckout({
    //   mode: 'payment',
    //   lineItems: [{ price, quantity: 1 }],
    //   successUrl: `${window.location.origin}/page-2/`,
    //   cancelUrl: `${window.location.origin}/advanced`,
    // });

    if (error) {
      setLoading(false);
    }
  };

  console.log(product);

  return (
    <Card
      // border="info"
      style={{
        width: '18rem',
        boxShadow: '5px 5px 25px 0 rgba(46,61,73,.2)',
        backgroundColor: '#fff',
        borderRadius: '6px',
      }}
    >
      <CardContent>
        <form onSubmit={handleSubmit}>
          <CardHeader
            title={product.name}
          />
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-controlled-open-select-label">Age</InputLabel>
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              // open={open}
              // onClose={handleClose}
              // onOpen={handleOpen}
              // value={age}
              // onChange={handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
          <Button
            disabled={loading}
            className="btn btn-primary"
            type="submit"
          >
            BUY ME
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
