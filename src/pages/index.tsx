import Grid from '@material-ui/core/Grid';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import * as React from 'react';
import { CartProvider } from 'use-shopping-cart';
import getStripe from '../utils/stripejs';
import App from './App';

const IndexPage = () => {
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#f5dbc9',
      },
      error: {
        main: '#EF9A9A',
      },
      secondary: {
        main: '#B67B5E',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CartProvider
        mode="client-only"
        stripe={getStripe()}
        successUrl="stripe.com"
        cancelUrl="twitter.com/dayhaysoos"
        currency="MYR"
      >
        <Grid container>
          <Grid item xs={12}>
            <App />
          </Grid>
        </Grid>
      </CartProvider>
    </ThemeProvider>
  );
};

export default IndexPage;
