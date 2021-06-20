import { RouteComponentProps, Router } from '@reach/router';
import React from 'react';
import Products from '../components/Products/views/Products';

const App = () => (
  <Router>
    <RouterPage path="/product" pageComponent={<Products />} />
  </Router>
);

const RouterPage = (
  props: { pageComponent: JSX.Element } & RouteComponentProps,
) => props.pageComponent;

export default App;
