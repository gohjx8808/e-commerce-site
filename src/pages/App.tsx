import { RouteComponentProps, Router } from '@reach/router';
import React, { Suspense, lazy } from 'react';
import AuthenticationLayout from '../modules/Authentication/views/AuthenticationLayout';

const MenuBar = lazy(() => import('../modules/MenuBar'));
const Products = lazy(() => import('../modules/Products/views/Products'));
const SEO = lazy(() => import('../modules/SEO'));
const SignupScreen = lazy(() => import('../modules/Authentication/views/SignupScreen'));
const LoginScreen = lazy(() => import('../modules/Authentication/views/LoginScreen'));

const ProductRoutes = () => (
  <>
    <MenuBar />
    <Router basepath="/">
      <RouterPage path="/" pageComponent={<Products />} />
    </Router>
  </>
);

const AuthenticationPage = (props: { pageComponent: JSX.Element } & RouteComponentProps) => {
  const { pageComponent } = props;
  return (
    <AuthenticationLayout>
      {pageComponent}
    </AuthenticationLayout>
  );
};

const App = () => {
  const isSSR = typeof window === 'undefined';
  return (
    <>
      {!isSSR && (
        <Suspense fallback={<div>Loading...</div>}>
          <SEO />
          <Router>
            <AuthenticationPage path="/login" pageComponent={<LoginScreen />} />
            <AuthenticationPage path="/signup" pageComponent={<SignupScreen />} />
            <RouterPage path="/" pageComponent={ProductRoutes()} />
          </Router>
        </Suspense>
      )}
    </>
  );
};

const RouterPage = (
  props: { pageComponent: JSX.Element } & RouteComponentProps,
) => props.pageComponent;

export default App;
