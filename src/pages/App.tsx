import loadable from '@loadable/component';
import Box from '@material-ui/core/Box';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { RouteComponentProps, Router } from '@reach/router';
import { navigate } from 'gatsby';
import React, { Suspense, useEffect, useState } from 'react';
import { useAppSelector } from '../hooks';
import routeNames from '../utils/routeNames';

const ScrollTop = loadable(() => import('../sharedComponents/ScrollTop'));
const MenuBar = loadable(() => import('../modules/MenuBar'));
const Products = loadable(() => import('../modules/products/views/Products'));
const SEO = loadable(() => import('../modules/SEO'));
const SignupScreen = loadable(() => import('../modules/auth/views/SignupScreen'));
const LoginScreen = loadable(() => import('../modules/auth/views/LoginScreen'));
const LoadingOverlay = loadable(() => import('../modules/overlay/views/LoadingOverlay'));
const StatusModal = loadable(() => import('../modules/status/views/StatusModal'));
const AccountScreen = loadable(() => import('../modules/account/views/AccountScreen'));
const ForgotPassword = loadable(() => import('../modules/auth/views/ForgotPassword'));
const FeedbackForm = loadable(() => import('../modules/feedback/views/FeedbackForm'));
const Footer = loadable(() => import('../modules/Footer'));
const HomeBanner = loadable(() => import('../modules/HomeBanner'));
const HomeScreen = loadable(() => import('../modules/HomeScreen'));
const ImageGallery = loadable(() => import('../modules/imageGallery/views/ImageGallery'));
const LearnMore = loadable(() => import('../modules/LearnMore'));
const Cart = loadable(() => import('../modules/products/views/Cart'));
const Checkout = loadable(() => import('../modules/products/views/Checkout'));
const EnlargedProductImageCarouselModal = loadable(() => import('../modules/products/views/EnlargedProductImageCarouselModal'));
const ProductDescription = loadable(() => import('../modules/products/views/ProductDescription'));

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
    padding: theme.spacing(3),
  },
  authContent: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: theme.palette.primary.main,
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
            <RouterPage path={routeNames.forgotPassword} pageComponent={<ForgotPassword />} />
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
            <MainRoutes path={routeNames.learnMore} pageComponent={<LearnMore />} />
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
  const styles = useStyles();
  return (
    <div className={styles.root}>
      <Grid container direction="column">
        <main className={styles.authContent}>
          {pageComponent}
        </main>
        <Footer />
      </Grid>
    </div>
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
      <Grid container direction="column">
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
        </main>
        <Footer />
        <ScrollTop>
          <Fab color="secondary" size="medium" aria-label="scroll back to top">
            <KeyboardArrowUpIcon />
          </Fab>
        </ScrollTop>
      </Grid>
    </div>
  );
};

MainRoutes.defaultProps = {
  pageBannerTitle: null,
  homeCarouselBanner: false,
  protectedRoute: false,
};

export default App;
