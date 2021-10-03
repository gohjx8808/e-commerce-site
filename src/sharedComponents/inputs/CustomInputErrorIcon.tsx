import React from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import IconButton from '@mui/material/IconButton';

const CustomInputErrorIcon = () => (
  <IconButton
    edge="end"
    disabled
  >
    <CancelIcon color="error" />
  </IconButton>
);

export default CustomInputErrorIcon;
