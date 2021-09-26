import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { signOutAction, toggleSignOutConfirmationModal } from '../src/authReducer';
import authStyles from '../src/authStyles';

const SignOutConfirmationModal = () => {
  const isSignOutConfirmationmodalOpen = useAppSelector(
    (state) => state.auth.isSignOutConfirmationModalOpen,
  );
  const dispatch = useAppDispatch();
  const styles = authStyles();

  const closeModal = () => {
    dispatch(toggleSignOutConfirmationModal(false));
  };

  return (
    <Dialog
      open={isSignOutConfirmationmodalOpen}
      onClose={closeModal}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Logout</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you wish to logout?
        </DialogContentText>
      </DialogContent>
      <DialogActions className={styles.signoutModalActionContainer}>
        <Button onClick={closeModal} color="secondary" variant="contained">
          Cancel
        </Button>
        <Button onClick={() => dispatch(signOutAction())} color="secondary">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SignOutConfirmationModal;
