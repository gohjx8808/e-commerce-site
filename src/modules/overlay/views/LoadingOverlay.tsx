import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import React from 'react';
import { useAppSelector } from '../../../hooks';

const LoadingOverlay = () => {
  const isLoadingOverlayOpen = useAppSelector((state) => state.overlay.isLoadingOverlayOpen);

  return (
    <Dialog open={isLoadingOverlayOpen}>
      <DialogContent>
        <CircularProgress />
      </DialogContent>
    </Dialog>
  );
};

export default LoadingOverlay;
