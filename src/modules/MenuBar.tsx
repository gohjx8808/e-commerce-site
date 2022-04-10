import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import MenuIcon from "@mui/icons-material/Menu";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import SettingsBrightnessIcon from "@mui/icons-material/SettingsBrightness";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { navigate } from "gatsby";
import React, { useContext, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector, useXsDownMediaQuery } from "../hooks";
import ElevationScroll from "../sharedComponents/ElevationScroll";
import StyledAppbar from "../styledComponents/drawer/StyledAppbar";
import {
  SearchContainer,
  SearchIconWrapper,
  SearchInputBase,
} from "../styledComponents/search";
import StyledMenuItem from "../styledComponents/StyledListItem";
import { isSSR } from "../utils/constants";
import DarkModeContext from "../utils/DarkModeContext";
import routeNames from "../utils/routeNames";
import { useUserDetails } from "./auth/src/authQueries";
import SignOutConfirmationModal from "./auth/views/SignOutConfirmationModal";
import CustomDesktopDrawer from "./drawer/CustomDesktopDrawer";
import CustomMobileDrawer from "./drawer/CustomMobileDrawer";
import { updateProductFilterKeyword } from "./products/src/productReducers";

const MenuBar = () => {
  const pathname = (!isSSR && window.location.pathname) || "";
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mobileMoreAnchor, setMobileMoreAnchor] = useState<null | HTMLElement>(
    null
  );
  const [isSignOutModalOpen, setSignOutModal] = useState(false);

  const toggleSignOutModal = () => {
    setSignOutModal(!isSignOutModalOpen);
  };

  const { data: currentUserDetail } = useUserDetails();

  const shoppingCartItem = useAppSelector(
    (state) => state.product.shoppingCartItem
  );
  const [totalQuantity, setTotalQuantity] = useState(0);
  const dispatch = useAppDispatch();
  const isXsView = useXsDownMediaQuery();
  const { toggleTheme, displayTheme } = useContext(DarkModeContext);

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

  const mobileMenuId = "mobile-more";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchor}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "center" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {currentUserDetail ? (
        <StyledMenuItem disableRipple>
          <Grid container justifyContent="center" alignItems="center">
            <Typography>{`Welcome, ${
              currentUserDetail.fullName.split(" ")[0]
            }`}</Typography>
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
      {currentUserDetail && (
        <div>
          <StyledMenuItem
            onClick={() => navigate(routeNames.account)}
            selected={pathname === routeNames.account}
          >
            <IconButton aria-label="account" color="inherit">
              <AccountCircleIcon />
            </IconButton>
            <Typography>Profile</Typography>
          </StyledMenuItem>
          <StyledMenuItem onClick={toggleSignOutModal}>
            <IconButton aria-label="logout" color="inherit">
              <ExitToAppIcon />
            </IconButton>
            <Typography>Logout</Typography>
          </StyledMenuItem>
        </div>
      )}
    </Menu>
  );

  const onChangeProductFilterKeyword = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
        <StyledAppbar position="fixed" open={drawerOpen} color="customPrimary">
          <Toolbar>
            <IconButton
              sx={{
                marginRight: "36px",
                ...(drawerOpen && { display: "none" }),
              }}
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
            >
              <MenuIcon />
            </IconButton>
            {!(isXsView && pathname === routeNames.products) && (
              <Button color="inherit" onClick={() => navigate("/")}>
                <Typography variant="h6" sx={{ textTransform: "none" }}>
                  YJ Art Journal
                </Typography>
              </Button>
            )}
            {pathname === routeNames.products && (
              <SearchContainer>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <SearchInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                  onChange={onChangeProductFilterKeyword}
                />
              </SearchContainer>
            )}
            <Box flexGrow={1} />
            {displayTheme === "system" && (
              <Tooltip title="System preference mode">
                <IconButton
                  onClick={() => toggleTheme("light")}
                  color="inherit"
                >
                  <SettingsBrightnessIcon />
                </IconButton>
              </Tooltip>
            )}
            {displayTheme === "light" && (
              <Tooltip title="Light mode">
                <IconButton onClick={() => toggleTheme("dark")} color="inherit">
                  <WbSunnyIcon />
                </IconButton>
              </Tooltip>
            )}
            {displayTheme === "dark" && (
              <Tooltip title="Dark mode">
                <IconButton
                  onClick={() => toggleTheme("system")}
                  color="inherit"
                >
                  <DarkModeIcon />
                </IconButton>
              </Tooltip>
            )}
            <Box display={{ xs: "none", md: "flex" }} alignItems="center">
              {currentUserDetail ? (
                <Box marginRight={2}>
                  <Typography>{`Welcome, ${
                    currentUserDetail.fullName.split(" ")[0]
                  }`}</Typography>
                </Box>
              ) : (
                <>
                  <Button
                    color="inherit"
                    onClick={() => navigate(routeNames.login)}
                  >
                    Login
                  </Button>
                  <Button
                    color="inherit"
                    onClick={() => navigate(routeNames.signUp)}
                  >
                    Sign Up
                  </Button>
                </>
              )}
              <IconButton
                aria-label="shopping cart"
                color="inherit"
                onClick={() => navigate(routeNames.cart)}
              >
                <Badge badgeContent={totalQuantity} color="secondary">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
              {currentUserDetail && (
                <>
                  <IconButton
                    aria-label="account"
                    color="inherit"
                    onClick={() => navigate(routeNames.account)}
                  >
                    <AccountCircleIcon />
                  </IconButton>
                  <IconButton
                    aria-label="logout"
                    color="inherit"
                    onClick={toggleSignOutModal}
                  >
                    <ExitToAppIcon />
                  </IconButton>
                </>
              )}
            </Box>
            <Box display={{ xs: "flex", md: "none" }}>
              <IconButton
                aria-label="shopping cart"
                color="inherit"
                onClick={() => navigate(routeNames.cart)}
              >
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
                <MoreVertIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </StyledAppbar>
      </ElevationScroll>
      {renderMobileMenu}
      {!isXsView ? (
        <CustomDesktopDrawer
          drawerOpen={drawerOpen}
          handleDrawerClose={toggleDrawer}
        />
      ) : (
        <CustomMobileDrawer
          drawerOpen={drawerOpen}
          toggleDrawer={toggleDrawer}
        />
      )}
      <SignOutConfirmationModal
        isOpen={isSignOutModalOpen}
        toggleModal={toggleSignOutModal}
      />
    </>
  );
};

export default MenuBar;
