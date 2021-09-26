import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import React from 'react';

import { useAppDispatch, useAppSelector } from '../../../hooks';
import { deleteAddressAction, toggleDeleteAddressConfirmationModal } from '../src/accountReducer';
import accountStyles from '../src/accountStyles';

const DeleteAddressConfirmationModal = () => {
  const styles = accountStyles();
  const dispatch = useAppDispatch();
  const isDeleteAddressConfirmationModalOpen = useAppSelector(
    (state) => state.account.isDeleteAddressConfirmationModalOpen,
  );

  const hideModal = () => {
    dispatch(toggleDeleteAddressConfirmationModal(false));
  };

  const confirmDelete = () => {
    dispatch(deleteAddressAction());
  };

  return (
    <Dialog open={isDeleteAddressConfirmationModalOpen} onClose={hideModal} aria-labelledby="deleteAddressConfirmation">
      <DialogTitle id="deleteAddressConfirmation">Delete Confirmation</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you wish to delete this address? This cannot be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions className={styles.editAccDetailActionBtnContainer}>
        <Button onClick={hideModal} color="secondary" variant="contained">
          Cancel
        </Button>
        <Button onClick={confirmDelete} color="secondary">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteAddressConfirmationModal;
