import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useXsDownMediaQuery } from '../hooks';

const Footer = () => {
  const isSmView = useXsDownMediaQuery();

  return (
    <AppBar position="static" color="customPrimary" elevation={0}>
      <Container>
        <Toolbar disableGutters>
          {isSmView && (
            <>
              <IconButton aria-label="facebook" color="inherit" target="_blank" rel="noreferrer" href="https://www.facebook.com/YJartjournal.madewithlove/">
                <FacebookIcon />
              </IconButton>
              <IconButton aria-label="instagram" color="inherit" target="_blank" rel="noreferrer" href="https://www.instagram.com/yj_artjournal/">
                <InstagramIcon />
              </IconButton>
            </>
          )}
          <Typography variant="body1" color="inherit">
            © 2021 yjartjournal
          </Typography>
          <Box flexGrow={1} />
          {!isSmView && (
            <>
              <IconButton aria-label="facebook" color="inherit" target="_blank" rel="noreferrer" href="https://www.facebook.com/YJartjournal.madewithlove/">
                <FacebookIcon />
              </IconButton>
              <IconButton aria-label="instagram" color="inherit" target="_blank" rel="noreferrer" href="https://www.instagram.com/yj_artjournal/">
                <InstagramIcon />
              </IconButton>
              <IconButton aria-label="email" color="inherit" target="_blank" rel="noreferrer" href="mailto:yj.artjournal@gmail.com">
                <EmailIcon />
              </IconButton>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Footer;
