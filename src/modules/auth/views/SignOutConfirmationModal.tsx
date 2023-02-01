import { StatusModalContext } from "@contextProvider/StatusModalContextProvider";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { authLocalStorageKeys } from "@utils/localStorageKeys";
import routeNames from "@utils/routeNames";
import { navigate } from "gatsby";
import { useContext } from "react";

interface SignOutConfirmationModalProps {
  toggleModal: () => void;
  isOpen: boolean;
}

const SignOutConfirmationModal = (props: SignOutConfirmationModalProps) => {
  const { toggleModal, isOpen } = props;

  const { toggleSuccess, toggleVisible, updateMsg, updateTitle } =
    useContext(StatusModalContext);

  const logout = () => {
    localStorage.removeItem(authLocalStorageKeys.TOKEN);
    localStorage.removeItem(authLocalStorageKeys.USER);
    toggleSuccess(true);
    updateMsg("You have been logged-out!");
    toggleModal();
    toggleVisible(true);
    navigate(routeNames.home);
    updateTitle("Log Out");
  };

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
