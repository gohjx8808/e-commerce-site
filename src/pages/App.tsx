import Box from '@material-ui/core/Box';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { KeyboardArrowUp } from '@material-ui/icons';
import { RouteComponentProps, Router } from '@reach/router';
import { navigate } from 'gatsby';
import React, {
  lazy, Suspense, useEffect, useState,
} from 'react';
import { useAppSelector } from '../hooks';
import AccountScreen from '../modules/account/views/AccountScreen';
import FeedbackForm from '../modules/feedback/views/FeedbackForm';
import Footer from '../modules/Footer';
import HomeBanner from '../modules/HomeBanner';
import HomeScreen from '../modules/HomeScreen';
import ImageGallery from '../modules/imageGallery/views/ImageGallery';
import Cart from '../modules/products/views/Cart';
import Checkout from '../modules/products/views/Checkout';
import EnlargedProductImageCarouselModal from '../modules/products/views/EnlargedProductImageCarouselModal';
import ProductDescription from '../modules/products/views/ProductDescription';
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
  content: {
    flexGrow: 1,
  },
  pageBannerBg: {
    backgroundColor: theme.palette.secondary.main,
    padding: 10,
  },
  pageBannerText: {
    color: 'white',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  root: {
    display: 'flex',
    minHeight: '100vh',
  },
  pageComponentContainer: {
    minHeight: '65vh',
    padding: theme.spacing(3),
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
            <MainRoutes path="/" pageComponent={<HomeScreen />} homeCarouselBanner />
            <RouterPage path={routeNames.login} pageComponent={<LoginScreen />} />
            <RouterPage path={routeNames.signUp} pageComponent={<SignupScreen />} />
            <MainRoutes path={routeNames.products} pageComponent={<Products />} pageBannerTitle="Product Categories" />
            <MainRoutes
              path={routeNames.productDescription}
              pageComponent={<ProductDescription />}
            />
            <MainRoutes path={routeNames.imageGallery} pageComponent={<ImageGallery />} />
            <MainRoutes path={routeNames.cart} pageComponent={<Cart />} />
            <MainRoutes path={routeNames.checkout} pageComponent={<Checkout />} />
            <MainRoutes
              path={routeNames.account}
              pageComponent={<AccountScreen />}
              protectedRoute
            />
            <MainRoutes path={routeNames.feedbackForm} pageComponent={<FeedbackForm />} pageBannerTitle="Feedback Form" />
          </Router>
          <StatusModal />
          <LoadingOverlay />
          <EnlargedProductImageCarouselModal />
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
   pageComponent: JSX.Element,
   pageBannerTitle?:string,
   homeCarouselBanner?:boolean,
   protectedRoute?:boolean
  } & RouteComponentProps) => {
  const {
    pageComponent, pageBannerTitle, homeCarouselBanner, protectedRoute,
  } = props;
  const styles = useStyles();
  const currentUserDetail = useAppSelector((state) => state.auth.currentUser);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (protectedRoute) {
      if (currentUserDetail.uid !== '') {
        setIsAuthenticated(true);
      } else {
        navigate('/');
      }
    } else {
      setIsAuthenticated(true);
    }
  }, [protectedRoute, currentUserDetail.uid]);

  if (!isAuthenticated) {
    return (<HomeScreen />);
  }

  return (
    <div className={styles.root}>
      <MenuBar />
      <main className={styles.content}>
        <div id="back-to-top-anchor" />
        <div className={styles.toolbar} />
        {homeCarouselBanner && <HomeBanner />}
        {pageBannerTitle && (
          <Grid item xs={12} className={styles.pageBannerBg}>
            <Grid container justifyContent="center" alignItems="center">
              <Typography variant="h4" className={styles.pageBannerText}>{pageBannerTitle}</Typography>
            </Grid>
          </Grid>
        )}
        <Box className={styles.pageComponentContainer}>
          {pageComponent}
        </Box>
        <div id="most-bottom-anchor" />
        <Footer />
        <ScrollTop>
          <Fab color="secondary" size="medium" aria-label="scroll back to top">
            <KeyboardArrowUp />
          </Fab>
        </ScrollTop>
      </main>
    </div>
  );
};

MainRoutes.defaultProps = {
  pageBannerTitle: null,
  homeCarouselBanner: false,
  protectedRoute: false,
};

export default App;
