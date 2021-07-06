import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ThumbDown, ThumbUp } from '@material-ui/icons';
import Grid from '@material-ui/core/Grid';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { toggleStatusModal } from '../src/statusReducer';

const StatusModal = () => {
  const dispatch = useAppDispatch();
  const isStatusModalOpen = useAppSelector((state) => state.status.isStatusModalOpen);
  const statusTitle = useAppSelector((state) => state.status.statusTitle);
  const statusMsg = useAppSelector((state) => state.status.statusMsg);
  const isSuccess = useAppSelector((state) => state.status.isSuccess);

  return (
    <Dialog open={isStatusModalOpen} onClose={() => dispatch(toggleStatusModal(false))} aria-labelledby="status-title" aria-describedby="status-msg">
      <DialogTitle id="status-title">{statusTitle}</DialogTitle>
      <DialogContent>
        <Grid container justify="center">
          {isSuccess ? <ThumbUp color="primary" /> : <ThumbDown color="primary" />}
        </Grid>
        <Grid container justify="center">
          <DialogContentText id="status-msg">{statusMsg}</DialogContentText>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Grid container justify="center">
          <Button onClick={() => dispatch(toggleStatusModal(false))} color="primary" variant="contained">
            Close
          </Button>
        </Grid>
      </DialogActions>
    </Dialog>
  );
};

export default StatusModal;
