import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { useXsDownMediaQuery } from '../hooks';

const useStyle = makeStyles({
  grow: {
    flexGrow: 1,
  },
});

const Footer = () => {
  const styles = useStyle();
  const isSmView = useXsDownMediaQuery();

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
