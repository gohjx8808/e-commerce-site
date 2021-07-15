import AppBar from '@material-ui/core/AppBar';
import Badge from '@material-ui/core/Badge';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {
  createStyles, fade, makeStyles, Theme,
} from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { ShoppingCart } from '@material-ui/icons';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import { navigate } from 'gatsby';
import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../hooks';
import ElevationScroll from '../sharedComponents/ElevationScroll';
import routeNames from '../utils/routeNames';

const useStyles = makeStyles((theme: Theme) => createStyles({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

const MenuBar = () => {
  const classes = useStyles();
  const [accAnchor, setAccAnchor] = useState<null | HTMLElement>(null);
  const [mobileMoreAnchor, setMobileMoreAnchor] = useState<null | HTMLElement>(null);
  const currentUserDetail = useAppSelector((state) => state.auth.currentUser);
  const shoppingCartItem = useAppSelector((state) => state.product.shoppingCartItem);
  const [totalQuantity, setTotalQuantity] = useState(0);

  useEffect(() => {
    let total = 0;
    shoppingCartItem.map((item) => {
      total += item.quantity;
      return null;
    });
    setTotalQuantity(total);
  }, [shoppingCartItem]);

  const isMenuOpen = Boolean(accAnchor);
  const isMobileMenuOpen = Boolean(mobileMoreAnchor);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAccAnchor(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchor(null);
  };

  const handleMenuClose = () => {
    setAccAnchor(null);
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchor(event.currentTarget);
  };

  const menuId = 'account';
  const renderMenu = (
    <Menu
      anchorEl={accAnchor}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'mobile-more';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchor}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="shopping cart" color="inherit">
          <Badge badgeContent={totalQuantity} color="secondary">
            <ShoppingCart />
          </Badge>
        </IconButton>
        <Typography>Cart</Typography>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <Typography>Profile</Typography>
      </MenuItem>
    </Menu>
  );

  return (
    <Box className={classes.grow}>
      <ElevationScroll>
        <AppBar>
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
            >
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant="h6" noWrap>
              YJ Art Journal
            </Typography>
            <Box className={classes.search}>
              <Box className={classes.searchIcon}>
                <SearchIcon />
              </Box>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
            </Box>
            <Box className={classes.grow} />
            <Box className={classes.sectionDesktop}>
              {currentUserDetail.fullName !== ''
                ? (
                  <Grid container justify="center" alignItems="center">
                    <Typography>{`Welcome, ${currentUserDetail.fullName}`}</Typography>
                  </Grid>
                ) : (
                  <>
                    <Button color="inherit" onClick={() => navigate(routeNames.login)}>Login</Button>
                    <Button color="inherit" onClick={() => navigate(routeNames.signUp)}>Sign Up</Button>
                  </>
                )}
              <IconButton aria-label="shopping cart" color="inherit" onClick={() => navigate(routeNames.cart)}>
                <Badge badgeContent={totalQuantity} color="secondary">
                  <ShoppingCart />
                </Badge>
              </IconButton>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </Box>
            <Box className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar id="back-to-top-anchor" />
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
};

export default MenuBar;
