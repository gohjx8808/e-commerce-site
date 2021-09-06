import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import { useTheme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import { makeStyles } from '@material-ui/styles';
import React from 'react';

const useStyle = makeStyles({
  grow: {
    flexGrow: 1,
  },
});

const Footer = () => {
  const styles = useStyle();
  const theme = useTheme();
  const isSmView = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <AppBar position="static" color="primary" elevation={0}>
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
          <Box className={styles.grow} />
          {!isSmView && (
            <>
              <IconButton aria-label="facebook" color="inherit" target="_blank" rel="noreferrer" href="https://www.facebook.com/YJartjournal.madewithlove/">
                <FacebookIcon />
              </IconButton>
              <IconButton aria-label="instagram" color="inherit" target="_blank" rel="noreferrer" href="https://www.instagram.com/yj_artjournal/">
                <InstagramIcon />
              </IconButton>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Footer;
