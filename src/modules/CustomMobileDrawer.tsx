import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import ImageSearchOutlinedIcon from '@material-ui/icons/ImageSearchOutlined';
import SpeakerNotesIcon from '@material-ui/icons/SpeakerNotes';
import { useLocation } from '@reach/router';
import { navigate } from 'gatsby';
import React from 'react';
import StyledMenuItem from '../sharedComponents/StyledMenuItem';
import routeNames from '../utils/routeNames';

const useStyles = makeStyles((theme) => ({
  list: {
    width: 200,
  },
  fullList: {
    width: 'auto',
  },
  inactiveItemIcon: {
    color: theme.palette.text.primary,
  },
}));

interface CustomMobileDrawerOwnProps{
  drawerOpen:boolean
  toggleDrawer:()=>void
}

const CustomMobileDrawer = (props:CustomMobileDrawerOwnProps) => {
  const { drawerOpen, toggleDrawer } = props;
  const classes = useStyles();
  const location = useLocation();
  const currentPathName = location.pathname;

  return (
    <Drawer
      anchor="left"
      open={drawerOpen}
      onClose={toggleDrawer}
    >
      <div
        className={classes.list}
        role="presentation"
        onClick={toggleDrawer}
        onKeyDown={toggleDrawer}
      >
        <List>
          <StyledMenuItem button selected={currentPathName === '/'} onClick={() => navigate('/')}>
            <ListItemIcon>
              <HomeOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </StyledMenuItem>
          <StyledMenuItem
            button
            selected={currentPathName === routeNames.learnMore}
            onClick={() => navigate(routeNames.learnMore)}
          >
            <ListItemIcon>
              <InsertEmoticonIcon />
            </ListItemIcon>
            <ListItemText primary="Introduction" />
          </StyledMenuItem>
          <StyledMenuItem
            button
            selected={currentPathName === routeNames.imageGallery}
            onClick={() => navigate(routeNames.imageGallery)}
          >
            <ListItemIcon>
              <PhotoLibraryIcon />
            </ListItemIcon>
            <ListItemText primary="Image Gallery" />
          </StyledMenuItem>
          <StyledMenuItem
            button
            selected={currentPathName === routeNames.products}
            onClick={() => navigate(routeNames.products)}
          >
            <ListItemIcon>
              <ImageSearchOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Products" />
          </StyledMenuItem>
          <StyledMenuItem
            button
            selected={currentPathName === routeNames.feedbackForm}
            onClick={() => navigate(routeNames.feedbackForm)}
          >
            <ListItemIcon>
              <SpeakerNotesIcon />
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
      </div>
    </Drawer>
  );
};

export default CustomMobileDrawer;
