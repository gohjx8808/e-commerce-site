import IconButton from '@material-ui/core/IconButton';
import React from 'react';
import CancelIcon from '@material-ui/icons/Cancel';

const CustomInputErrorIcon = () => (
  <IconButton
    edge="end"
    disabled
  >
    <CancelIcon color="error" />
  </IconButton>
);

export default CustomInputErrorIcon;
