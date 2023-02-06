import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActionButtonsContainer from "../../../styledComponents/DialogActionButtonsContainer";
import { useDeleteAddress } from "../src/addressMutations";

interface DeleteAddressConfirmationModalProps {
  modalData: address.deleteAddressModalData;
  toggleModal: () => void;
}

const DeleteAddressConfirmationModal = (
  props: DeleteAddressConfirmationModalProps
) => {
  const { modalData, toggleModal } = props;

  const { mutate: deleteAddress } = useDeleteAddress(toggleModal);

  const confirmDelete = () => {
    deleteAddress({ addressId: modalData.selectedAddress?.id || 0 });
  };

  return (
    <Dialog
      open={modalData.isModalOpen}
      onClose={toggleModal}
      aria-labelledby="deleteAddressConfirmation"
    >
      <DialogTitle id="deleteAddressConfirmation">
        Delete Confirmation
      </DialogTitle>
      <DialogContent dividers>
        <DialogContentText>
          Are you sure you wish to delete this address? This cannot be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActionButtonsContainer>
        <Button onClick={toggleModal} color="secondary" variant="contained">
          Cancel
        </Button>
        <Button onClick={confirmDelete} color="secondary">
          Confirm
        </Button>
      </DialogActionButtonsContainer>
    </Dialog>
  );
};

export default DeleteAddressConfirmationModal;
