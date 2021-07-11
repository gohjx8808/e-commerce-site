import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React from 'react';

const Footer = () => (
  <AppBar position="static" color="primary">
    <Container maxWidth="md">
      <Toolbar>
        <Typography variant="body1" color="inherit">
          © 2021 yjartjournal
        </Typography>
      </Toolbar>
    </Container>
  </AppBar>
);

export default Footer;
