import { Typography } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import React from 'react';
import productStyle from '../src/productStyle';

interface CheckoutErrorSnackbarOwnProps{
  isSnackbarOpen:boolean
  toggleSnackbar:()=>void
}

const CheckoutErrorSnackbar = (props:CheckoutErrorSnackbarOwnProps) => {
  const { isSnackbarOpen, toggleSnackbar } = props;
  const styles = productStyle();

  return (
    <Snackbar open={isSnackbarOpen} autoHideDuration={3000} onClose={toggleSnackbar}>
      <Alert onClose={toggleSnackbar} severity="warning">
        <Typography className={styles.boldText}>
          Please select at least one item to proceed!
        </Typography>
      </Alert>
    </Snackbar>
  );
};

export default CheckoutErrorSnackbar;
