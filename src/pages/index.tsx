import Grid from '@material-ui/core/Grid';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import * as React from 'react';
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
      <Grid container>
        <Grid item xs={12}>
          <App />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default IndexPage;
