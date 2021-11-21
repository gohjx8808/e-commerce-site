import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Link from '@mui/material/Link';
import { Link as GatsbyLink } from 'gatsby';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';
import StyledBreadcrumbs from '../styledComponents/StyledBreadcrumbs';
import { isSSR, routeMap } from '../utils/constants';

interface CustomBreadcrumbsOwnProps{
  customActiveName?:string
}

const CustomBreadcrumbs = (props:CustomBreadcrumbsOwnProps) => {
  const { customActiveName } = props;
  const pathname = (!isSSR && window.location.pathname) || '';

  const [routesInBetween, setRoutesInBetween] = useState<string[]>([]);

  useEffect(() => {
    const paths = pathname.split('/');
    setRoutesInBetween(paths.slice(1, paths.length - 2));
  }, [pathname]);

  return (
    <StyledBreadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
      <Link component={GatsbyLink} color="inherit" to="/" underline="hover">
        Home
      </Link>
      {routesInBetween.map((route) => (
        <Link component={GatsbyLink} color="inherit" to={`/${route}/`} key={route} underline="hover">
          {routeMap[`/${route}/`]}
        </Link>
      ))}
      <Typography color="textPrimary">
        {customActiveName || routeMap[pathname]}
      </Typography>
    </StyledBreadcrumbs>
  );
};

CustomBreadcrumbs.defaultProps = {
  customActiveName: '',
};

export default CustomBreadcrumbs;
