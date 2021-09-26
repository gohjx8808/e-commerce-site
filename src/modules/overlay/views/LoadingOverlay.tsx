import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { useAppSelector } from '../../../hooks';

const useStyle = makeStyles({
  whiteBg: {
    backgroundColor: 'white',
  },
});

const LoadingOverlay = () => {
  const style = useStyle();
  const isLoadingOverlayOpen = useAppSelector((state) => state.overlay.isLoadingOverlayOpen);

  return (
    <Dialog open={isLoadingOverlayOpen}>
      <DialogContent className={style.whiteBg}>
        <CircularProgress />
      </DialogContent>
    </Dialog>
  );
};

export default LoadingOverlay;
