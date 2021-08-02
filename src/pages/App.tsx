import Box from '@material-ui/core/Box';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { KeyboardArrowUp } from '@material-ui/icons';
import { RouteComponentProps, Router } from '@reach/router';
import React, { lazy, Suspense } from 'react';
import Footer from '../modules/Footer';
import HomeScreen from '../modules/HomeScreen';
import Cart from '../modules/products/views/Cart';
import Checkout from '../modules/products/views/Checkout';
import ScrollTop from '../sharedComponents/ScrollTop';
import routeNames from '../utils/routeNames';

const MenuBar = lazy(() => import('../modules/MenuBar'));
const Products = lazy(() => import('../modules/products/views/Products'));
const SEO = lazy(() => import('../modules/SEO'));
const SignupScreen = lazy(() => import('../modules/auth/views/SignupScreen'));
const LoginScreen = lazy(() => import('../modules/auth/views/LoginScreen'));
const LoadingOverlay = lazy(() => import('../modules/overlay/views/LoadingOverlay'));
const StatusModal = lazy(() => import('../modules/status/views/StatusModal'));

const useStyles = makeStyles((theme) => ({
  contentContainer: {
    marginLeft: theme.spacing(7) + 1,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  pageBannerBg: {
    backgroundColor: theme.palette.secondary.main,
    padding: 10,
  },
  pageBannerText: {
    color: 'white',
  },
}));

const App = () => {
  const isSSR = typeof window === 'undefined';
  return (
    <>
      {!isSSR && (
        <Suspense fallback={<div>Loading...</div>}>
          <SEO />
          <Router>
            <MainRoutes path="/" pageComponent={<HomeScreen />} />
            <RouterPage path={routeNames.login} pageComponent={<LoginScreen />} />
            <RouterPage path={routeNames.signUp} pageComponent={<SignupScreen />} />
            <MainRoutes path={routeNames.products} pageComponent={<Products />} pageBannerTitle="Product Categories" />
            <MainRoutes path={routeNames.cart} pageComponent={<Cart />} />
            <MainRoutes path={routeNames.checkout} pageComponent={<Checkout />} />
          </Router>
          <StatusModal />
          <LoadingOverlay />
        </Suspense>
      )}
    </>
  );
};

const RouterPage = (
  props: { pageComponent: JSX.Element } & RouteComponentProps,
) => {
  const { pageComponent } = props;
  return (
    <>
      {pageComponent}
      <Footer />
    </>
  );
};

const MainRoutes = (props: {
   pageComponent: JSX.Element, pageBannerTitle?:string
  } & RouteComponentProps) => {
  const { pageComponent, pageBannerTitle } = props;
  const styles = useStyles();

  return (
    <Box className={styles.contentContainer}>
      <MenuBar />
      {pageBannerTitle && (
        <Grid item xs={12} className={styles.pageBannerBg}>
          <Grid container justifyContent="center" alignItems="center">
            <Typography variant="h4" className={styles.pageBannerText}>{pageBannerTitle}</Typography>
          </Grid>
        </Grid>
      )}
      <Box className={styles.content}>
        {pageComponent}
      </Box>
      <Footer />
      <ScrollTop>
        <Fab color="secondary" size="medium" aria-label="scroll back to top">
          <KeyboardArrowUp />
        </Fab>
      </ScrollTop>
    </Box>
  );
};

MainRoutes.defaultProps = {
  pageBannerTitle: null,
};

export default App;
