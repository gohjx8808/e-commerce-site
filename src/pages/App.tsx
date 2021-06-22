import { RouteComponentProps, Router } from '@reach/router';
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

const AuthenticationRoutes = () => (
  <AuthenticationLayout>
    <Router basepath="/login">
      <RouterPage path="/" pageComponent={<Login />} />
    </Router>
  </AuthenticationLayout>
);

const App = () => {
  const isSSR = typeof window === 'undefined';
  return (
    <>
      {!isSSR && (
        <Suspense fallback={<div>Loading...</div>}>
          <SEO />
          <Router>
            <RouterPage path="/" pageComponent={ProductRoutes()} />
            <RouterPage path="/login" pageComponent={AuthenticationRoutes()} />
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
