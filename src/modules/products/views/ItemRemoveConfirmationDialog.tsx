import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import React from 'react';
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
          <span className={styles.boldText}>
            {itemName}
          </span>
          {' '}
          from your cart?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={toggleModal}>
          Cancel
        </Button>
        <Button onClick={confirmRemove}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ItemRemoveConfirmationDialog;
