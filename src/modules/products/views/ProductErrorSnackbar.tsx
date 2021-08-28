import { Typography } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import React from 'react';
import productStyle from '../src/productStyle';

interface ProductErrorSnackbarOwnProps{
  isSnackbarOpen:boolean
  toggleSnackbar:()=>void
  msg:string
}

const ProductErrorSnackbar = (props:ProductErrorSnackbarOwnProps) => {
  const { isSnackbarOpen, toggleSnackbar, msg } = props;
  const styles = productStyle();

  return (
    <Snackbar open={isSnackbarOpen} autoHideDuration={3000} onClose={toggleSnackbar}>
      <Alert onClose={toggleSnackbar} severity="warning">
        <Typography className={styles.boldText}>
          {msg}
        </Typography>
      </Alert>
    </Snackbar>
  );
};

export default ProductErrorSnackbar;
