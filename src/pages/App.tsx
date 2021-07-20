import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import { RouteComponentProps, Router } from '@reach/router';
import React, { Suspense, lazy } from 'react';
import Footer from '../modules/Footer';
import Cart from '../modules/products/views/Cart';
import routeNames from '../utils/routeNames';

const MenuBar = lazy(() => import('../modules/MenuBar'));
const Products = lazy(() => import('../modules/products/views/Products'));
const SEO = lazy(() => import('../modules/SEO'));
const SignupScreen = lazy(() => import('../modules/auth/views/SignupScreen'));
const LoginScreen = lazy(() => import('../modules/auth/views/LoginScreen'));
const LoadingOverlay = lazy(() => import('../modules/overlay/views/LoadingOverlay'));
const StatusModal = lazy(() => import('../modules/status/views/StatusModal'));

const useStyles = makeStyles((theme) => ({
  flexDisplay: {
    display: 'flex',
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
            <RouterPage path={routeNames.login} pageComponent={<LoginScreen />} />
            <RouterPage path={routeNames.signUp} pageComponent={<SignupScreen />} />
            <MainRoutes path="/" pageComponent={<Products />} />
            <MainRoutes path={routeNames.cart} pageComponent={<Cart />} />
          </Router>
          <Footer />
          <StatusModal />
          <LoadingOverlay />
        </Suspense>
      )}
    </>
  );
};

const RouterPage = (
  props: { pageComponent: JSX.Element } & RouteComponentProps,
) => props.pageComponent;

const MainRoutes = (props: { pageComponent: JSX.Element } & RouteComponentProps) => {
  const { pageComponent } = props;
  const styles = useStyles();

  return (
    <Box className={styles.flexDisplay}>
      <MenuBar />
      <Box className={styles.content}>
        <Box className={styles.toolbar} />
        {pageComponent}
      </Box>
    </Box>
  );
};

export default App;
