import Grid from '@material-ui/core/Grid';
import { createMuiTheme } from '@material-ui/core/styles';
import * as React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { CartProvider } from 'use-shopping-cart';
import MenuBar from '../components/MenuBar';
import App from './App';
import SEO from '../components/SEO';
import getStripe from '../utils/stripejs';

const IndexPage = () => {
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#f5dbc9',
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
            <SEO />
            <MenuBar />
            <App />
          </Grid>
        </Grid>
      </CartProvider>
    </ThemeProvider>
  );
};

export default IndexPage;
