import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { NavigateNext } from '@material-ui/icons';
import { useLocation } from '@reach/router';
import React from 'react';
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
  };
  const styles = useStyle();

  return (
    <Breadcrumbs separator={<NavigateNext fontSize="small" />} aria-label="breadcrumb" className={styles.verticalSpace}>
      <Link color="inherit" href="/">
        Home
      </Link>
      <Typography color="textPrimary">{breadcrumbNameMap[location.pathname]}</Typography>
    </Breadcrumbs>
  );
};

export default CustomBreadcrumbs;
