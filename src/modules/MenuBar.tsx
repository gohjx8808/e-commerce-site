import AppBar from '@material-ui/core/AppBar';
import Badge from '@material-ui/core/Badge';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Menu from '@material-ui/core/Menu';
import {
  alpha, createStyles, makeStyles, Theme, useTheme,
} from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import { useLocation } from '@reach/router';
import clsx from 'clsx';
import { navigate } from 'gatsby';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import ElevationScroll from '../sharedComponents/ElevationScroll';
import StyledMenuItem from '../sharedComponents/StyledMenuItem';
import routeNames from '../utils/routeNames';
import { toggleSignOutConfirmationModal } from './auth/src/authReducer';
import SignOutConfirmationModal from './auth/views/SignOutConfirmationModal';
import CustomDesktopDrawer from './CustomDesktopDrawer';
import CustomMobileDrawer from './CustomMobileDrawer';
import { updateProductFilterKeyword } from './products/src/productReducers';

const drawerWidth = 210;

const useStyles = makeStyles((theme: Theme) => createStyles({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
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
  searchInput: {
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
      alignItems: 'center',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  nameBtn: {
    textTransform: 'none',
  },
  hide: {
    display: 'none',
  },
  appBarShift: {
    [theme.breakpoints.up('sm')]: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  menuIconShift: {
    paddingLeft: 5,
    paddingRight: 5,
  },
  rightSpacing: {
    marginRight: 15,
  },
}));

const MenuBar = () => {
  const classes = useStyles();
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mobileMoreAnchor, setMobileMoreAnchor] = useState<null | HTMLElement>(null);
  const currentUserDetail = useAppSelector((state) => state.auth.currentUser);
  const shoppingCartItem = useAppSelector((state) => state.product.shoppingCartItem);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isXsView = useMediaQuery(theme.breakpoints.down('xs'));

  useEffect(() => {
    let total = 0;
    shoppingCartItem.map((item) => {
      total += item.quantity;
      return null;
    });
    setTotalQuantity(total);
  }, [shoppingCartItem]);

  const isMobileMenuOpen = Boolean(mobileMoreAnchor);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchor(null);
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchor(event.currentTarget);
  };

  const promptSignOut = () => {
    dispatch(toggleSignOutConfirmationModal(true));
  };

  const mobileMenuId = 'mobile-more';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchor}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      getContentAnchorEl={null}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {currentUserDetail.fullName !== ''
        ? (
          <StyledMenuItem disableRipple>
            <Grid container justifyContent="center" alignItems="center">
              <Typography>{`Welcome, ${currentUserDetail.fullName.split(' ')[0]}`}</Typography>
            </Grid>
          </StyledMenuItem>
        ) : (
          <div>
            <StyledMenuItem onClick={() => navigate(routeNames.login)}>
              <Button color="inherit">Login</Button>
            </StyledMenuItem>
            <StyledMenuItem onClick={() => navigate(routeNames.signUp)}>
              <Button color="inherit">Sign Up</Button>
            </StyledMenuItem>
          </div>
        )}
      {currentUserDetail.fullName !== '' && (
        <div>
          <StyledMenuItem
            onClick={() => navigate(routeNames.account)}
            selected={location.pathname === routeNames.account}
          >
            <IconButton
              aria-label="account"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Typography>Profile</Typography>
          </StyledMenuItem>
          <StyledMenuItem onClick={promptSignOut}>
            <IconButton
              aria-label="logout"
              color="inherit"
            >
              <ExitToAppIcon />
            </IconButton>
            <Typography>Logout</Typography>
          </StyledMenuItem>
        </div>
      )}
    </Menu>
  );

  const onChangeProductFilterKeyword = (
    event:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    dispatch(updateProductFilterKeyword(event.target.value));
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      <CssBaseline />
      <ElevationScroll>
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: drawerOpen,
          })}
        >
          <Toolbar className={classes.menuIconShift}>
            <IconButton
              className={clsx(classes.menuButton, {
                [classes.hide]: drawerOpen,
              })}
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
            >
              <MenuIcon />
            </IconButton>
            {!(isXsView && location.pathname === routeNames.products) && (
              <Button className={classes.nameBtn} onClick={() => navigate('/')}>
                <Typography variant="h6">YJ Art Journal</Typography>
              </Button>
            )}
            {location.pathname === routeNames.products && (
              <Box className={classes.search}>
                <Box className={classes.searchIcon}>
                  <SearchIcon />
                </Box>
                <InputBase
                  placeholder="Search…"
                  inputProps={{ 'aria-label': 'search', className: classes.searchInput }}
                  onChange={onChangeProductFilterKeyword}
                />
              </Box>
            )}
            <Box className={classes.grow} />
            <Box className={classes.sectionDesktop}>
              {currentUserDetail.fullName !== ''
                ? (
                  <Box className={classes.rightSpacing}>
                    <Typography>{`Welcome, ${currentUserDetail.fullName.split(' ')[0]}`}</Typography>
                  </Box>
                ) : (
                  <>
                    <Button color="inherit" onClick={() => navigate(routeNames.login)}>Login</Button>
                    <Button color="inherit" onClick={() => navigate(routeNames.signUp)}>Sign Up</Button>
                  </>
                )}
              <IconButton aria-label="shopping cart" color="inherit" onClick={() => navigate(routeNames.cart)}>
                <Badge badgeContent={totalQuantity} color="secondary">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
              {currentUserDetail.fullName !== '' && (
                <>
                  <IconButton
                    aria-label="account"
                    color="inherit"
                    onClick={() => navigate(routeNames.account)}
                  >
                    <AccountCircle />
                  </IconButton>
                  <IconButton
                    aria-label="logout"
                    color="inherit"
                    onClick={promptSignOut}
                  >
                    <ExitToAppIcon />
                  </IconButton>
                </>
              )}
            </Box>
            <Box className={classes.sectionMobile}>
              <IconButton aria-label="shopping cart" color="inherit" onClick={() => navigate(routeNames.cart)}>
                <Badge badgeContent={totalQuantity} color="secondary">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
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
      {renderMobileMenu}
      {!isXsView
        ? <CustomDesktopDrawer drawerOpen={drawerOpen} handleDrawerClose={toggleDrawer} />
        : <CustomMobileDrawer drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} />}
      <SignOutConfirmationModal />
    </>
  );
};

export default MenuBar;
