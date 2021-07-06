import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { toggleStatusModal } from '../src/statusReducer';

const StatusModal = () => {
  const dispatch = useAppDispatch();
  const isStatusModalOpen = useAppSelector((state) => state.status.isStatusModalOpen);

  return (
    <Dialog open={isStatusModalOpen} onClose={() => dispatch(toggleStatusModal(false))} aria-labelledby="">
      <DialogTitle id="" />
      <DialogContent>
        <DialogContentText />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => dispatch(toggleStatusModal(false))} color="default">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default StatusModal;
