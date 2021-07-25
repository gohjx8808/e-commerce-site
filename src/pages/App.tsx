import Box from '@material-ui/core/Box';
import Fab from '@material-ui/core/Fab';
import { makeStyles } from '@material-ui/core/styles';
import { KeyboardArrowUp } from '@material-ui/icons';
import { RouteComponentProps, Router } from '@reach/router';
import React, { lazy, Suspense } from 'react';
import Footer from '../modules/Footer';
import HomeScreen from '../modules/HomeScreen';
import Cart from '../modules/products/views/Cart';
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
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
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
            <MainRoutes path="/" pageComponent={<HomeScreen />} />
            <RouterPage path={routeNames.login} pageComponent={<LoginScreen />} />
            <RouterPage path={routeNames.signUp} pageComponent={<SignupScreen />} />
            <MainRoutes path={routeNames.products} pageComponent={<Products />} />
            <MainRoutes path={routeNames.cart} pageComponent={<Cart />} />
            <MainRoutes path={routeNames.checkout} pageComponent={<Cart />} />
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

const MainRoutes = (props: { pageComponent: JSX.Element } & RouteComponentProps) => {
  const { pageComponent } = props;
  const styles = useStyles();

  return (
    <Box className={styles.contentContainer}>
      <MenuBar />
      <Box>
        <Box className={styles.content}>
          <Box className={styles.toolbar} />
          {pageComponent}
        </Box>
        <Footer />
      </Box>
      <ScrollTop>
        <Fab color="secondary" size="medium" aria-label="scroll back to top">
          <KeyboardArrowUp />
        </Fab>
      </ScrollTop>
    </Box>
  );
};

export default App;
