import { Typography } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import React from 'react';
import useGlobalStyles from '../../../utils/useGlobalStyles';

interface ProductErrorSnackbarOwnProps{
  isSnackbarOpen:boolean
  toggleSnackbar:()=>void
  msg:string
}

const ProductErrorSnackbar = (props:ProductErrorSnackbarOwnProps) => {
  const { isSnackbarOpen, toggleSnackbar, msg } = props;
  const globalStyles = useGlobalStyles();

  return (
    <Snackbar open={isSnackbarOpen} autoHideDuration={3000} onClose={toggleSnackbar}>
      <Alert onClose={toggleSnackbar} severity="warning">
        <Typography className={globalStyles.boldText}>
          {msg}
        </Typography>
      </Alert>
    </Snackbar>
  );
};

export default ProductErrorSnackbar;
