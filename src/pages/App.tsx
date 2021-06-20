import { RouteComponentProps, Router } from '@reach/router';
import React, { Suspense } from 'react';
import MenuBar from '../components/MenuBar';
import Products from '../components/Products/views/Products';
import SEO from '../components/SEO';

const ProductRoutes = () => (
  <>
    <MenuBar />
    <Router basepath="/product">
      <RouterPage path="/" pageComponent={<Products />} />
    </Router>
  </>
);

const App = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <SEO />
    <Router>
      <RouterPage path="/" pageComponent={<Products />} />
      <RouterPage path="/product" pageComponent={ProductRoutes()} />
    </Router>
  </Suspense>
);

const RouterPage = (
  props: { pageComponent: JSX.Element } & RouteComponentProps,
) => props.pageComponent;

export default App;
