import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { navigate } from 'gatsby';
import React, {
  FC, ReactNode, Suspense, useEffect,
} from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { useAppSelector } from '../hooks';
import Footer from '../modules/Footer';
import MenuBar from '../modules/MenuBar';
import ScrollTop from '../sharedComponents/ScrollTop';
import routeNames from '../utils/routeNames';
import HomeBanner from '../modules/home/HomeBanner';
import { isSSR } from '../utils/constants';

interface MainLayoutOwnProps{
  pageBannerTitle?:string,
  homeCarouselBanner?:boolean,
  children:ReactNode
}

const MainLayout:FC<MainLayoutOwnProps> = (props) => {
  const {
    children, pageBannerTitle, homeCarouselBanner,
  } = props;
  const currentUserDetail = useAppSelector((state) => state.auth.currentUser);

  useEffect(() => {
    if (!isSSR && window.location.pathname === routeNames.account) {
      if (currentUserDetail.uid === '') {
        navigate('/');
      }
    }
  }, [currentUserDetail.uid]);

  return (
    <>
      {!isSSR && (
        <Suspense
          fallback={(
            <Grid container display="flex" minHeight="100vh" justifyContent="center" alignItems="center">
              <CircularProgress color="primary" size={60} />
            </Grid>
          )}
        >
          <Box display="flex" minHeight="100vh">
            <MenuBar />
            <Grid container direction="column">
              <Grid flexGrow={1}>
                <div id="back-to-top-anchor" />
                <Toolbar />
                {homeCarouselBanner && <HomeBanner />}
                {pageBannerTitle && (
                <Grid item xs={12} padding={1} bgcolor="customSecondary.main">
                  <Grid container justifyContent="center" alignItems="center">
                    <Typography variant="h4" color="white">{pageBannerTitle}</Typography>
                  </Grid>
                </Grid>
                )}
                <Box margin={3}>
                  {children}
                </Box>
              </Grid>
              <Footer />
              <ScrollTop>
                <Fab color="secondary" size="medium" aria-label="scroll back to top">
                  <KeyboardArrowUpIcon />
                </Fab>
              </ScrollTop>
            </Grid>
          </Box>
        </Suspense>
      )}
    </>
  );
};

export default MainLayout;

MainLayout.defaultProps = {
  pageBannerTitle: '',
  homeCarouselBanner: false,
};