import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { NavigateNext } from '@material-ui/icons';
import { useLocation } from '@reach/router';
import React, { useState } from 'react';
import { useEffect } from 'react';
import routeNames from '../utils/routeNames';

const useStyle = makeStyles({
  verticalSpace: {
    paddingTop: 15,
    paddingBottom: 15,
  },
});

const CustomBreadcrumbs = () => {
  const location = useLocation();
  const breadcrumbNameMap: { [key: string]: string } = {
    [routeNames.login]: 'Login',
    [routeNames.signUp]: 'Sign Up',
    [routeNames.cart]: 'Shopping Cart',
    '/': 'Home',
    [routeNames.checkout]: 'Checkout',
    [routeNames.account]: 'My Account',
  };
  const [routesInBetween, setRoutesInBetween] = useState<string[]>([]);
  const styles = useStyle();

  useEffect(() => {
    const paths = location.pathname.split('/');
    setRoutesInBetween(paths.slice(1, paths.length - 1));
  }, [location]);

  return (
    <Breadcrumbs separator={<NavigateNext fontSize="small" />} aria-label="breadcrumb" className={styles.verticalSpace}>
      <Link color="inherit" href="/">
        Home
      </Link>
      {routesInBetween.map((route) => (
        <Link color="inherit" href={`/${route}`} key={route}>
          {breadcrumbNameMap[`/${route}`]}
        </Link>
      ))}
      <Typography color="textPrimary">{breadcrumbNameMap[location.pathname]}</Typography>
    </Breadcrumbs>
  );
};

export default CustomBreadcrumbs;
