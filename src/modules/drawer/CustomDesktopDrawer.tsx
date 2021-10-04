import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import React from 'react';
import StyledDrawer from '../../styledComponents/drawer/StyledDrawer';
import StyledDrawerHeader from '../../styledComponents/drawer/StyledDrawerHeader';
import CustomDrawerItems from './CustomDrawerItems';

interface CustomDesktopDrawerOwnProps{
  drawerOpen:boolean
  handleDrawerClose:()=>void
}

const CustomDesktopDrawer = (props:CustomDesktopDrawerOwnProps) => {
  const { drawerOpen, handleDrawerClose } = props;

  return (
    <StyledDrawer variant="permanent" open={drawerOpen}>
      <StyledDrawerHeader>
        <IconButton onClick={handleDrawerClose} aria-label="close drawer">
          <ChevronLeftIcon />
        </IconButton>
      </StyledDrawerHeader>
      <Divider />
      <CustomDrawerItems />
    </StyledDrawer>
  );
};

export default CustomDesktopDrawer;
