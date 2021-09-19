import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { navigate } from 'gatsby';
import React from 'react';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import ImageSearchOutlinedIcon from '@material-ui/icons/ImageSearchOutlined';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import SpeakerNotesIcon from '@material-ui/icons/SpeakerNotes';
import ListItemText from '@material-ui/core/ListItemText';
import { useLocation } from '@reach/router';
import routeNames from '../../utils/routeNames';
import StyledMenuItem from '../../sharedComponents/StyledMenuItem';

const CustomDrawerItems = () => {
  const location = useLocation();
  const currentPathName = location.pathname;

  return (
    <List role="menu">
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
  );
};

export default CustomDrawerItems;
