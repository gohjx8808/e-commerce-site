import { makeStyles } from '@mui/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
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
