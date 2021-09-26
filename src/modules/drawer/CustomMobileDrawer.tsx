import Drawer from '@mui/material/Drawer';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { drawerWidth } from '../../utils/constants';
import CustomDrawerItems from './CustomDrawerItems';

const useStyles = makeStyles({
  list: {
    width: drawerWidth,
  },
});

interface CustomMobileDrawerOwnProps{
  drawerOpen:boolean
  toggleDrawer:()=>void
}

const CustomMobileDrawer = (props:CustomMobileDrawerOwnProps) => {
  const { drawerOpen, toggleDrawer } = props;
  const classes = useStyles();

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
        <CustomDrawerItems />
      </div>
    </Drawer>
  );
};

export default CustomMobileDrawer;
