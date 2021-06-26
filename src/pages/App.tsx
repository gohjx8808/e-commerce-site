import { RouteComponentProps, Router } from '@reach/router';
import { withPrefix } from 'gatsby';
import React, { Suspense, lazy } from 'react';
import AuthenticationLayout from '../modules/Authentication/views/AuthenticationLayout';
import Login from '../modules/Authentication/views/LoginScreen';

const MenuBar = lazy(() => import('../modules/MenuBar'));
const Products = lazy(() => import('../modules/Products/views/Products'));
const SEO = lazy(() => import('../modules/SEO'));

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
            <AuthenticationPage path="/login" pageComponent={<Login />} />
            <AuthenticationPage path="/signup" pageComponent={<Login />} />
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
