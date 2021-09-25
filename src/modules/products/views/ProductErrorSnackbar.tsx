import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Typography from '@mui/material/Typography';
import React from 'react';
import useGlobalStyles from '../../../useGlobalStyles';

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
