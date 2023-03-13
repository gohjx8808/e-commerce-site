import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import React from "react";
import { drawerWidth } from "../../utils/constants";
import CustomDrawerItems from "./CustomDrawerItems";

interface CustomMobileDrawerOwnProps {
  drawerOpen: boolean;
  toggleDrawer: () => void;
}

const CustomMobileDrawer = (props: CustomMobileDrawerOwnProps) => {
  const { drawerOpen, toggleDrawer } = props;

  return (
    <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
      <Box
        width={drawerWidth}
        role="presentation"
        onClick={toggleDrawer}
        onKeyDown={toggleDrawer}
      >
        <CustomDrawerItems />
      </Box>
    </Drawer>
  );
};

export default CustomMobileDrawer;
