import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { useLocation } from '@reach/router';
import React, { useEffect, useState } from 'react';
import routeNames from '../utils/routeNames';
import StyledBreadcrumbs from '../styledComponents/StyledBreadcrumbs';

interface CustomBreadcrumbsOwnProps{
  customActiveName?:string
}

const CustomBreadcrumbs = (props:CustomBreadcrumbsOwnProps) => {
  const { customActiveName } = props;
  const location = useLocation();
  const breadcrumbNameMap: { [key: string]: string } = {
    [routeNames.login]: 'Login',
    [routeNames.signUp]: 'Sign Up',
    [routeNames.cart]: 'Shopping Cart',
    '/': 'Home',
    [routeNames.checkout]: 'Checkout',
    [routeNames.account]: 'My Account',
    [routeNames.products]: 'Products',
  };
  const [routesInBetween, setRoutesInBetween] = useState<string[]>([]);

  useEffect(() => {
    const paths = location.pathname.split('/');
    setRoutesInBetween(paths.slice(1, paths.length - 1));
  }, [location]);

  return (
    <StyledBreadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
      <Link color="inherit" href="/" underline="hover">
        Home
      </Link>
      {routesInBetween.map((route) => (
        <Link color="inherit" href={`/${route}`} key={route} underline="hover">
          {breadcrumbNameMap[`/${route}`]}
        </Link>
      ))}
      <Typography color="textPrimary">
        {customActiveName || breadcrumbNameMap[location.pathname]}
      </Typography>
    </StyledBreadcrumbs>
  );
};

CustomBreadcrumbs.defaultProps = {
  customActiveName: '',
};

export default CustomBreadcrumbs;
