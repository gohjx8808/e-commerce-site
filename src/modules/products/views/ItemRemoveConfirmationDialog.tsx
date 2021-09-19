import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import React from 'react';
import useGlobalStyles from '../../../useGlobalStyles';
import productStyle from '../src/productStyle';

interface ItemRemoveConfirmationDialogOwnProps{
  modalOpen:boolean
  toggleModal:()=>void
  confirmRemove:()=>void
  itemName:string
}

const ItemRemoveConfirmationDialog = (props:ItemRemoveConfirmationDialogOwnProps) => {
  const {
    modalOpen, toggleModal, confirmRemove, itemName,
  } = props;

  const styles = productStyle();
  const globalStyles = useGlobalStyles();

  return (
    <Dialog
      open={modalOpen}
      onClose={toggleModal}
      aria-labelledby="item-remove-title"
      aria-describedby="item-remove-description"
    >
      <DialogTitle id="item-remove-title">Confirmation to remove item</DialogTitle>
      <DialogContent>
        <DialogContentText id="item-remove-description">
          Are you sure you wish to remove
          {' '}
          <span className={globalStyles.boldText}>
            {itemName}
          </span>
          {' '}
          from your cart?
        </DialogContentText>
      </DialogContent>
      <DialogActions className={styles.totalPayTextContainer}>
        <Button onClick={toggleModal} color="secondary" variant="contained">
          Cancel
        </Button>
        <Button onClick={confirmRemove} color="secondary">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ItemRemoveConfirmationDialog;
