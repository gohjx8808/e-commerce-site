import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import { RouteComponentProps, Router } from '@reach/router';
import React, {
  lazy, Suspense,
} from 'react';
import AuthLayout from '../layouts/AuthLayout';
import MainLayout from '../layouts/MainLayout';
import SEO from '../modules/SEO';
import routeNames from '../utils/routeNames';

const Products = lazy(() => import('../modules/products/views/Products'));
const SignupScreen = lazy(() => import('../modules/auth/views/SignupScreen'));
const LoginScreen = lazy(() => import('../modules/auth/views/LoginScreen'));
const AccountScreen = lazy(() => import('../modules/account/views/AccountScreen'));
const ForgotPassword = lazy(() => import('../modules/auth/views/ForgotPassword'));
const FeedbackForm = lazy(() => import('../modules/feedback/views/FeedbackForm'));
const HomeScreen = lazy(() => import('../modules/home/HomeScreen'));
const ImageGallery = lazy(() => import('../modules/imageGallery/views/ImageGallery'));
const LearnMore = lazy(() => import('../modules/learnMore/LearnMore'));
const Cart = lazy(() => import('../modules/products/views/Cart'));
const Checkout = lazy(() => import('../modules/products/views/Checkout'));
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
        />
        <MainRoutes path={routeNames.feedbackForm} pageComponent={<FeedbackForm />} pageBannerTitle="Feedback Form" />
        <MainRoutes path={routeNames.learnMore} pageComponent={<LearnMore />} />
      </Router>
    </Suspense>
    )}
  </>
);

const RouterPage = (
  props: { pageComponent: JSX.Element } & RouteComponentProps,
) => {
  const { pageComponent } = props;

  return (
    <AuthLayout>
      {pageComponent}
    </AuthLayout>
  );
};

const MainRoutes = (props: {
   pageComponent: JSX.Element,
   pageBannerTitle?:string,
   homeCarouselBanner?:boolean,
  } & RouteComponentProps) => {
  const {
    pageComponent, pageBannerTitle, homeCarouselBanner,
  } = props;

  return (
    <MainLayout pageBannerTitle={pageBannerTitle} homeCarouselBanner={homeCarouselBanner}>
      {pageComponent}
    </MainLayout>
  );
};

MainRoutes.defaultProps = {
  pageBannerTitle: null,
  homeCarouselBanner: false,
};

export default App;
