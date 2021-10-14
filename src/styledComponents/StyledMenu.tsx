import Menu, { MenuProps } from '@mui/material/Menu';
import { styled } from '@mui/material/styles';
import React from 'react';

const StyledMenu = styled((props:MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
))({
  '& .MuiPaper-root': {
    border: '1px solid #d3d4d5',
  },
});

export default StyledMenu;
