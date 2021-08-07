import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { toggleEditAccDetailModal } from '../src/accountReducer';
import accountStyles from '../src/accountStyles';

const EditAccDetailModal = () => {
  const styles = accountStyles();
  const dispatch = useAppDispatch();
  const isEditAccDetailModalOpen = useAppSelector(
    (state) => state.account.isEditAccDetailModalDisplay,
  );

  const closeModal = () => {
    dispatch(toggleEditAccDetailModal(false));
  };

  return (
    <Dialog open={isEditAccDetailModalOpen} onClose={closeModal} aria-labelledby="editAccDetail">
      <DialogTitle id="editAccDetail">Edit Account Detail</DialogTitle>
      <DialogContent>
        <DialogContentText />
      </DialogContent>
      <DialogActions>
        <Button onClick={closeModal} color="secondary" variant="contained">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditAccDetailModal;
