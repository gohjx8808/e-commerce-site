import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useLogOut } from "../src/authMutations";

interface SignOutConfirmationModalProps {
  toggleModal: () => void;
  isOpen: boolean;
}

const SignOutConfirmationModal = (props: SignOutConfirmationModalProps) => {
  const { toggleModal, isOpen } = props;

  const { mutate: logout } = useLogOut(toggleModal);

  return (
    <Dialog
      open={isOpen}
      onClose={toggleModal}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Logout</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you wish to logout?
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ padding: 3 }}>
        <Button onClick={toggleModal} color="secondary" variant="contained">
          Cancel
        </Button>
        <Button onClick={() => logout()} color="secondary">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SignOutConfirmationModal;
