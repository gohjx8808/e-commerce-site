import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
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
