import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import React from "react";
import BoldFont from "../../../styledComponents/BoldFont";
import DialogActionButtonsContainer from "../../../styledComponents/DialogActionButtonsContainer";

interface ItemRemoveConfirmationDialogOwnProps {
  modalOpen: boolean;
  toggleModal: () => void;
  confirmRemove: () => void;
  itemName: string;
}

const ItemRemoveConfirmationDialog = (
  props: ItemRemoveConfirmationDialogOwnProps
) => {
  const { modalOpen, toggleModal, confirmRemove, itemName } = props;

  return (
    <Dialog
      open={modalOpen}
      onClose={toggleModal}
      aria-labelledby="item-remove-title"
      aria-describedby="item-remove-description"
    >
      <DialogTitle id="item-remove-title">
        Confirmation to remove item
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="item-remove-description">
          Are you sure you wish to remove <BoldFont>{itemName}</BoldFont> from
          your cart?
        </DialogContentText>
      </DialogContent>
      <DialogActionButtonsContainer>
        <Button onClick={toggleModal} color="secondary" variant="contained">
          Cancel
        </Button>
        <Button onClick={confirmRemove} color="secondary">
          Confirm
        </Button>
      </DialogActionButtonsContainer>
    </Dialog>
  );
};

export default ItemRemoveConfirmationDialog;
