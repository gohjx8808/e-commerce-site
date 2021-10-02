import Box from '@mui/material/Box';
import Divider, { DividerProps } from '@mui/material/Divider';
import React from 'react';

const DividerWithText = (props:DividerProps) => {
  const { children } = props;

  return (
    <Box marginY={3} width="100%">
      <Divider>{children}</Divider>
    </Box>
  );
};

export default DividerWithText;
