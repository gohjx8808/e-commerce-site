import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Fab from '@mui/material/Fab';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { RouteComponentProps, Router } from '@reach/router';
import { navigate } from 'gatsby';
import React, {
  lazy, Suspense, useEffect, useState,
} from 'react';
import { useAppSelector } from '../hooks';
import routeNames from '../utils/routeNames';

const ScrollTop = lazy(() => import('../sharedComponents/ScrollTop'));
const MenuBar = lazy(() => import('../modules/MenuBar'));
const Products = lazy(() => import('../modules/products/views/Products'));
const SEO = lazy(() => import('../modules/SEO'));
const SignupScreen = lazy(() => import('../modules/auth/views/SignupScreen'));
const LoginScreen = lazy(() => import('../modules/auth/views/LoginScreen'));
const LoadingOverlay = lazy(() => import('../modules/overlay/views/LoadingOverlay'));
const StatusModal = lazy(() => import('../modules/status/views/StatusModal'));
const AccountScreen = lazy(() => import('../modules/account/views/AccountScreen'));
const ForgotPassword = lazy(() => import('../modules/auth/views/ForgotPassword'));
const FeedbackForm = lazy(() => import('../modules/feedback/views/FeedbackForm'));
const Footer = lazy(() => import('../modules/Footer'));
const HomeBanner = lazy(() => import('../modules/home/HomeBanner'));
const HomeScreen = lazy(() => import('../modules/home/HomeScreen'));
const ImageGallery = lazy(() => import('../modules/imageGallery/views/ImageGallery'));
const LearnMore = lazy(() => import('../modules/learnMore/LearnMore'));
const Cart = lazy(() => import('../modules/products/views/Cart'));
const Checkout = lazy(() => import('../modules/products/views/Checkout'));
const EnlargedProductImageCarouselModal = lazy(() => import('../modules/products/views/EnlargedProductImageCarouselModal'));
const ProductDescription = lazy(() => import('../modules/products/views/ProductDescription'));

const isSSR = typeof window === 'undefined';

const App = () => (
  <>
    {!isSSR && (
    <Suspense fallback={(
      <Grid container display="flex" minHeight="100vh" justifyContent="center" alignItems="center">
        <CircularProgress color="primary" size={60} />
      </Grid>
    )}
    >
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

const RouterPage = (
  props: { pageComponent: JSX.Element } & RouteComponentProps,
) => {
  const { pageComponent } = props;
  const theme = useTheme();

  return (
    <Grid container minHeight="100vh" direction="column">
      <Grid alignItems="center" display="flex" flexGrow={1} bgcolor={theme.palette.customPrimary.main}>
        {pageComponent}
      </Grid>
      <Footer />
    </Grid>
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
  const theme = useTheme();
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
    <Box display="flex" minHeight="100vh">
      <MenuBar />
      <Grid container direction="column">
        <Grid flexGrow={1}>
          <div id="back-to-top-anchor" />
          <Toolbar />
          {homeCarouselBanner && <HomeBanner />}
          {pageBannerTitle && (
            <Grid item xs={12} padding={1} bgcolor={theme.palette.customSecondary.main}>
              <Grid container justifyContent="center" alignItems="center">
                <Typography variant="h4" color="white">{pageBannerTitle}</Typography>
              </Grid>
            </Grid>
          )}
          <Box margin={3}>
            {pageComponent}
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
  );
};

MainRoutes.defaultProps = {
  pageBannerTitle: null,
  homeCarouselBanner: false,
  protectedRoute: false,
};

export default App;
