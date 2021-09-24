import { navigate } from 'gatsby';
import React from 'react';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import ImageSearchOutlinedIcon from '@material-ui/icons/ImageSearchOutlined';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import SpeakerNotesIcon from '@material-ui/icons/SpeakerNotes';
import { useLocation } from '@reach/router';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import StyledListItem from '../../sharedComponents/StyledListItem';
import routeNames from '../../utils/routeNames';

const CustomDrawerItems = () => {
  const location = useLocation();
  const currentPathName = location.pathname;

  return (
    <List component="nav">
      <StyledListItem selected={currentPathName === '/'} onClick={() => navigate('/')}>
        <ListItemIcon>
          <HomeOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </StyledListItem>
      <StyledListItem
        selected={currentPathName === routeNames.learnMore}
        onClick={() => navigate(routeNames.learnMore)}
      >
        <ListItemIcon>
          <InsertEmoticonIcon />
        </ListItemIcon>
        <ListItemText primary="Introduction" />
      </StyledListItem>
      <StyledListItem
        selected={currentPathName === routeNames.imageGallery}
        onClick={() => navigate(routeNames.imageGallery)}
      >
        <ListItemIcon>
          <PhotoLibraryIcon />
        </ListItemIcon>
        <ListItemText primary="Image Gallery" />
      </StyledListItem>
      <StyledListItem
        selected={currentPathName === routeNames.products}
        onClick={() => navigate(routeNames.products)}
      >
        <ListItemIcon>
          <ImageSearchOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Products" />
      </StyledListItem>
      <StyledListItem
        selected={currentPathName === routeNames.feedbackForm}
        onClick={() => navigate(routeNames.feedbackForm)}
      >
        <ListItemIcon>
          <SpeakerNotesIcon />
        </ListItemIcon>
        <ListItemText primary="Feedback" />
      </StyledListItem>
      {/* <ListItem selected={currentPathName === '/sharingCorner'}>
          <ListItemIcon>
            <ChatOutlined />
          </ListItemIcon>
          <ListItemText primary="Sharing Corner" />
        </ListItem> */}
      {/* <ListItem selected={currentPathName === '/faq'}>
          <ListItemIcon>
            <LiveHelpOutlined />
          </ListItemIcon>
          <ListItemText primary="FAQ" />
        </ListItem> */}
    </List>
  );
};

export default CustomDrawerItems;
