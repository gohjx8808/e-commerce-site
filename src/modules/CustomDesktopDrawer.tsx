import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {
  createStyles, makeStyles, Theme,
} from '@material-ui/core/styles';
import {
  HomeOutlined,
  ImageSearchOutlined,
  PhotoLibrary,
  SpeakerNotes,
} from '@material-ui/icons';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { useLocation } from '@reach/router';
import clsx from 'clsx';
import { navigate } from 'gatsby';
import React from 'react';
import StyledMenuItem from '../sharedComponents/StyledMenuItem';
import routeNames from '../utils/routeNames';

const drawerWidth = 210;

const useStyles = makeStyles((theme: Theme) => createStyles({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
}));

interface CustomDesktopDrawerOwnProps{
  drawerOpen:boolean
  handleDrawerClose:()=>void
}

const CustomDesktopDrawer = (props:CustomDesktopDrawerOwnProps) => {
  const { drawerOpen, handleDrawerClose } = props;
  const classes = useStyles();
  const location = useLocation();
  const currentPathName = location.pathname;

  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: drawerOpen,
        [classes.drawerClose]: !drawerOpen,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: drawerOpen,
          [classes.drawerClose]: !drawerOpen,
        }),
      }}
    >
      <div className={classes.toolbar}>
        <IconButton onClick={handleDrawerClose} aria-label="close drawer">
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List role="menu">
        <StyledMenuItem button selected={currentPathName === '/'} onClick={() => navigate('/')}>
          <ListItemIcon>
            <HomeOutlined />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </StyledMenuItem>
        {/* <ListItem button selected={currentPathName === '/introduction'}>
          <ListItemIcon>
            <InsertEmoticon />
          </ListItemIcon>
          <ListItemText primary="Introduction" />
        </ListItem> */}
        <StyledMenuItem
          button
          selected={currentPathName === routeNames.imageGallery}
          onClick={() => navigate(routeNames.imageGallery)}
        >
          <ListItemIcon>
            <PhotoLibrary />
          </ListItemIcon>
          <ListItemText primary="Image Gallery" />
        </StyledMenuItem>
        <StyledMenuItem
          button
          selected={currentPathName === routeNames.products}
          onClick={() => navigate(routeNames.products)}
        >
          <ListItemIcon>
            <ImageSearchOutlined />
          </ListItemIcon>
          <ListItemText primary="Products" />
        </StyledMenuItem>
        <StyledMenuItem
          button
          selected={currentPathName === routeNames.feedbackForm}
          onClick={() => navigate(routeNames.feedbackForm)}
        >
          <ListItemIcon>
            <SpeakerNotes />
          </ListItemIcon>
          <ListItemText primary="Feedback" />
        </StyledMenuItem>
        {/* <ListItem button selected={currentPathName === '/sharingCorner'}>
          <ListItemIcon>
            <ChatOutlined />
          </ListItemIcon>
          <ListItemText primary="Sharing Corner" />
        </ListItem> */}
        {/* <ListItem button selected={currentPathName === '/faq'}>
          <ListItemIcon>
            <LiveHelpOutlined />
          </ListItemIcon>
          <ListItemText primary="FAQ" />
        </ListItem> */}
      </List>
    </Drawer>
  );
};

export default CustomDesktopDrawer;
