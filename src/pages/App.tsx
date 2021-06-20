import { RouteComponentProps, Router } from '@reach/router';
import React, { Suspense, lazy } from 'react';

const MenuBar = lazy(() => import('../components/MenuBar'));
const Products = lazy(() => import('../components/Products/views/Products'));
const SEO = lazy(() => import('../components/SEO'));

const ProductRoutes = () => (
  <>
    <MenuBar />
    <Router basepath="/product">
      <RouterPage path="/" pageComponent={<Products />} />
    </Router>
  </>
);

const App = () => {
  const isSSR = typeof window === 'undefined';
  return (
    <>
      {!isSSR && (
      <Suspense fallback={<div>Loading...</div>}>
        <SEO />
        <Router>
          <RouterPage path="/" pageComponent={<Products />} />
          <RouterPage path="/product" pageComponent={ProductRoutes()} />
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
