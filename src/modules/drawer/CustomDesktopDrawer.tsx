import {
  makeStyles,
} from '@mui/styles';
import clsx from 'clsx';
import React from 'react';
import { Theme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { drawerWidth } from '../../utils/constants';
import CustomDrawerItems from './CustomDrawerItems';

const useStyles = makeStyles((theme:Theme) => ({
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
      <CustomDrawerItems />
    </Drawer>
  );
};

export default CustomDesktopDrawer;
