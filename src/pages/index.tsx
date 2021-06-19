import Grid from '@material-ui/core/Grid';
import { createMuiTheme } from '@material-ui/core/styles';
import * as React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import MenuBar from '../components/MenuBar';
import Products from '../components/Products/views/Products';
import SEO from '../components/SEO';

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
      <Grid container>
        <Grid item xs={12}>
          <SEO />
          <MenuBar />
          <Products />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default IndexPage;
