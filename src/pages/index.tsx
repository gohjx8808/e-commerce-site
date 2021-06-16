import { Grid } from '@material-ui/core';
import * as React from 'react';
import MenuBar from '../components/MenuBar';
import Products from '../components/Products/views/Products';
import SEO from '../components/SEO';

const IndexPage = () => (
  <Grid container>
    <Grid item xs={12}>
      <SEO />
      <MenuBar />
      <Products />
    </Grid>
  </Grid>
);

export default IndexPage;
