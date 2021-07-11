import { RouteComponentProps, Router } from '@reach/router';
import React, { Suspense, lazy } from 'react';
import Footer from '../modules/Footer';
import routeNames from '../utils/routeNames';

const MenuBar = lazy(() => import('../modules/MenuBar'));
const Products = lazy(() => import('../modules/products/views/Products'));
const SEO = lazy(() => import('../modules/SEO'));
const SignupScreen = lazy(() => import('../modules/auth/views/SignupScreen'));
const LoginScreen = lazy(() => import('../modules/auth/views/LoginScreen'));
const LoadingOverlay = lazy(() => import('../modules/overlay/views/LoadingOverlay'));
const StatusModal = lazy(() => import('../modules/status/views/StatusModal'));

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
            <MainRoutes path="/cart" pageComponent={<Products />} />
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
  return (
    <>
      <MenuBar />
      {pageComponent}
    </>
  );
};

export default App;
