import { usePathname } from "@hooks";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { Link as GatsbyLink } from "gatsby";
import React, { useEffect, useState } from "react";
import StyledBreadcrumbs from "../styledComponents/StyledBreadcrumbs";
import { routeMap } from "../utils/constants";

interface CustomBreadcrumbsOwnProps {
  customActiveName?: string;
}

const CustomBreadcrumbs = (props: CustomBreadcrumbsOwnProps) => {
  const { customActiveName } = props;
  const pathname = usePathname();

  const [routesInBetween, setRoutesInBetween] = useState<string[]>([]);

  useEffect(() => {
    const paths = pathname.split("/");
    if (paths[paths.length - 1] === "") {
      setRoutesInBetween(paths.slice(1, paths.length - 2));
    } else {
      setRoutesInBetween(paths.slice(1, paths.length - 1));
    }
  }, [pathname]);

  return (
    <StyledBreadcrumbs
      separator={<NavigateNextIcon fontSize="small" />}
      aria-label="breadcrumb"
    >
      <Link component={GatsbyLink} color="inherit" to="/" underline="hover">
        Home
      </Link>
      {routesInBetween.map((route) => (
        <Link
          component={GatsbyLink}
          color="inherit"
          to={`/${route}/`}
          key={route}
          underline="hover"
        >
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
  customActiveName: "",
};

export default CustomBreadcrumbs;
